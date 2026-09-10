import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Usuario } from "../types/models";

export function useVetHome() {
    const [usuario, setUsuario] = useState<Usuario | null>(null);

    useEffect(() => {
            buscarUsuario();
        }, []);

    async function buscarUsuario() {
            const dados = await AsyncStorage.getItem("USUARIO_LOGADO");
            if (dados !== null) {
                setUsuario(JSON.parse(dados));
            }
        }

    return {
        usuario,
        setUsuario,
        buscarUsuario,
    };
}
