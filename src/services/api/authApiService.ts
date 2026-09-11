import { apiClient } from "../../api";
import { API_ROUTES } from "../../api/routes";
import type { CadastroRequest, CadastroResponse, LoginRequest, LoginResponse } from "../../types/api";
import type { Usuario } from "../../types/models";

function normalizarUsuario(data: LoginResponse | CadastroResponse, tipoPerfil: "tutor" | "veterinario"): Usuario {
    const origem = (data.usuario ?? data) as Record<string, unknown>;
    return {
        ...(origem as unknown as Usuario),
        id: String(origem.id ?? ""),
        nome: String(origem.nome ?? ""),
        email: String(origem.email ?? ""),
        senha: "",
        tipoPerfil,
    };
}

export async function login(request: LoginRequest): Promise<LoginResponse> {
    const params = { email: request.email.trim(), senha: request.senha };
    let ultimoErro: unknown;

    for (const [tipoPerfil, rota] of [["tutor", API_ROUTES.tutor.login], ["veterinario", API_ROUTES.medico.login]] as const) {
        try {
            const response = await apiClient.get<LoginResponse>(rota, { params });
            const data = response.data;
            const usuario = normalizarUsuario(data, tipoPerfil);
            return { ...data, usuario, token: typeof data.token === "string" ? data.token : "" };
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
    const sexo = request.genero === "Feminino" ? "F" : request.genero === "Masculino" ? "M" : null;

    if (!sexo) {
        throw new Error("Selecione o gênero.");
    }

    const payload = request.tipoPerfil === "veterinario"
        ? {
            nome: request.nome,
            dataNascimento: dataIso,
            telefone: request.telefone ?? "",
            email: request.email,
            sexo,
            senha: request.senha,
            especialidade: request.especializacao ?? "",
        }
        : {
            nome: request.nome,
            dataNascimento: dataIso,
            telefone: request.telefone ?? "",
            email: request.email,
            sexo,
            senha: request.senha,
        };

    const response = await apiClient.post<CadastroResponse>(rota, payload);
    return response.data;
}
