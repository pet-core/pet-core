import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "./navigation";

export * from "./models";
export * from "./navigation";

export type AppNavigation = NativeStackNavigationProp<RootStackParamList>;

export function useAppNavigation() {
    return useNavigation<AppNavigation>();
}
export * from "./api";
