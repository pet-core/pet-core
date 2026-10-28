import type { StatusComedouro } from "./models";

export type TipoRegistroNotificavel = "protocolo" | "receita" | "exame";
export type TipoNotificacao = TipoRegistroNotificavel | "comedouro";

export type PayloadNotificacao = {
    tipo: TipoNotificacao;
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

export interface EstadoNotificacoes {
    idsVistos: Record<TipoRegistroNotificavel, string[]>;
    comedouros: Record<string, StatusComedouro>;
}
