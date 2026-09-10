/** Rotas HTTP oficiais do backend .NET do PetCore. */
export const API_ROUTES = {
    clinica: {
        list: "/api/Clinica",
        detail: (id: string) => `/api/Clinica/${id}`,
        patch: (id: string) => `/api/Clinica/${id}/patch`,
    },
    endereco: {
        list: "/api/Endereco",
        detail: (id: string) => `/api/Endereco/${id}`,
        patch: (id: string) => `/api/Endereco/${id}/patch`,
    },
    exame: {
        list: "/api/Exame",
        detail: (id: string) => `/api/Exame/${id}`,
        patch: (id: string) => `/api/Exame/${id}/patch`,
    },
    historico: {
        list: "/api/Historico",
        detail: (id: string) => `/api/Historico/${id}`,
    },
    medicamento: {
        list: "/api/Medicamento",
        detail: (id: string) => `/api/Medicamento/${id}`,
        patch: (id: string) => `/api/Medicamento/${id}/patch`,
    },
    medico: {
        list: "/api/Medico",
        detail: (id: string) => `/api/Medico/${id}`,
        login: "/api/Medico/login",
        patch: (id: string) => `/api/Medico/${id}/patch`,
    },
    pet: {
        list: "/api/Pet",
        menu: "/api/Pet/menu",
        detail: (id: string) => `/api/Pet/${id}`,
        patch: (id: string) => `/api/Pet/${id}/patch`,
    },
    prontuario: {
        list: "/api/Prontuario",
        detail: (id: string) => `/api/Prontuario/${id}`,
        patch: (id: string) => `/api/Prontuario/${id}/patch`,
    },
    receita: {
        list: "/api/Receita",
        detail: (id: string) => `/api/Receita/${id}`,
    },
    relatorio: {
        list: "/api/Relatorio",
        detail: (id: string) => `/api/Relatorio/${id}`,
        patch: (id: string) => `/api/Relatorio/${id}/patch`,
    },
    tutor: {
        list: "/api/Tutor",
        detail: (id: string) => `/api/Tutor/${id}`,
        login: "/api/Tutor/login",
        patch: (id: string) => `/api/Tutor/${id}/patch`,
    },
    protocolo: {
        list: "/api/Protocolo",
        detail: (id: string) => `/api/Protocolo/${id}`,
        patch: (id: string) => `/api/Protocolo/${id}/patch`,
    },
} as const;

export type RegistroResource =
    | "prontuario"
    | "exame"
    | "historico"
    | "receita"
    | "relatorio"
    | "protocolo";
