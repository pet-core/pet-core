export type TipoPerfil = "tutor" | "veterinario";

export interface Usuario {
    id: string;
    nome: string;
    email: string;
    senha: string;
    tipoPerfil: TipoPerfil;
    telefone?: string;
    genero?: string;
    nascimento?: string;
    especializacao?: string;
    clinica?: string;
    cnpj?: string;
    nomeClinica?: string;
    cep?: string;
    complemento?: string;
    fotoUrl?: string;
    urlImg?: string;
}

export type StatusComedouro = "cheio" | "vazio";

export interface Pet {
    id: string;
    tutorId?: string;
    nome: string;
    /** Campo retornado pela API (formato ISO date yyyy-MM-dd) */
    dataNasc?: string;
    /** Alias aceito no patch */
    nascimento?: string;
    especie: string;
    raca: string;
    porte: string;
    pelagem: string;
    sexo: string | number;
    obitoInformado?: boolean;
    comedouroStatus?: StatusComedouro | string;
    urlImg?: string;
    status?: boolean;
    [campo: string]: unknown;
}

export interface Clinica {
    id?: string;
    nome: string;
    cnpj: string;
    cep?: string;
    complemento?: string;
    idEndereco?: string;
}

export interface Protocolo {
    id: string;
    titulo: string;
    texto: string;
    tutorId?: string;
    tutorNome?: string;
    petId?: string;
    petNome?: string;
    veterinarioId?: string;
    veterinarioNome?: string;
    tipoRegistro?: string;
    dataEnvio?: string;
}

export interface RegistroClinico {
    id: string;
    tutorId?: string;
    tutorNome?: string;
    petId?: string;
    petNome?: string;
    [campo: string]: unknown;
}
