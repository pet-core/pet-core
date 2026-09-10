import type { Usuario } from "../types/models";
import { KEYS, getData, removeData, setData } from "./storage";

export async function getUsuarios(): Promise<Usuario[]> {
    return (await getData<Usuario[]>(KEYS.USUARIOS)) ?? [];
}

export async function findUsuarioByCredentials(email: string, senha: string): Promise<Usuario | null> {
    const usuarios = await getUsuarios();
    return usuarios.find((usuario) => usuario.email === email && usuario.senha === senha) ?? null;
}

export async function emailJaCadastrado(email: string): Promise<boolean> {
    const usuarios = await getUsuarios();
    return usuarios.some((usuario) => usuario.email === email);
}

export async function salvarUsuario(usuario: Usuario): Promise<void> {
    const usuarios = await getUsuarios();
    await setData(KEYS.USUARIOS, [...usuarios, usuario]);
}

export async function atualizarUsuario(usuarioAtualizado: Usuario): Promise<void> {
    const usuarios = await getUsuarios();
    const usuariosAtualizados = usuarios.map((usuario) =>
        usuario.id === usuarioAtualizado.id ? usuarioAtualizado : usuario,
    );

    await setData(KEYS.USUARIOS, usuariosAtualizados);
    await setData(KEYS.USUARIO_LOGADO, usuarioAtualizado);
}

export async function getUsuarioLogado(): Promise<Usuario | null> {
    return getData<Usuario>(KEYS.USUARIO_LOGADO);
}

export async function salvarSessao(usuario: Usuario): Promise<void> {
    await setData(KEYS.USUARIO_LOGADO, usuario);
}

export async function encerrarSessao(): Promise<void> {
    await removeData(KEYS.USUARIO_LOGADO);
}
