import type { RootStackParamList } from "../types/navigation";
import type { PayloadNotificacao, TipoNotificacao } from "../types/notifications";

export type DestinoNotificacao = {
    [R in keyof RootStackParamList]: { name: R; params: RootStackParamList[R] };
}[keyof RootStackParamList];

const TIPOS_VALIDOS: TipoNotificacao[] = ["protocolo", "receita", "exame", "comedouro"];

export function interpretarPayload(data: unknown): PayloadNotificacao | null {
    if (!data || typeof data !== "object") return null;

    const { tipo, usuarioId, registroId, petId } = data as Record<string, unknown>;

    if (typeof tipo !== "string" || !TIPOS_VALIDOS.includes(tipo as TipoNotificacao)) return null;
    if (typeof usuarioId !== "string") return null;

    return {
        tipo: tipo as TipoNotificacao,
        usuarioId,
        registroId: typeof registroId === "string" ? registroId : undefined,
        petId: typeof petId === "string" ? petId : undefined,
    };
}

export function resolverDestino(payload: PayloadNotificacao): DestinoNotificacao {
    switch (payload.tipo) {
        case "protocolo":
            return { name: "TutorAvisos", params: { registroId: payload.registroId } };
        case "receita":
            return { name: "TutorReceitas", params: { registroId: payload.registroId } };
        case "exame":
            return { name: "TutorExames", params: { registroId: payload.registroId } };
        case "comedouro":
            return { name: "TutorComedouro", params: { petId: payload.petId } };
    }
}
