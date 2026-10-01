import type { PropsWithChildren } from "react";
import { useNotificationNavigation } from "../hooks/notifications/useNotificationNavigation";
import { useTutorNotifications } from "../hooks/notifications/useTutorNotifications";

/** Ativa a geração e o tratamento de notificações enquanto há sessão. */
export function NotificationsProvider({ children }: PropsWithChildren) {
    useTutorNotifications();
    useNotificationNavigation();
    return <>{children}</>;
}
