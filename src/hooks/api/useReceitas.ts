import { useMutation, useQuery, useQueryClient, type UseMutationResult, type UseQueryResult } from "@tanstack/react-query";
import { criarReceita, listarReceitas } from "../../services/api/receitaApiService";
import type { CriarReceitaRequest, Receita } from "../../types/receitas";

export const receitaQueryKeys = {
    all: ["receitas"] as const,
};

export function useReceitas(): UseQueryResult<Receita[], Error> {
    return useQuery({
        queryKey: receitaQueryKeys.all,
        queryFn: listarReceitas,
    });
}

export function useCriarReceita(): UseMutationResult<Receita, Error, CriarReceitaRequest> {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: criarReceita,
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: receitaQueryKeys.all });
        },
    });
}
