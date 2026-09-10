import type { Pet, RegistroClinico, TipoPerfil, Usuario } from "./models";

export interface LoginRequest {
    email: string;
    senha: string;
}

/** O backend oficial não documenta um token JWT; aceita-se token apenas se ele vier na resposta. */
export interface LoginResponse {
    token?: string;
    usuario?: Usuario;
    id?: string;
    nome?: string;
    email?: string;
    tipoPerfil?: TipoPerfil;
    [campo: string]: unknown;
}

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
    usuario?: Usuario;
    id?: string;
    nome?: string;
    email?: string;
    tipoPerfil?: TipoPerfil;
    [campo: string]: unknown;
}

export interface ApiListResponse<T> {
    data: T[];
}

export interface PetCreateRequest extends Omit<Pet, "id"> {}
export interface PetUpdateRequest extends Omit<Pet, "id"> {}

export interface ClinicalRecordCreateRequest extends Omit<RegistroClinico, "id"> {}
export interface ClinicalRecordUpdateRequest extends Omit<RegistroClinico, "id"> {}
