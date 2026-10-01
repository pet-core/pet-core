import type { RegistroClinico } from "../types/models";

/**
 * Seletores dos registros clínicos que pertencem a um tutor.
 * Compartilhados pelas telas (listas) e pelas regras de notificação, para que
 * ambos enxerguem exatamente os mesmos dados.
 */

export function selecionarProtocolosDoTutor(registros: RegistroClinico[], tutorId: string): RegistroClinico[] {
    return registros.filter((item) => item.tipoRegistro === "protocolo" && item.tutorId === tutorId);
}

export function selecionarExamesDoTutor(registros: RegistroClinico[], tutorId: string): RegistroClinico[] {
    return registros.filter((item) => item.tutorId === tutorId && Boolean(item.tipoExame));
}

export function selecionarReceitasDoTutor<T extends RegistroClinico>(receitas: T[], tutorId: string): T[] {
    return receitas.filter((item) => item.tutorId === tutorId);
}
