import { useQuery } from "@tanstack/react-query";
import { listarClinicas, listarEspecializacoes, listarExames } from "../../services/api/catalogApiService";

export const catalogQueryKeys = {
    all: ["catalogos"] as const,
    especializacoes: ["catalogos", "especializacoes"] as const,
    clinicas: ["catalogos", "clinicas"] as const,
    exames: ["catalogos", "exames"] as const,
};

export function useEspecializacoes() {
    return useQuery({
        queryKey: catalogQueryKeys.especializacoes,
        queryFn: listarEspecializacoes,
    });
}

export function useExames() {
    return useQuery({
        queryKey: catalogQueryKeys.exames,
        queryFn: listarExames,
    });
}

export function useClinicas() {
    return useQuery({
        queryKey: catalogQueryKeys.clinicas,
        queryFn: listarClinicas,
    });
}
