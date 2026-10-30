import { apiClient, extrairData, extrairDataObrigatorio, listarPaginado } from "../../api";
import { API_ROUTES } from "../../api/routes";
import type { SingleResponse } from "../../types/api";
import type { TipoPerfil, Usuario } from "../../types/models";

type UsuarioSemSenha = Omit<Usuario, "senha">;

// ─── serviço ─────────────────────────────────────────────────────────────────

export async function listarUsuarios(tipoPerfil?: TipoPerfil): Promise<UsuarioSemSenha[]> {
    const rota = tipoPerfil === "veterinario" ? API_ROUTES.medico.list : API_ROUTES.tutor.list;
    return listarPaginado<UsuarioSemSenha>(rota);
}

export async function listarTutores(): Promise<UsuarioSemSenha[]> {
    return listarUsuarios("tutor");
}

/** Campos aceitos por UserDadosRequest no backend */
export interface AtualizarUsuarioRequest {
    nome?: string;
    email?: string;
    telefone?: string;
    senha?: string;
    urlImg?: string;
    fotoUrl?: string;
    nascimento?: string;
    genero?: string;
    especializacao?: string;
    clinica?: string;
    nomeClinica?: string;
    cnpj?: string;
    cep?: string;
    complemento?: string;
}

export async function buscarUsuario(id: string, tipoPerfil: TipoPerfil): Promise<UsuarioSemSenha> {
    const rota = tipoPerfil === "veterinario" ? API_ROUTES.medico.detail(id) : API_ROUTES.tutor.detail(id);
    const response = await apiClient.get<SingleResponse<UsuarioSemSenha>>(rota);
    const usuario = extrairDataObrigatorio<UsuarioSemSenha>(response.data);
    return { ...usuario, id, tipoPerfil };
}

export async function atualizarUsuario(
    id: string,
    tipoPerfil: TipoPerfil,
    dados: AtualizarUsuarioRequest,
): Promise<UsuarioSemSenha> {
    const rota = tipoPerfil === "veterinario" ? API_ROUTES.medico.patch(id) : API_ROUTES.tutor.patch(id);
    const response = await apiClient.put<SingleResponse<UsuarioSemSenha>>(rota, dados);
    // 200 devolve { data }; 204 não tem corpo, então relê o recurso.
    const usuario = extrairData<UsuarioSemSenha>(response.data);
    return usuario ? { ...usuario, id, tipoPerfil } : buscarUsuario(id, tipoPerfil);
}
