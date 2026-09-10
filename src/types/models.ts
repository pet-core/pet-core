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
}

export interface Pet {
    id: string;
    tutorId: string;
    nome: string;
    nascimento: string;
    especie: string;
    raca: string;
    porte: string;
    pelagem: string;
    sexo: string;
    obitoInformado: boolean;
    comedouroStatus: "cheio" | "vazio";
}

export interface Clinica {
    nome: string;
    cnpj: string;
    cep: string;
    complemento: string;
}

export interface Protocolo {
    id: string;
    titulo: string;
    texto: string;
}

// Registros clínicos criados dinamicamente pelas telas do veterinário
// (exames, receitas, prontuários, relatórios, solicitações de histórico).
// Os campos em comum ficam tipados; campos específicos de cada tela usam
// index signature, já que ainda não existe uma API real por trás deles.
export interface RegistroClinico {
    id: string;
    tutorId: string;
    tutorNome: string;
    petId: string;
    petNome: string;
    [campo: string]: unknown;
}
