import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { listarProtocolos } from "../../services/api/protocolApiService";
import type { Protocolo } from "../../types/models";

export const protocoloQueryKeys = {
    all: ["protocolos"] as const,
    detail: (id: string) => ["protocolos", id] as const,
};

export function useProtocolosApi(): UseQueryResult<Protocolo[], Error> {
    return useQuery({
        queryKey: protocoloQueryKeys.all,
        queryFn: listarProtocolos,
    });
}
