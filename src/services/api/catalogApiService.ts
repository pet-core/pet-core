import { apiClient } from "../../api";
import { API_ROUTES } from "../../api/routes";
import type { Clinica } from "../../types/models";

interface CatalogoItem {
    id?: string;
    nome?: string;
    descricao?: string;
    especializacao?: string;
    tipo?: string;
    [campo: string]: unknown;
}

export async function listarEspecializacoes(): Promise<string[]> {
    const response = await apiClient.get<CatalogoItem[]>(API_ROUTES.medico.list);
    const valores = response.data.flatMap((item) => {
        const valor = item.especializacao ?? item.descricao;
        return typeof valor === "string" && valor.trim() ? [valor.trim()] : [];
    });
    return [...new Set(valores)];
}

export async function listarClinicas(): Promise<Clinica[]> {
    const response = await apiClient.get<Clinica[]>(API_ROUTES.clinica.list);
    return response.data;
}

export async function listarExames(): Promise<string[]> {
    const response = await apiClient.get<CatalogoItem[]>(API_ROUTES.exame.list);
    const valores = response.data.flatMap((item) => {
        const valor = item.nome ?? item.descricao ?? item.tipo;
        return typeof valor === "string" && valor.trim() ? [valor.trim()] : [];
    });
    return [...new Set(valores)];
}
