import { apiClient } from "../../api";
import { API_ROUTES } from "../../api/routes";
import type { CadastroRequest, CadastroResponse, LoginRequest, LoginResponse } from "../../types/api";
import type { Usuario } from "../../types/models";

function normalizarUsuario(data: LoginResponse | CadastroResponse, tipoPerfilPadrao: "tutor" | "veterinario"): Usuario {
    const origem = ((data as LoginResponse).usuario ?? (data as LoginResponse).user ?? data) as Record<string, unknown>;
    const roleOrigem = String(origem.role ?? origem.tipoPerfil ?? (data as LoginResponse).role ?? (data as LoginResponse).tipoPerfil ?? "").toLowerCase();
    const tipoPerfil: "tutor" | "veterinario" =
        roleOrigem === "medico" || roleOrigem === "veterinario"
            ? "veterinario"
            : roleOrigem === "tutor"
                ? "tutor"
                : tipoPerfilPadrao;

    return {
        ...(origem as unknown as Usuario),
        id: String(origem.id ?? origem.userId ?? origem.idUsuario ?? ""),
        nome: String(origem.nome ?? origem.name ?? ""),
        email: String(origem.email ?? ""),
        senha: "",
        tipoPerfil,
    };
}

export async function login(request: LoginRequest): Promise<LoginResponse> {
    const password = request.password ?? request.senha ?? "";
    const email = request.email.trim();
    const explicitRole = request.role ?? request.tole;

    const tentativas: Array<{ tipoPerfil: "tutor" | "veterinario"; role: string }> = explicitRole
        ? [
            {
                tipoPerfil: explicitRole.toLowerCase() === "medico" || explicitRole.toLowerCase() === "veterinario" ? "veterinario" : "tutor",
                role: explicitRole,
            },
        ]
        : [
            { tipoPerfil: "tutor", role: "tutor" },
            { tipoPerfil: "veterinario", role: "medico" },
        ];

    let ultimoErro: unknown;

    for (const { tipoPerfil, role } of tentativas) {
        try {
            const payload = {
                email,
                password,
                role,
                tole: role,
            };

            const response = await apiClient.post<LoginResponse>(API_ROUTES.auth.login, payload);
            const data = response.data;
            const usuario = normalizarUsuario(data, tipoPerfil);
            const rawToken = data.token ?? (data as Record<string, unknown>).accessToken;
            const token = typeof rawToken === "string" ? rawToken : "";

            return { ...data, usuario, token };
        } catch (error) {
            ultimoErro = error;
        }
    }

    throw ultimoErro ?? new Error("Não foi possível autenticar.");
}

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
