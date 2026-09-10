import { apiClient } from "../../api";
import { API_ROUTES } from "../../api/routes";
import type { Clinica } from "../../types/models";

export async function listarEspecializacoes(): Promise<string[]> {
    const response = await apiClient.get<string[]>(API_ROUTES.catalogos.especializacoes);
    return response.data;
}

export async function listarClinicas(): Promise<Clinica[]> {
    const response = await apiClient.get<Clinica[]>(API_ROUTES.catalogos.clinicas);
    return response.data;
}

export async function listarExames(): Promise<string[]> {
    const response = await apiClient.get<string[]>(API_ROUTES.catalogos.exames);
    return response.data;
}
