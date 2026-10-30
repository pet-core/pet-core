import axios from "axios";
import { apiClient } from "../../api";
import { API_ROUTES } from "../../api/routes";
import type { CadastroRequest, CadastroResponse, LoginRequest, LoginResponse } from "../../types/api";
import type { TipoPerfil, Usuario } from "../../types/models";

// ─── helpers ─────────────────────────────────────────────────────────────────

type Registro = Record<string, unknown>;

function ehRegistro(valor: unknown): valor is Registro {
    return typeof valor === "object" && valor !== null && !Array.isArray(valor);
}

/** Perfil do app -> valor de `role` aceito pelo POST /api/auth/login. */
export function roleDaApi(tipoPerfil: TipoPerfil): "tutor" | "medico" {
    return tipoPerfil === "veterinario" ? "medico" : "tutor";
}

function perfilDaRole(role: unknown): TipoPerfil | null {
    const valor = String(role ?? "").toLowerCase();
    if (valor === "medico" || valor === "veterinario") return "veterinario";
    if (valor === "tutor") return "tutor";
    return null;
}

function decodificarBase64Url(texto: string): string {
    const base64 = texto.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(texto.length / 4) * 4, "=");
    const binario = globalThis.atob(base64);
    try {
        return decodeURIComponent(
            Array.from(binario, (c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0")).join(""),
        );
    } catch {
        return binario;
    }
}

/** Lê as claims do JWT (apenas para exibir dados; a validação é do backend). */
function lerClaims(token: string): Registro {
    try {
        const payload = token.split(".")[1];
        if (!payload) return {};
        const claims = JSON.parse(decodificarBase64Url(payload)) as unknown;
        return ehRegistro(claims) ? claims : {};
    } catch {
        return {};
    }
}

const CLAIM_ID = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier";
const CLAIM_EMAIL = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress";
const CLAIM_NOME = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name";
const CLAIM_ROLE = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";

/** O corpo pode vir cru ({ accessToken }) ou no envelope individual ({ data: { accessToken } }). */
function desembrulharLogin(body: unknown): LoginResponse {
    if (!ehRegistro(body)) return {};
    if (ehRegistro(body.data) && !("accessToken" in body)) return body.data as LoginResponse;
    return body as LoginResponse;
}

function extrairUsuario(data: LoginResponse, token: string, tipoPerfilTentado: TipoPerfil): Usuario {
    const claims = lerClaims(token);
    const aninhado = [data.usuario, data.user].find(ehRegistro);
    const origem: Registro = { ...(aninhado ?? data) };
    // Credenciais e HATEOAS nunca entram no objeto de usuário persistido.
    for (const campo of ["accessToken", "token", "refreshToken", "links", "password", "senha"]) delete origem[campo];

    const perfil =
        perfilDaRole(origem.role ?? origem.tipoPerfil ?? data.role ?? data.tipoPerfil)
        ?? perfilDaRole(claims.role ?? claims[CLAIM_ROLE])
        ?? tipoPerfilTentado;

    const id = origem.id ?? origem.userId ?? origem.idUsuario ?? claims.sub ?? claims[CLAIM_ID] ?? claims.nameid;
    const nome = origem.nome ?? origem.name ?? claims.name ?? claims[CLAIM_NOME] ?? claims.unique_name;
    const email = origem.email ?? claims.email ?? claims[CLAIM_EMAIL];

    return {
        ...(origem as unknown as Usuario),
        id: String(id ?? ""),
        nome: String(nome ?? ""),
        email: String(email ?? ""),
        senha: "",
        tipoPerfil: perfil,
    };
}

/** Status em que faz sentido tentar o outro perfil (credencial/perfil recusado). */
const STATUS_TENTAR_OUTRO_PERFIL = new Set([400, 401, 403, 404]);

// ─── login ───────────────────────────────────────────────────────────────────

/**
 * POST /api/auth/login  { email, password, role }  ->  { accessToken, ... }
 *
 * Com `role` explícito envia só esse perfil. Sem `role`, tenta tutor e depois
 * médico, mas só segue para o próximo perfil quando o backend recusar as
 * credenciais; erros de rede/5xx são propagados na hora.
 */
export async function login(request: LoginRequest): Promise<LoginResponse> {
    const email = request.email.trim();
    const password = request.password ?? request.senha ?? "";
    const perfilExplicito = perfilDaRole(request.role);

    const perfis: TipoPerfil[] = perfilExplicito ? [perfilExplicito] : ["tutor", "veterinario"];
    let ultimoErro: unknown;

    for (const tipoPerfil of perfis) {
        try {
            const response = await apiClient.post<unknown>(API_ROUTES.auth.login, {
                email,
                password,
                role: roleDaApi(tipoPerfil),
            });
            const data = desembrulharLogin(response.data);

            const token = typeof data.accessToken === "string" ? data.accessToken.trim() : "";
            if (!token) {
                throw new Error("Resposta de login sem accessToken.");
            }

            return { ...data, usuario: extrairUsuario(data, token, tipoPerfil), token };
        } catch (error) {
            ultimoErro = error;
            const status = axios.isAxiosError(error) ? error.response?.status : undefined;
            if (status === undefined || !STATUS_TENTAR_OUTRO_PERFIL.has(status)) throw error;
        }
    }

    throw ultimoErro ?? new Error("Não foi possível autenticar.");
}

// ─── cadastrar ────────────────────────────────────────────────────────────────

export async function cadastrar(request: CadastroRequest): Promise<CadastroResponse> {
    const rota = request.tipoPerfil === "veterinario" ? API_ROUTES.medico.list : API_ROUTES.tutor.list;

    const dataNascimento = request.nascimento?.trim();
    if (!dataNascimento || !/^\d{2}\/\d{2}\/\d{4}$/.test(dataNascimento)) {
        throw new Error("Data de nascimento inválida. Use DD/MM/AAAA.");
    }

    const [dia, mes, ano] = dataNascimento.split("/");
    const dataIso = `${ano}-${mes}-${dia}`;
    const sexo = request.genero === "Feminino" ? 0 : request.genero === "Masculino" ? 1 : null;

    if (sexo === null) {
        throw new Error("Selecione o gênero.");
    }

    const telefoneLimpo = (request.telefone ?? "").replace(/\D/g, "");

    const payload = request.tipoPerfil === "veterinario"
        ? {
            nome: request.nome.trim(),
            dataNascimento: dataIso,
            telefone: telefoneLimpo,
            email: request.email.trim(),
            sexo,
            senha: request.senha,
            especialidade: request.especializacao ?? "",
        }
        : {
            nome: request.nome.trim(),
            dataNascimento: dataIso,
            telefone: telefoneLimpo,
            email: request.email.trim(),
            sexo,
            senha: request.senha,
        };

    const response = await apiClient.post<CadastroResponse>(rota, payload);
    return response.data;
}
