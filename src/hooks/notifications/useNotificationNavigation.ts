import * as Notifications from "expo-notifications";
import { useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import { navigationRef } from "../../navigation/navigationRef";
import { interpretarPayload, resolverDestino } from "../../navigation/notificationRoutes";

export function useNotificationNavigation(): void {
    const { usuario, autenticado, carregando } = useAuth();
    const resposta = Notifications.useLastNotificationResponse();
    const ultimaTratada = useRef<string | null>(null);

    useEffect(() => {
        if (!resposta || carregando || !autenticado || !usuario) return;

        const idResposta = resposta.notification.request.identifier;
        if (ultimaTratada.current === idResposta) return;

        const payload = interpretarPayload(resposta.notification.request.content.data);

        if (!payload || payload.usuarioId !== usuario.id) {
            ultimaTratada.current = idResposta;
            return;
        }

        const tentarNavegar = (): boolean => {
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
