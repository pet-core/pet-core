import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { criarReceita, listarReceitas } from "../../services/api/receitaApiService";
import type { CriarReceitaRequest, Receita } from "../../types/receitas";
import type { OpcoesDeConsulta } from "./queryOptions";

export const receitaQueryKeys = {
    all: ["receitas"] as const,
};

export function useReceitas(opcoes: OpcoesDeConsulta = {}) {
    return useQuery<Receita[], Error>({
        queryKey: receitaQueryKeys.all,
        queryFn: listarReceitas,
        enabled: opcoes.enabled ?? true,
        refetchInterval: opcoes.refetchInterval ?? false,
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
