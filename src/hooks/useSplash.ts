import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useAppNavigation } from "../types";
import { perfilInicial } from "../context/AuthContext";

export function useSplash() {
    const navigation = useAppNavigation();
    const { usuario, carregando } = useAuth();

    useEffect(() => {
        if (carregando) return;
        const timer = setTimeout(() => navigation.replace(perfilInicial(usuario)), 400);
        return () => clearTimeout(timer);
    }, [carregando, usuario, navigation]);

    return { carregando };
}
