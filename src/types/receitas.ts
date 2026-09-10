import type { RegistroClinico } from "./models";

export interface Receita extends RegistroClinico {
    tipoRegistro: "receita";
    veterinarioId: string;
    veterinarioNome: string;
    arquivoReceita: string;
    dataEnvio: string;
}

export interface CriarReceitaRequest {
    tutorId: string;
    tutorNome: string;
    petId: string;
    petNome: string;
    veterinarioId: string;
    veterinarioNome: string;
    arquivoReceita: string;
    dataEnvio: string;
    tipoRegistro: "receita";
}
