import { apiClient } from "../../api";
import { API_ROUTES } from "../../api/routes";
import type { Pet } from "../../types/models";
import type { PetCreateRequest, PetUpdateRequest } from "../../types/api";

export async function listarPets(tutorId?: string): Promise<Pet[]> {
    const response = await apiClient.get<Pet[]>(API_ROUTES.pets.list, {
        params: tutorId ? { tutorId } : undefined,
    });
    return response.data;
}

export async function buscarPet(id: string): Promise<Pet> {
    const response = await apiClient.get<Pet>(API_ROUTES.pets.detail(id));
    return response.data;
}

export async function criarPet(request: PetCreateRequest): Promise<Pet> {
    const response = await apiClient.post<Pet>(API_ROUTES.pets.list, request);
    return response.data;
}

export async function atualizarPet(id: string, request: PetUpdateRequest): Promise<Pet> {
    const response = await apiClient.put<Pet>(API_ROUTES.pets.detail(id), request);
    return response.data;
}

export async function excluirPet(id: string): Promise<void> {
    await apiClient.delete(API_ROUTES.pets.detail(id));
}
