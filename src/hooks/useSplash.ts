import { useEffect } from "react";
import { useAppNavigation } from "../types";
import type { Usuario } from "../types/models";
import { KEYS, getData, initializeStorage } from "../services/storage";

export function useSplash() {
    const navigation = useAppNavigation();

    useEffect(() => {
        iniciarApp();
    }, []);

    async function iniciarApp() {
        await initializeStorage();

        const usuarioLogado = await getData<Usuario>(KEYS.USUARIO_LOGADO);

        setTimeout(() => {
            if (usuarioLogado === null) {
                navigation.replace("Login");
            } else if (usuarioLogado.tipoPerfil === "veterinario") {
                navigation.replace("VetHome");
            } else {
                navigation.replace("TutorHome");
            }
        }, 700);
    }

    return {};
}
