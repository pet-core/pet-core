import type { PaginatedResponse, SingleResponse } from "../types/api";

/**
 * Contrato da API (.NET):
 *  - GET lista   -> { items: [...], totalCount, page, pageSize, links? }
 *  - GET {id}    -> { data: {...}, links? }
 *  - POST / PUT  -> { data: {...} }  (ou corpo vazio em 204)
 *
 * A paginação e o HATEOAS (`links`) continuam no backend; o mobile apenas
 * interpreta o envelope e ignora o que não usa.
 */

function ehObjeto(valor: unknown): valor is Record<string, unknown> {
    return typeof valor === "object" && valor !== null && !Array.isArray(valor);
}

export function extrairItems<T>(body: PaginatedResponse<T> | unknown): T[] {
    if (ehObjeto(body) && Array.isArray(body.items)) return body.items as T[];
    return [];
}

/** Retorna `undefined` quando o corpo é vazio (ex.: 204 No Content). */
export function extrairData<T>(body: SingleResponse<T> | unknown): T | undefined {
    if (ehObjeto(body) && "data" in body) return body.data as T;
    return undefined;
}

export function extrairDataObrigatorio<T>(body: SingleResponse<T> | unknown): T {
    const item = extrairData<T>(body);
    if (item === undefined || item === null) {
        throw new Error("Resposta da API sem o campo 'data'.");
    }
    return item;
}
