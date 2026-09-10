import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { buscarUsuario, atualizarUsuario, type AtualizarUsuarioRequest } from "../../services/api/userApiService";
import { useAuth } from "../../context/AuthContext";

export const meuUsuarioQueryKey = ["users", "me"] as const;

export function useMeuUsuario() {
    const { usuario } = useAuth();
    return useQuery({
        queryKey: [...meuUsuarioQueryKey, usuario?.id, usuario?.tipoPerfil],
        queryFn: () => buscarUsuario(usuario!.id, usuario!.tipoPerfil),
        enabled: Boolean(usuario?.id && usuario?.tipoPerfil),
    });
}

export function useAtualizarMeuUsuario() {
    const { usuario } = useAuth();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (dados: AtualizarUsuarioRequest) => {
            if (!usuario) throw new Error("Usuário autenticado não encontrado.");
            return atualizarUsuario(usuario.id, usuario.tipoPerfil, dados);
        },
        onSuccess: (usuarioAtualizado) => {
            queryClient.setQueryData(
                [...meuUsuarioQueryKey, usuarioAtualizado.id, usuario?.tipoPerfil],
                usuarioAtualizado,
            );
        },
    });
}
