import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { COR_NOTIFICACAO } from "../../config/notifications";
import type { CanalNotificacao, NotificacaoLocal } from "../../types/notifications";

/**
 * Única camada que conhece o expo-notifications para disparo e permissão.
 * Hooks e regras de negócio nunca importam a biblioteca diretamente.
 */

const suportado = Platform.OS !== "web";

const CANAIS: Record<CanalNotificacao, { nome: string; descricao: string }> = {
    "avisos-clinicos": {
        nome: "Avisos clínicos",
        descricao: "Protocolos, receitas e exames enviados pelo veterinário.",
    },
    comedouro: {
        nome: "Comedouro inteligente",
        descricao: "Alertas quando o comedouro do seu pet está vazio.",
    },
};

/** Faz a notificação aparecer como banner também com o app em primeiro plano. */
export function configurarNotificacoes(): void {
    if (!suportado) return;

    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowBanner: true,
            shouldShowList: true,
            shouldPlaySound: true,
            shouldSetBadge: false,
        }),
    });
}

async function prepararCanaisAndroid(): Promise<void> {
    if (Platform.OS !== "android") return;

    await Promise.all(
        (Object.keys(CANAIS) as CanalNotificacao[]).map((id) =>
            Notifications.setNotificationChannelAsync(id, {
                name: CANAIS[id].nome,
                description: CANAIS[id].descricao,
                importance: Notifications.AndroidImportance.HIGH,
                lightColor: COR_NOTIFICACAO,
            }),
        ),
    );
}

/** Cria os canais (Android) e pede permissão ao usuário, se ainda necessário. */
export async function garantirPermissaoNotificacoes(): Promise<boolean> {
    if (!suportado) return false;

    await prepararCanaisAndroid();

    const atual = await Notifications.getPermissionsAsync();
    if (atual.granted) return true;
    if (!atual.canAskAgain) return false;

    const solicitada = await Notifications.requestPermissionsAsync();
    return solicitada.granted;
}

/** Exibe imediatamente uma notificação local. */
export async function dispararNotificacaoLocal(notificacao: NotificacaoLocal): Promise<void> {
    if (!suportado) return;

    await Notifications.scheduleNotificationAsync({
        content: {
            title: notificacao.titulo,
            body: notificacao.corpo,
            data: notificacao.payload,
            color: COR_NOTIFICACAO,
        },
        trigger: Platform.OS === "android" ? { channelId: notificacao.canal } : null,
    });
}

/** Remove da bandeja as notificações já exibidas (ex.: ao encerrar a sessão). */
export async function limparNotificacoesExibidas(): Promise<void> {
    if (!suportado) return;
    await Notifications.dismissAllNotificationsAsync();
}
