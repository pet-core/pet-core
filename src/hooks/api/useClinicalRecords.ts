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
import type {
    ClinicalRecordCreateRequest,
    ClinicalRecordUpdateRequest,
} from "../../types/api";
import type { RegistroClinico } from "../../types/models";

export const clinicalRecordQueryKeys = {
    all: ["clinical-records"] as const,
    detail: (id: string) => ["clinical-records", id] as const,
};

export function useClinicalRecords(): UseQueryResult<RegistroClinico[], Error> {
    return useQuery({
        queryKey: clinicalRecordQueryKeys.all,
        queryFn: listarRegistrosClinicos,
    });
}

export function useClinicalRecord(id: string): UseQueryResult<RegistroClinico, Error> {
    return useQuery({
        queryKey: clinicalRecordQueryKeys.detail(id),
        queryFn: () => buscarRegistroClinico(id),
        enabled: Boolean(id),
    });
}

export function useCriarClinicalRecord(): UseMutationResult<
    RegistroClinico,
    Error,
    ClinicalRecordCreateRequest
> {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: criarRegistroClinico,
        onSuccess: (registro) => {
            queryClient.setQueryData(clinicalRecordQueryKeys.detail(registro.id), registro);
            void queryClient.invalidateQueries({ queryKey: clinicalRecordQueryKeys.all });
        },
    });
}

export function useAtualizarClinicalRecord(): UseMutationResult<
    RegistroClinico,
    Error,
    { id: string; dados: ClinicalRecordUpdateRequest }
> {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, dados }) => atualizarRegistroClinico(id, dados),
        onSuccess: (registro) => {
            queryClient.setQueryData(clinicalRecordQueryKeys.detail(registro.id), registro);
            void queryClient.invalidateQueries({ queryKey: clinicalRecordQueryKeys.all });
        },
    });
}

export function useExcluirClinicalRecord(): UseMutationResult<void, Error, string> {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: excluirRegistroClinico,
        onSuccess: (_data, id) => {
            queryClient.removeQueries({ queryKey: clinicalRecordQueryKeys.detail(id) });
            void queryClient.invalidateQueries({ queryKey: clinicalRecordQueryKeys.all });
        },
    });
}
