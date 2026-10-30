import { apiClient, extrairDataObrigatorio, listarPaginado } from "../../api";
import { API_ROUTES } from "../../api/routes";
import type { SingleResponse } from "../../types/api";
import type { Protocolo } from "../../types/models";

// ─── serviço ─────────────────────────────────────────────────────────────────

export async function listarProtocolos(): Promise<Protocolo[]> {
    return listarPaginado<Protocolo>(API_ROUTES.protocolo.list);
}

export async function buscarProtocolo(id: string): Promise<Protocolo> {
    const response = await apiClient.get<SingleResponse<Protocolo>>(API_ROUTES.protocolo.detail(id));
    return extrairDataObrigatorio<Protocolo>(response.data);
}
