import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { atualizarMeuUsuario, type AtualizarUsuarioRequest } from "../../services/api/userApiService";
import { API_ROUTES } from "../../api/routes";
import { apiClient } from "../../api";
import type { Usuario } from "../../types/models";

export const meuUsuarioQueryKey = ["users", "me"] as const;

type UsuarioSemSenha = Omit<Usuario, "senha">;

async function buscarMeuUsuario(): Promise<UsuarioSemSenha> {
    const response = await apiClient.get<UsuarioSemSenha>(API_ROUTES.users.me);
    return response.data;
}

export function useMeuUsuario() {
    return useQuery({
        queryKey: meuUsuarioQueryKey,
        queryFn: buscarMeuUsuario,
    });
}

export function useAtualizarMeuUsuario() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (dados: AtualizarUsuarioRequest) => atualizarMeuUsuario(dados),
        onSuccess: (usuario) => {
            queryClient.setQueryData(meuUsuarioQueryKey, usuario);
        },
    });
}
