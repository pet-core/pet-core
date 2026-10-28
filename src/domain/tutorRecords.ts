import type { RegistroClinico } from "../types/models";


export function selecionarProtocolosDoTutor(registros: RegistroClinico[], tutorId: string): RegistroClinico[] {
    return registros.filter((item) => item.tipoRegistro === "protocolo" && item.tutorId === tutorId);
}

export function selecionarExamesDoTutor(registros: RegistroClinico[], tutorId: string): RegistroClinico[] {
    return registros.filter((item) => item.tutorId === tutorId && Boolean(item.tipoExame));
}

export function selecionarReceitasDoTutor<T extends RegistroClinico>(receitas: T[], tutorId: string): T[] {
    return receitas.filter((item) => item.tutorId === tutorId);
}
