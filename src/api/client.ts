import axios from "axios";
import { obterToken } from "../services/authStorage";

declare const process: { env: Record<string, string | undefined> };

const FALLBACK_URL = "https://petcore-net-pc2f.onrender.com";

// O Expo só substitui o literal `process.env.EXPO_PUBLIC_API_URL` no bundle.
const URL_CONFIGURADA = process.env.EXPO_PUBLIC_API_URL?.trim();

if (!URL_CONFIGURADA && typeof __DEV__ !== "undefined" && __DEV__) {
    console.warn(`[api] EXPO_PUBLIC_API_URL não definida; usando ${FALLBACK_URL}. Veja .env.example.`);
}

export const BASE_URL = (URL_CONFIGURADA || FALLBACK_URL).replace(/\/+$/, "");

export const apiClient = axios.create({
    baseURL: BASE_URL,
    timeout: 60000,
    headers: { "Content-Type": "application/json", Accept: "application/json" },
});

apiClient.interceptors.request.use(async (config) => {
    const token = await obterToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

type NaoAutorizadoHandler = () => void;
let aoNaoAutorizado: NaoAutorizadoHandler | null = null;

/** Registrado pelo AuthContext para encerrar a sessão quando o JWT expira/é recusado. */
export function registrarNaoAutorizadoHandler(handler: NaoAutorizadoHandler | null): void {
    aoNaoAutorizado = handler;
}

apiClient.interceptors.response.use(
    (response) => response,
    async (erro: unknown) => {
        if (axios.isAxiosError(erro) && erro.response?.status === 401) {
            // O próprio login responde 401 para credenciais inválidas: não é sessão expirada.
            const ehLogin = erro.config?.url?.includes("/auth/login");
            const tinhaToken = Boolean(erro.config?.headers?.Authorization);
            if (!ehLogin && tinhaToken) aoNaoAutorizado?.();
        }
        return Promise.reject(erro);
    },
);

export function extrairMensagemErro(erro: unknown, fallback = "Ocorreu um erro inesperado."): string {
    if (axios.isAxiosError(erro)) {
        const data = erro.response?.data;
        if (typeof data === "string" && data.trim()) return data;
        if (data && typeof data === "object") {
            const obj = data as Record<string, unknown>;
            if (typeof obj.detail === "string" && obj.detail) return obj.detail;
            if (obj.errors && typeof obj.errors === "object") {
                const msgs = Object.values(obj.errors).flat().filter((m): m is string => typeof m === "string");
                if (msgs.length > 0) return msgs.join("\n");
            }
            if (typeof obj.title === "string" && obj.title) return obj.title;
            if (typeof obj.message === "string" && obj.message) return obj.message;
        }
        if (erro.message) return erro.message;
    }
    if (erro instanceof Error && erro.message) return erro.message;
    return fallback;
}
