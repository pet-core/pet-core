import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { TipoPerfil } from "../types/models";
import { login as loginApi } from "../services/api/authApiService";
import { encerrarSessao as limparSessao, obterSessao, salvarSessao, type AuthSession } from "../services/authStorage";

interface AuthContextValue {
    session: AuthSession | null;
    usuario: AuthSession["usuario"] | null;
    token: string | null;
    carregando: boolean;
    autenticado: boolean;
    login: (email: string, senha: string) => Promise<AuthSession>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [session, setSession] = useState<AuthSession | null>(null);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        obterSessao()
            .then(setSession)
            .finally(() => setCarregando(false));
    }, []);

    const login = useCallback(async (email: string, senha: string) => {
        const response = await loginApi({ email: email.trim(), senha });
        const usuario = { ...response.usuario };
        delete usuario.senha;
        const nextSession: AuthSession = { token: response.token, usuario };
        await salvarSessao(nextSession);
        setSession(nextSession);
        return nextSession;
    }, []);

    const logout = useCallback(async () => {
        await limparSessao();
        setSession(null);
    }, []);

    const value = useMemo<AuthContextValue>(() => ({
        session,
        usuario: session?.usuario ?? null,
        token: session?.token ?? null,
        carregando,
        autenticado: session !== null,
        login,
        logout,
    }), [session, carregando, login, logout]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth deve ser usado dentro de AuthProvider");
    }
    return context;
}

export function perfilInicial(usuario: AuthSession["usuario"] | null): "VetHome" | "TutorHome" | "Login" {
    if (!usuario) return "Login";
    return usuario.tipoPerfil === ("veterinario" satisfies TipoPerfil) ? "VetHome" : "TutorHome";
}
