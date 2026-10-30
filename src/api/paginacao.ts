import { apiClient } from "./client";
import { extrairItems } from "./envelope";
import type { PaginatedResponse } from "../types/api";

/** Nomes dos parâmetros de paginação aceitos pelo backend (confirmar com o C#). */
export const PARAMS_PAGINACAO = { page: "Page", pageSize: "PageSize" } as const;

const TAMANHO_PAGINA = 100;
const MAX_PAGINAS = 50;

/**
 * Lista um recurso paginado percorrendo as páginas até completar `totalCount`.
 * Para se uma página não trouxer itens novos (evita laço infinito caso o
 * backend ignore o parâmetro de página).
 */
export async function listarPaginado<T extends { id?: unknown }>(
    rota: string,
    params: Record<string, unknown> = {},
): Promise<T[]> {
    const todos: T[] = [];
    const vistos = new Set<unknown>();

    for (let pagina = 1; pagina <= MAX_PAGINAS; pagina++) {
        const { data } = await apiClient.get<PaginatedResponse<T>>(rota, {
            params: { ...params, [PARAMS_PAGINACAO.page]: pagina, [PARAMS_PAGINACAO.pageSize]: TAMANHO_PAGINA },
        });
        const items = extrairItems<T>(data);

        let novos = 0;
        for (const item of items) {
            const chave = item.id ?? JSON.stringify(item);
            if (vistos.has(chave)) continue;
            vistos.add(chave);
            todos.push(item);
            novos++;
        }

        const total = typeof data?.totalCount === "number" ? data.totalCount : undefined;
        const terminou =
            novos === 0 ||
            items.length < TAMANHO_PAGINA ||
            (total !== undefined && todos.length >= total);
        if (terminou) break;
    }

    return todos;
}
