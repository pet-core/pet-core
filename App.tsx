import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import AppNavigator from "./src/navigation/AppNavigator";
import { navigationRef } from "./src/navigation/navigationRef";
import { QueryProvider } from "./src/providers/QueryProvider";
import { NotificationsProvider } from "./src/providers/NotificationsProvider";
import { AuthProvider } from "./src/context/AuthContext";
import { configurarNotificacoes } from "./src/services/notifications/notificationService";
import { apiClient } from "./src/api";

configurarNotificacoes();

apiClient.get("/").catch(() => {}); // aquece o servidor (cold start); a resposta é ignorada

export default function App() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider>
                <QueryProvider>
                    <AuthProvider>
                        <NavigationContainer ref={navigationRef}>
                            <NotificationsProvider>
                                <StatusBar style="auto" />
                                <AppNavigator />
                            </NotificationsProvider>
                        </NavigationContainer>
                    </AuthProvider>
                </QueryProvider>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    );
}
