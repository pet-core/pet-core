import { apiClient, extrairDataObrigatorio, listarPaginado } from "../../api";
import { API_ROUTES } from "../../api/routes";
import type { SingleResponse } from "../../types/api";
import type { CriarReceitaRequest, Receita } from "../../types/receitas";

// ─── serviço ─────────────────────────────────────────────────────────────────

export async function listarReceitas(): Promise<Receita[]> {
    return listarPaginado<Receita>(API_ROUTES.receita.list);
}

export async function criarReceita(request: CriarReceitaRequest): Promise<Receita> {
    const response = await apiClient.post<SingleResponse<Receita>>(API_ROUTES.receita.list, request);
    return extrairDataObrigatorio<Receita>(response.data);
}
