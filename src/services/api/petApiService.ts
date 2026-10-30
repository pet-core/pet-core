import { apiClient, extrairData, extrairDataObrigatorio, listarPaginado } from "../../api";
import { API_ROUTES } from "../../api/routes";
import type { PetCreateRequest, PetUpdateRequest, SingleResponse } from "../../types/api";
import type { Pet } from "../../types/models";

// ─── serviço ─────────────────────────────────────────────────────────────────

export async function listarPets(tutorId?: string): Promise<Pet[]> {
    return listarPaginado<Pet>(API_ROUTES.pet.list, tutorId ? { tutorId } : {});
}

export async function buscarPet(id: string): Promise<Pet> {
    const response = await apiClient.get<SingleResponse<Pet>>(API_ROUTES.pet.detail(id));
    return extrairDataObrigatorio<Pet>(response.data);
}

export async function criarPet(request: PetCreateRequest): Promise<Pet> {
    const response = await apiClient.post<SingleResponse<Pet>>(API_ROUTES.pet.list, request);
    return extrairData<Pet>(response.data) ?? buscarPetCriado(response.headers?.location);
}

export async function atualizarPet(id: string, request: PetUpdateRequest): Promise<Pet> {
    const response = await apiClient.put<SingleResponse<Pet>>(API_ROUTES.pet.patch(id), request);
    // 200 devolve { data }; 204 não tem corpo, então relê o recurso.
    return extrairData<Pet>(response.data) ?? buscarPet(id);
}

export async function excluirPet(id: string): Promise<void> {
    await apiClient.delete(API_ROUTES.pet.detail(id));
}

async function buscarPetCriado(location: unknown): Promise<Pet> {
    const id = typeof location === "string" ? location.split("/").filter(Boolean).pop() : undefined;
    if (!id) throw new Error("Resposta de criação sem 'data' nem cabeçalho Location.");
    return buscarPet(id);
}
