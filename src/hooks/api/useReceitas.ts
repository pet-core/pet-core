import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { criarReceita, listarReceitas } from "../../services/api/receitaApiService";
import type { CriarReceitaRequest, Receita } from "../../types/receitas";

export const receitaQueryKeys = {
    all: ["receitas"] as const,
};

export function useReceitas() {
    return useQuery<Receita[], Error>({
        queryKey: receitaQueryKeys.all,
        queryFn: listarReceitas,
    });
}

export function useCriarReceita() {
    const queryClient = useQueryClient();
    return useMutation<Receita, Error, CriarReceitaRequest>({
        mutationFn: criarReceita,
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: receitaQueryKeys.all });
        },
    });
}
