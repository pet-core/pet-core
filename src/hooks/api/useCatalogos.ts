import { useQuery } from "@tanstack/react-query";
import { listarClinicas, listarEspecializacoes } from "../../services/api/catalogApiService";

export const catalogQueryKeys = {
    all: ["catalogos"] as const,
    especializacoes: ["catalogos", "especializacoes"] as const,
    clinicas: ["catalogos", "clinicas"] as const,
};

export function useEspecializacoes() {
    return useQuery({
        queryKey: catalogQueryKeys.especializacoes,
        queryFn: listarEspecializacoes,
    });
}

export function useClinicas() {
    return useQuery({
        queryKey: catalogQueryKeys.clinicas,
        queryFn: listarClinicas,
    });
}
