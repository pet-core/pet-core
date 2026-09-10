import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Usuario } from "../types/models";

const TOKEN_KEY = "PETCORE_AUTH_TOKEN";
const USER_KEY = "PETCORE_AUTH_USER";

export interface AuthSession {
    token?: string;
    usuario: Omit<Usuario, "senha">;
}

export async function salvarSessao(session: AuthSession): Promise<void> {
    await AsyncStorage.multiSet([
        [TOKEN_KEY, session.token ?? ""],
        [USER_KEY, JSON.stringify(session.usuario)],
    ]);
}

export async function obterToken(): Promise<string | null> {
    return AsyncStorage.getItem(TOKEN_KEY);
}

export async function obterSessao(): Promise<AuthSession | null> {
    const values = await AsyncStorage.multiGet([TOKEN_KEY, USER_KEY]);
    const token = values[0][1] ?? "";
    const usuarioJson = values[1][1];

    if (!usuarioJson) {
        return null;
    }

    try {
        return { token, usuario: JSON.parse(usuarioJson) as Omit<Usuario, "senha"> };
    } catch {
        await encerrarSessao();
        return null;
    }
}

export async function encerrarSessao(): Promise<void> {
    await AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY]);
}
