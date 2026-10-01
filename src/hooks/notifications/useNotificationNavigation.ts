import * as Notifications from "expo-notifications";
import { useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import { navigationRef } from "../../navigation/navigationRef";
import { interpretarPayload, resolverDestino } from "../../navigation/notificationRoutes";

/**
 * Leva o usuário à tela certa quando ele toca em uma notificação, seja com o
 * app em primeiro plano, em segundo plano ou fechado (abertura a frio).
 */
export function useNotificationNavigation(): void {
    const { usuario, autenticado, carregando } = useAuth();
    const resposta = Notifications.useLastNotificationResponse();
    const ultimaTratada = useRef<string | null>(null);

    useEffect(() => {
        if (!resposta || carregando || !autenticado || !usuario) return;

        const idResposta = resposta.notification.request.identifier;
        if (ultimaTratada.current === idResposta) return;

        const payload = interpretarPayload(resposta.notification.request.content.data);

        // Notificação de outra conta ou inválida: ignora e não tenta de novo.
        if (!payload || payload.usuarioId !== usuario.id) {
            ultimaTratada.current = idResposta;
            return;
        }

        const tentarNavegar = (): boolean => {
            // O navegador do tutor só existe depois do login; espera ele montar.
            if (!navigationRef.isReady() || !navigationRef.getCurrentRoute()?.name.startsWith("Tutor")) {
                return false;
            }
            const destino = resolverDestino(payload);
            navigationRef.navigate(destino.name, destino.params as never);
            ultimaTratada.current = idResposta;
            return true;
        };

        if (tentarNavegar()) return;

        return navigationRef.addListener("state", () => {
            tentarNavegar();
        });
    }, [resposta, carregando, autenticado, usuario]);
}
