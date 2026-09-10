import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Usuario, RegistroClinico } from "../types/models";

export function useAvisos() {
    const [avisos, setAvisos] = useState<RegistroClinico[]>([]);

    const [cardAberto, setCardAberto] = useState<string | null>(null);

    useEffect(() => {
            buscarAvisos();
        }, []);

    async function buscarAvisos() {
            const usuarioStorage = await AsyncStorage.getItem("USUARIO_LOGADO");
            const protocolosStorage = await AsyncStorage.getItem("PROTOCOLOS_ENVIADOS");
    
            if (usuarioStorage !== null) {
                const usuario: Usuario = JSON.parse(usuarioStorage);
                const lista: RegistroClinico[] = protocolosStorage ? JSON.parse(protocolosStorage) : [];
                setAvisos(lista.filter((item) => item.tutorId === usuario.id));
            }
        }

    function abrirCard(id: string) {
            setCardAberto(cardAberto === id ? null : id);
        }

    return {
        avisos,
        setAvisos,
        cardAberto,
        setCardAberto,
        buscarAvisos,
        abrirCard,
    };
}
