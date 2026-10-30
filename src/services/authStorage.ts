import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import type { Usuario } from "../types/models";

const TOKEN_KEY = "PETCORE_AUTH_TOKEN";
const USER_KEY = "PETCORE_AUTH_USER";

export interface AuthSession {
    token?: string;
    usuario: Omit<Usuario, "senha">;
}

/**
 * O JWT fica no armazenamento seguro do SO (Keychain/Keystore).
 * Os dados não sensíveis do usuário (sem senha) ficam no AsyncStorage.
 * Na web o SecureStore não existe; nesse caso o token só vive em memória.
 */
let tokenEmMemoria: string | null = null;

async function lerTokenSeguro(): Promise<string | null> {
    try {
        if (await SecureStore.isAvailableAsync()) {
            return await SecureStore.getItemAsync(TOKEN_KEY);
        }
    } catch {
        // cai para a memória
    }
    return tokenEmMemoria;
}

async function gravarTokenSeguro(token: string): Promise<void> {
    tokenEmMemoria = token || null;
    try {
        if (!(await SecureStore.isAvailableAsync())) return;
        if (token) await SecureStore.setItemAsync(TOKEN_KEY, token);
        else await SecureStore.deleteItemAsync(TOKEN_KEY);
    } catch {
        // mantém apenas em memória
    }
}

export async function salvarSessao(session: AuthSession): Promise<void> {
    await gravarTokenSeguro(session.token ?? "");
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(session.usuario));
}

export async function obterToken(): Promise<string | null> {
    return tokenEmMemoria ?? (await lerTokenSeguro());
}

export async function obterSessao(): Promise<AuthSession | null> {
    // Migração: remove token que versões anteriores gravavam no AsyncStorage.
    await AsyncStorage.removeItem(TOKEN_KEY).catch(() => {});

    const usuarioJson = await AsyncStorage.getItem(USER_KEY);
    if (!usuarioJson) {
        return null;
    }

    const token = (await lerTokenSeguro()) ?? "";
    if (!token) {
        // Sessão sem JWT não consegue chamar a API autenticada.
        await encerrarSessao();
        return null;
    }
    tokenEmMemoria = token;

    try {
        return { token, usuario: JSON.parse(usuarioJson) as Omit<Usuario, "senha"> };
    } catch {
        await encerrarSessao();
        return null;
    }
}

export async function encerrarSessao(): Promise<void> {
    tokenEmMemoria = null;
    await gravarTokenSeguro("");
    await AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY]);
}
