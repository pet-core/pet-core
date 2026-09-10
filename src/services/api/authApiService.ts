import { apiClient } from "../../api";
import { API_ROUTES } from "../../api/routes";
import type {
    CadastroRequest,
    CadastroResponse,
    LoginRequest,
    LoginResponse,
} from "../../types/api";

export async function login(request: LoginRequest): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>(API_ROUTES.auth.login, request);
    return response.data;
}

export async function cadastrar(request: CadastroRequest): Promise<CadastroResponse> {
    const response = await apiClient.post<CadastroResponse>(API_ROUTES.auth.register, request);
    return response.data;
}

export async function obterUsuarioAtual() {
    const response = await apiClient.get(API_ROUTES.auth.me);
    return response.data;
}
