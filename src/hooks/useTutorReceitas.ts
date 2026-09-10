import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Usuario, RegistroClinico } from "../types/models";

export function useTutorReceitas() {
    const [receitas, setReceitas] = useState<RegistroClinico[]>([]);

    const [cardAberto, setCardAberto] = useState<string | null>(null);

    useEffect(() => {
            buscarReceitas();
        }, []);

    async function buscarReceitas() {
            const usuarioStorage = await AsyncStorage.getItem("USUARIO_LOGADO");
            const receitasStorage = await AsyncStorage.getItem("RECEITAS_ENVIADAS");
    
            if (usuarioStorage !== null) {
                const usuario: Usuario = JSON.parse(usuarioStorage);
                const listaReceitas: RegistroClinico[] = receitasStorage ? JSON.parse(receitasStorage) : [];
                setReceitas(listaReceitas.filter((item) => item.tutorId === usuario.id));
            }
        }

    function abrirCard(id: string) {
            setCardAberto(cardAberto === id ? null : id);
        }

    return {
        receitas,
        setReceitas,
        cardAberto,
        setCardAberto,
        buscarReceitas,
        abrirCard,
    };
}
