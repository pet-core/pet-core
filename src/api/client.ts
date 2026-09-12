import axios from "axios";
import { obterToken } from "../services/authStorage";

declare const process: { env: Record<string, string | undefined> };

/** Cliente HTTP único da aplicação. */
export const apiClient = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    timeout: 15000,
    headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use(async (config) => {
    const token = await obterToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

/**
 * Extrai detalhes ou mensagens de erro retornadas pelo backend ou pelo Axios.
 */
export function extrairMensagemErro(erro: unknown, fallback: string = "Ocorreu um erro inesperado."): string {
    if (axios.isAxiosError(erro)) {
        const data = erro.response?.data;
        if (typeof data === "string" && data.trim()) {
            return data;
        }
        if (data && typeof data === "object") {
            const dataObj = data as Record<string, unknown>;
            if (typeof dataObj.detail === "string" && dataObj.detail) {
                return dataObj.detail;
            }
            if (dataObj.errors && typeof dataObj.errors === "object") {
                const mensagens = Object.values(dataObj.errors)
                    .flat()
                    .filter((m): m is string => typeof m === "string");
                if (mensagens.length > 0) {
                    return mensagens.join("\n");
                }
            }
            if (typeof dataObj.title === "string" && dataObj.title) {
                return dataObj.title;
            }
            if (typeof dataObj.message === "string" && dataObj.message) {
                return dataObj.message;
            }
        }
        if (erro.message) {
            return erro.message;
        }
    }
    if (erro instanceof Error && erro.message) {
        return erro.message;
    }
    return fallback;
}
