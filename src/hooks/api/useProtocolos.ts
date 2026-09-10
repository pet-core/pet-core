import { useQuery } from "@tanstack/react-query";
import { listarProtocolos, buscarProtocolo } from "../../services/api/protocolApiService";

export const protocoloQueryKeys = {
    all: ["protocolos"] as const,
    detail: (id: string) => ["protocolos", id] as const,
};

export function useProtocolosApi() {
    return useQuery({
        queryKey: protocoloQueryKeys.all,
        queryFn: listarProtocolos,
    });
}

export function useProtocoloApi(id: string) {
    return useQuery({
        queryKey: protocoloQueryKeys.detail(id),
        queryFn: () => buscarProtocolo(id),
        enabled: Boolean(id),
    });
}
