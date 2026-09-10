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
