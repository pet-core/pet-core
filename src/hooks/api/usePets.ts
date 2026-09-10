import {
    useMutation,
    useQuery,
    useQueryClient,
    type UseMutationResult,
    type UseQueryResult,
} from "@tanstack/react-query";
import {
    atualizarPet,
    buscarPet,
    criarPet,
    excluirPet,
    listarPets,
} from "../../services/api/petApiService";
import type { PetCreateRequest, PetUpdateRequest } from "../../types/api";
import type { Pet } from "../../types/models";

export const petQueryKeys = {
    all: ["pets"] as const,
    detail: (id: string) => ["pets", id] as const,
};

export function usePets(tutorId?: string, enabled = true): UseQueryResult<Pet[], Error> {
    return useQuery({
        queryKey: [...petQueryKeys.all, { tutorId }],
        queryFn: () => listarPets(tutorId),
        enabled,
    });
}

export function usePet(id: string): UseQueryResult<Pet, Error> {
    return useQuery({
        queryKey: petQueryKeys.detail(id),
        queryFn: () => buscarPet(id),
        enabled: Boolean(id),
    });
}

export function useCriarPet(): UseMutationResult<Pet, Error, PetCreateRequest> {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: criarPet,
        onSuccess: (pet) => {
            queryClient.setQueryData(petQueryKeys.detail(pet.id), pet);
            void queryClient.invalidateQueries({ queryKey: petQueryKeys.all });
        },
    });
}

export function useAtualizarPet(): UseMutationResult<
    Pet,
    Error,
    { id: string; dados: PetUpdateRequest }
> {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, dados }) => atualizarPet(id, dados),
        onSuccess: (pet) => {
            queryClient.setQueryData(petQueryKeys.detail(pet.id), pet);
            void queryClient.invalidateQueries({ queryKey: petQueryKeys.all });
        },
    });
}

export function useExcluirPet(): UseMutationResult<void, Error, string> {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: excluirPet,
        onSuccess: (_data, id) => {
            queryClient.removeQueries({ queryKey: petQueryKeys.detail(id) });
            void queryClient.invalidateQueries({ queryKey: petQueryKeys.all });
        },
    });
}
