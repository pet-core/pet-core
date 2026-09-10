import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "./navigation";

export * from "./models";
export * from "./navigation";

export type AppNavigation = NativeStackNavigationProp<RootStackParamList>;

// Hook fino em cima de useNavigation já tipado com as rotas do app,
// para não precisar repetir o generic em cada tela/hook.
export function useAppNavigation() {
    return useNavigation<AppNavigation>();
}
