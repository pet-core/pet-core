import { apiClient } from "../../api";
import { API_ROUTES } from "../../api/routes";
import type { Protocolo } from "../../types/models";

export async function listarProtocolos(): Promise<Protocolo[]> {
    const response = await apiClient.get<Protocolo[]>(API_ROUTES.protocolos.list);
    return response.data;
}

export async function buscarProtocolo(id: string): Promise<Protocolo> {
    const response = await apiClient.get<Protocolo>(API_ROUTES.protocolos.detail(id));
    return response.data;
}
