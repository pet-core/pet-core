import { apiClient } from "../../api";
import { API_ROUTES, type RegistroResource } from "../../api/routes";
import type { ClinicalRecordCreateRequest, ClinicalRecordUpdateRequest } from "../../types/api";
import type { RegistroClinico } from "../../types/models";

const routes = {
    prontuario: API_ROUTES.prontuario,
    exame: API_ROUTES.exame,
    historico: API_ROUTES.historico,
    receita: API_ROUTES.receita,
    relatorio: API_ROUTES.relatorio,
    protocolo: API_ROUTES.protocolo,
} as const;

export async function listarRegistrosClinicos(recurso: RegistroResource): Promise<RegistroClinico[]> {
    const response = await apiClient.get<RegistroClinico[]>(routes[recurso].list);
    return response.data;
}

export async function buscarRegistroClinico(recurso: RegistroResource, id: string): Promise<RegistroClinico> {
    const response = await apiClient.get<RegistroClinico>(routes[recurso].detail(id));
    return response.data;
}

export async function criarRegistroClinico(
    recurso: RegistroResource,
    request: ClinicalRecordCreateRequest,
): Promise<RegistroClinico> {
    const response = await apiClient.post<RegistroClinico>(routes[recurso].list, request);
    return response.data;
}

export async function atualizarRegistroClinico(
    recurso: "prontuario" | "exame" | "relatorio" | "protocolo",
    id: string,
    request: ClinicalRecordUpdateRequest,
): Promise<RegistroClinico> {
    const response = await apiClient.put<RegistroClinico>(routes[recurso].patch(id), request);
    return response.data;
}

export async function excluirRegistroClinico(recurso: RegistroResource, id: string): Promise<void> {
    await apiClient.delete(routes[recurso].detail(id));
}
