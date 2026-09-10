/**
 * Mapa centralizado das rotas HTTP esperadas pelo aplicativo.
 *
 * As rotas de domínio ainda dependem do backend. Quando o contrato oficial
 * for entregue, apenas este arquivo deve precisar ser ajustado caso haja
 * diferença nos caminhos.
 */
export const API_ROUTES = {
    auth: {
        login: "/auth/login",
        register: "/auth/register",
        me: "/auth/me",
    },
    users: {
        me: "/users/me",
        list: "/users",
    },
    pets: {
        list: "/pets",
        detail: (id: string) => `/pets/${id}`,
    },
    clinicalRecords: {
        list: "/clinical-records",
        detail: (id: string) => `/clinical-records/${id}`,
    },
    protocolos: {
        list: "/protocolos",
        detail: (id: string) => `/protocolos/${id}`,
    },
} as const;
