import {
    useMutation,
    useQuery,
    useQueryClient,
    type UseMutationResult,
    type UseQueryResult,
} from "@tanstack/react-query";
import {
    atualizarRegistroClinico,
    buscarRegistroClinico,
    criarRegistroClinico,
    excluirRegistroClinico,
    listarRegistrosClinicos,
} from "../../services/api/clinicalRecordApiService";
import type { RegistroResource } from "../../api/routes";
import type { ClinicalRecordCreateRequest, ClinicalRecordUpdateRequest } from "../../types/api";
import type { RegistroClinico } from "../../types/models";

export const clinicalRecordQueryKeys = {
    all: (recurso: RegistroResource) => [recurso] as const,
    detail: (recurso: RegistroResource, id: string) => [recurso, id] as const,
};

export function useClinicalRecords(recurso: RegistroResource = "prontuario"): UseQueryResult<RegistroClinico[], Error> {
    return useQuery({
        queryKey: clinicalRecordQueryKeys.all(recurso),
        queryFn: () => listarRegistrosClinicos(recurso),
    });
}

export function useClinicalRecord(
    id: string,
    recurso: RegistroResource = "prontuario",
): UseQueryResult<RegistroClinico, Error> {
    return useQuery({
        queryKey: clinicalRecordQueryKeys.detail(recurso, id),
        queryFn: () => buscarRegistroClinico(recurso, id),
        enabled: Boolean(id),
    });
}

export function useCriarClinicalRecord(recurso: RegistroResource = "prontuario"): UseMutationResult<
    RegistroClinico,
    Error,
    ClinicalRecordCreateRequest
> {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (request) => criarRegistroClinico(recurso, request),
        onSuccess: (registro) => {
            queryClient.setQueryData(clinicalRecordQueryKeys.detail(recurso, registro.id), registro);
            void queryClient.invalidateQueries({ queryKey: clinicalRecordQueryKeys.all(recurso) });
        },
    });
}

export function useAtualizarClinicalRecord(
    recurso: "prontuario" | "exame" | "relatorio" | "protocolo" = "prontuario",
): UseMutationResult<RegistroClinico, Error, { id: string; dados: ClinicalRecordUpdateRequest }> {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, dados }) => atualizarRegistroClinico(recurso, id, dados),
        onSuccess: (registro) => {
            queryClient.setQueryData(clinicalRecordQueryKeys.detail(recurso, registro.id), registro);
            void queryClient.invalidateQueries({ queryKey: clinicalRecordQueryKeys.all(recurso) });
        },
    });
}

export function useExcluirClinicalRecord(recurso: RegistroResource = "prontuario"): UseMutationResult<void, Error, string> {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => excluirRegistroClinico(recurso, id),
        onSuccess: (_data, id) => {
            queryClient.removeQueries({ queryKey: clinicalRecordQueryKeys.detail(recurso, id) });
            void queryClient.invalidateQueries({ queryKey: clinicalRecordQueryKeys.all(recurso) });
        },
    });
}
