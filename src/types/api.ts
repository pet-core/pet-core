import type { TipoPerfil, Usuario } from "./models";

// ─── Auth ────────────────────────────────────────────────────────────────────

export interface LoginRequest {
    email: string;
    /** Campo enviado para a API */
    password: string;
    /** Perfil: "tutor" | "medico" (também aceita "veterinario"). Sem valor, o app tenta tutor e depois médico. */
    role?: string;
    /** Alias legado aceito internamente */
    senha?: string;
}

export interface LoginResponse {
    /** JWT retornado pelo C#. */
    accessToken?: string;
    /** Preenchido pelo mobile com o accessToken já validado (não vem da API). */
    token?: string;
    usuario?: Usuario;
    user?: Usuario;
    id?: string;
    nome?: string;
    email?: string;
    tipoPerfil?: TipoPerfil;
    role?: string;
    [campo: string]: unknown;
}

// ─── Cadastro ────────────────────────────────────────────────────────────────

export interface CadastroRequest {
    nome: string;
    email: string;
    senha: string;
    tipoPerfil: TipoPerfil;
    nascimento?: string;
    telefone?: string;
    genero?: string;
    especializacao?: string;
    clinica?: string;
    cnpj?: string;
    nomeClinica?: string;
    cep?: string;
    complemento?: string;
}

export interface CadastroResponse {
    data?: Usuario;
    usuario?: Usuario;
    id?: string;
    nome?: string;
    email?: string;
    tipoPerfil?: TipoPerfil;
    [campo: string]: unknown;
}

// ─── Envelopes de resposta da API ─────────────────────────────────────────────

/** Link HATEOAS devolvido pelo backend (o mobile não depende dele). */
export interface HateoasLink {
    href?: string;
    rel?: string;
    method?: string;
    [campo: string]: unknown;
}

/**
 * Envelope paginado retornado por GET /api/{Recurso}
 * { items: [...], totalCount, page, pageSize, links? }
 */
export interface PaginatedResponse<T> {
    items: T[];
    totalCount?: number;
    page?: number;
    pageSize?: number;
    links?: HateoasLink[];
}

/**
 * Envelope individual retornado por GET /{id}, POST e PUT
 * { data: {...} }
 */
export interface SingleResponse<T> {
    data: T;
    links?: HateoasLink[];
}

// ─── Pet ─────────────────────────────────────────────────────────────────────

export interface PetCreateRequest {
    nome: string;
    especie: string;
    raca: string;
    /** Data no formato ISO yyyy-MM-dd */
    dataNasc: string;
    pelagem: string;
    porte: string;
    /** 0 = Feminino, 1 = Masculino */
    sexo: number;
    tutorId?: string;
    idTutores?: string[];
    urlImg?: string;
    obitoInformado?: boolean;
    comedouroStatus?: string;
    status?: boolean;
}

export interface PetUpdateRequest {
    nome?: string;
    especie?: string;
    raca?: string;
    dataNasc?: string;
    nascimento?: string;
    pelagem?: string;
    porte?: string;
    sexo?: number;
    tutorId?: string;
    urlImg?: string;
    obitoInformado?: boolean;
    comedouroStatus?: string;
    status?: boolean;
}

// ─── Registros Clínicos ───────────────────────────────────────────────────────

export interface ClinicalRecordCreateRequest {
    [campo: string]: unknown;
}

export interface ClinicalRecordUpdateRequest {
    [campo: string]: unknown;
}

// ─── Alias legado ─────────────────────────────────────────────────────────────
export interface ApiListResponse<T> {
    data: T[];
}
