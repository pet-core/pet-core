import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
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
    sincronizarUsuario: (usuario: AuthSession["usuario"]) => Promise<void>;
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
        if (!response.usuario) {
            throw new Error("Resposta de login sem dados do usuário.");
        }
        const usuario = { ...response.usuario } as Omit<typeof response.usuario, "senha">;
        delete (usuario as { senha?: string }).senha;
        const nextSession: AuthSession = { token: response.token ?? "", usuario };
        await salvarSessao(nextSession);
        setSession(nextSession);
        return nextSession;
    }, []);

    const logout = useCallback(async () => {
        await limparSessao();
        setSession(null);
    }, []);

    const sincronizarUsuario = useCallback(async (usuario: AuthSession["usuario"]) => {
        if (!session) {
            throw new Error("Sessão não encontrada.");
        }
        const nextSession: AuthSession = { token: session.token, usuario };
        await salvarSessao(nextSession);
        setSession(nextSession);
    }, [session]);

    const value = useMemo<AuthContextValue>(() => ({
        session,
        usuario: session?.usuario ?? null,
        token: session?.token ?? null,
        carregando,
        autenticado: session !== null,
        login,
        logout,
        sincronizarUsuario,
    }), [session, carregando, login, logout, sincronizarUsuario]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth deve ser usado dentro de AuthProvider");
    }
    return context;
}

