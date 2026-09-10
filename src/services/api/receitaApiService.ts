import { apiClient } from "../../api";
import { API_ROUTES } from "../../api/routes";
import type { CriarReceitaRequest, Receita } from "../../types/receitas";

export async function listarReceitas(): Promise<Receita[]> {
    const response = await apiClient.get<Receita[]>(API_ROUTES.receita.list);
    return response.data;
}

export async function criarReceita(request: CriarReceitaRequest): Promise<Receita> {
    const response = await apiClient.post<Receita>(API_ROUTES.receita.list, request);
    return response.data;
}
