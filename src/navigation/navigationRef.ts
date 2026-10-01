import { createNavigationContainerRef } from "@react-navigation/native";
import type { RootStackParamList } from "../types/navigation";

/** Permite navegar a partir de fora das telas (ex.: toque em notificação). */
export const navigationRef = createNavigationContainerRef<RootStackParamList>();
