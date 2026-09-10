import axios from "axios";

/**
 * Cliente HTTP centralizado da aplicação.
 *
 * A URL da API será fornecida pelo backend posteriormente através de
 * EXPO_PUBLIC_API_URL. Nenhuma tela deve criar instâncias próprias de Axios.
 */
export const apiClient = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    timeout: 15000,
    headers: {
        "Content-Type": "application/json",
    },
});
