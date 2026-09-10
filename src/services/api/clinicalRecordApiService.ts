import { apiClient } from "../../api";
import { API_ROUTES } from "../../api/routes";
import type { ClinicalRecordCreateRequest, ClinicalRecordUpdateRequest } from "../../types/api";
import type { RegistroClinico } from "../../types/models";

export async function listarRegistrosClinicos(): Promise<RegistroClinico[]> {
    const response = await apiClient.get<RegistroClinico[]>(API_ROUTES.clinicalRecords.list);
    return response.data;
}

export async function buscarRegistroClinico(id: string): Promise<RegistroClinico> {
    const response = await apiClient.get<RegistroClinico>(API_ROUTES.clinicalRecords.detail(id));
    return response.data;
}

export async function criarRegistroClinico(
    request: ClinicalRecordCreateRequest,
): Promise<RegistroClinico> {
    const response = await apiClient.post<RegistroClinico>(
        API_ROUTES.clinicalRecords.list,
        request,
    );
    return response.data;
}

export async function atualizarRegistroClinico(
    id: string,
    request: ClinicalRecordUpdateRequest,
): Promise<RegistroClinico> {
    const response = await apiClient.put<RegistroClinico>(
        API_ROUTES.clinicalRecords.detail(id),
        request,
    );
    return response.data;
}

export async function excluirRegistroClinico(id: string): Promise<void> {
    await apiClient.delete(API_ROUTES.clinicalRecords.detail(id));
}
