import type { PropsWithChildren } from "react";
import { useNotificationNavigation } from "../hooks/notifications/useNotificationNavigation";
import { useTutorNotifications } from "../hooks/notifications/useTutorNotifications";

export function NotificationsProvider({ children }: PropsWithChildren) {
    useTutorNotifications();
    useNotificationNavigation();
    return <>{children}</>;
}
