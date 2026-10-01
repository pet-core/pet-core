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
    // No React Native não existe "foco da janela": usamos o estado do app para
    // pausar a verificação periódica em segundo plano e atualizar ao voltar.
    useEffect(() => {
        if (Platform.OS === "web") return;

        const assinatura = AppState.addEventListener("change", (estado) => {
            focusManager.setFocused(estado === "active");
        });

        return () => assinatura.remove();
    }, []);

    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
