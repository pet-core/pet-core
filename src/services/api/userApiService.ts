import { apiClient } from "../../api";
import { API_ROUTES } from "../../api/routes";
import type { TipoPerfil, Usuario } from "../../types/models";

type UsuarioSemSenha = Omit<Usuario, "senha">;

export async function listarUsuarios(tipoPerfil?: TipoPerfil): Promise<UsuarioSemSenha[]> {
    const response = await apiClient.get<UsuarioSemSenha[]>(API_ROUTES.users.list, {
        params: tipoPerfil ? { tipoPerfil } : undefined,
    });
    return response.data;
}

export async function listarTutores(): Promise<UsuarioSemSenha[]> {
    return listarUsuarios("tutor");
}


export interface AtualizarUsuarioRequest {
    nome: string;
    especializacao?: string;
    clinica?: string;
    nomeClinica?: string;
    cnpj?: string;
    cep?: string;
    complemento?: string;
    telefone?: string;
    genero?: string;
    nascimento?: string;
}

export async function atualizarMeuUsuario(dados: AtualizarUsuarioRequest): Promise<UsuarioSemSenha> {
    const response = await apiClient.patch<UsuarioSemSenha>(API_ROUTES.users.me, dados);
    return response.data;
}
