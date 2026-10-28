import { QueryClient, QueryClientProvider, focusManager } from "@tanstack/react-query";
import { useEffect, type PropsWithChildren } from "react";
import { AppState, Platform } from "react-native";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 30_000,
            retry: 1,
        },
        mutations: {
            retry: 0,
        },
    },
});

export function QueryProvider({ children }: PropsWithChildren) {
    useEffect(() => {
        if (Platform.OS === "web") return;

        const assinatura = AppState.addEventListener("change", (estado) => {
            focusManager.setFocused(estado === "active");
        });

        return () => assinatura.remove();
    }, []);

    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
