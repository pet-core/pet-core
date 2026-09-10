import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { listarTutores } from "../../services/api/userApiService";
import type { Usuario } from "../../types/models";

type UsuarioSemSenha = Omit<Usuario, "senha">;

export const userQueryKeys = {
    all: ["users"] as const,
    tutores: ["users", "tutores"] as const,
};

export function useTutores(): UseQueryResult<UsuarioSemSenha[], Error> {
    return useQuery({
        queryKey: userQueryKeys.tutores,
        queryFn: listarTutores,
    });
}
