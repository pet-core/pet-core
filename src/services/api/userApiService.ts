import { apiClient } from "../../api";
import { API_ROUTES } from "../../api/routes";
import type { TipoPerfil, Usuario } from "../../types/models";

type UsuarioSemSenha = Omit<Usuario, "senha">;

export async function listarUsuarios(tipoPerfil?: TipoPerfil): Promise<UsuarioSemSenha[]> {
    const rota = tipoPerfil === "veterinario" ? API_ROUTES.medico.list : API_ROUTES.tutor.list;
    const response = await apiClient.get<UsuarioSemSenha[]>(rota);
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
    email?: string;
    senha?: string;
    nascimento?: string;
}

export async function buscarUsuario(id: string, tipoPerfil: TipoPerfil): Promise<UsuarioSemSenha> {
    const rota = tipoPerfil === "veterinario" ? API_ROUTES.medico.detail(id) : API_ROUTES.tutor.detail(id);
    const response = await apiClient.get<UsuarioSemSenha>(rota);
    return { ...response.data, id, tipoPerfil };
}

export async function atualizarUsuario(
    id: string,
    tipoPerfil: TipoPerfil,
    dados: AtualizarUsuarioRequest,
): Promise<UsuarioSemSenha> {
    const rota = tipoPerfil === "veterinario" ? API_ROUTES.medico.patch(id) : API_ROUTES.tutor.patch(id);
    const response = await apiClient.put<UsuarioSemSenha>(rota, dados);
    return { ...response.data, id, tipoPerfil };
}
