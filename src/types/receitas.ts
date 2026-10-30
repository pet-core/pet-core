import type { RegistroClinico } from "./models";

export interface Receita extends RegistroClinico {
    tipoRegistro?: string;
    veterinarioId?: string;
    veterinarioNome?: string;
    arquivoReceita?: string;
    dataEnvio?: string;
    nome?: string;
    validade?: string;
    idMedicoResponsavel?: string;
    idProntuario?: string;
    idMedicamentos?: string[];
}

export interface CriarReceitaRequest {
    /** Obrigatório: ID do médico responsável */
    idMedicoResponsavel: string;
    veterinarioId?: string;
    tutorId?: string;
    tutorNome?: string;
    petId?: string;
    petNome?: string;
    veterinarioNome?: string;
    nome?: string;
    validade?: string;
    arquivoReceita?: string;
    dataEnvio?: string;
    tipoRegistro?: string;
    idProntuario?: string;
    idMedicamentos?: string[];
}
