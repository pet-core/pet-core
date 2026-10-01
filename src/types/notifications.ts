import type { StatusComedouro } from "./models";

/** Eventos do sistema que geram notificação para o tutor. */
export type TipoRegistroNotificavel = "protocolo" | "receita" | "exame";
export type TipoNotificacao = TipoRegistroNotificavel | "comedouro";

/**
 * Dados que viajam dentro da notificação e são lidos de volta quando o
 * usuário toca nela. Usa `type` (e não `interface`) para ser compatível com
 * o `Record<string, unknown>` exigido pelo expo-notifications.
 */
export type PayloadNotificacao = {
    tipo: TipoNotificacao;
    /** Tutor dono do evento; impede abrir a notificação de outra conta. */
    usuarioId: string;
    registroId?: string;
    petId?: string;
};

export interface NotificacaoLocal {
    titulo: string;
    corpo: string;
    canal: CanalNotificacao;
    payload: PayloadNotificacao;
}

export type CanalNotificacao = "avisos-clinicos" | "comedouro";

/** Memória do que já foi observado; evita notificar duas vezes o mesmo evento. */
export interface EstadoNotificacoes {
    idsVistos: Record<TipoRegistroNotificavel, string[]>;
    comedouros: Record<string, StatusComedouro>;
}
