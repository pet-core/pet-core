import { listarPaginado } from "../../api";
import { API_ROUTES } from "../../api/routes";
import type { Clinica } from "../../types/models";

interface CatalogoItem {
    id?: string;
    nome?: string;
    descricao?: string;
    especialidade?: string;
    especializacao?: string;
    tipo?: string;
    [campo: string]: unknown;
}

// ─── serviço ─────────────────────────────────────────────────────────────────

export async function listarEspecializacoes(): Promise<string[]> {
    const items = await listarPaginado<CatalogoItem>(API_ROUTES.medico.list);
    const valores = items.flatMap((item) => {
        const valor = item.especialidade ?? item.especializacao ?? item.descricao;
        return typeof valor === "string" && valor.trim() ? [valor.trim()] : [];
    });
    return [...new Set(valores)];
}

export async function listarClinicas(): Promise<Clinica[]> {
    return listarPaginado<Clinica>(API_ROUTES.clinica.list);
}

export async function listarExames(): Promise<string[]> {
    const items = await listarPaginado<CatalogoItem>(API_ROUTES.exame.list);
    const valores = items.flatMap((item) => {
        const valor = item.nome ?? item.descricao ?? item.tipo;
        return typeof valor === "string" && valor.trim() ? [valor.trim()] : [];
    });
    return [...new Set(valores)];
}
