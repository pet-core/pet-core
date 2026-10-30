import { apiClient, extrairData, extrairDataObrigatorio, listarPaginado } from "../../api";
import { API_ROUTES, type RegistroResource } from "../../api/routes";
import type {
    ClinicalRecordCreateRequest,
    ClinicalRecordUpdateRequest,
    SingleResponse,
} from "../../types/api";
import type { RegistroClinico } from "../../types/models";

const routes = {
    prontuario: API_ROUTES.prontuario,
    exame: API_ROUTES.exame,
    historico: API_ROUTES.historico,
    receita: API_ROUTES.receita,
    relatorio: API_ROUTES.relatorio,
    protocolo: API_ROUTES.protocolo,
} as const;

// ─── serviço ─────────────────────────────────────────────────────────────────

export async function listarRegistrosClinicos(recurso: RegistroResource): Promise<RegistroClinico[]> {
    return listarPaginado<RegistroClinico>(routes[recurso].list);
}

export async function buscarRegistroClinico(recurso: RegistroResource, id: string): Promise<RegistroClinico> {
    const response = await apiClient.get<SingleResponse<RegistroClinico>>(routes[recurso].detail(id));
    return extrairDataObrigatorio<RegistroClinico>(response.data);
}

export async function criarRegistroClinico(
    recurso: RegistroResource,
    request: ClinicalRecordCreateRequest,
): Promise<RegistroClinico> {
    const response = await apiClient.post<SingleResponse<RegistroClinico>>(routes[recurso].list, request);
    return extrairDataObrigatorio<RegistroClinico>(response.data);
}

export async function atualizarRegistroClinico(
    recurso: "prontuario" | "exame" | "relatorio" | "protocolo",
    id: string,
    request: ClinicalRecordUpdateRequest,
): Promise<RegistroClinico> {
    const response = await apiClient.put<SingleResponse<RegistroClinico>>(routes[recurso].patch(id), request);
    // 200 devolve { data }; 204 não tem corpo, então relê o recurso.
    return extrairData<RegistroClinico>(response.data) ?? buscarRegistroClinico(recurso, id);
}

export async function excluirRegistroClinico(recurso: RegistroResource, id: string): Promise<void> {
    await apiClient.delete(routes[recurso].detail(id));
}
