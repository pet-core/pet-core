import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Usuario, RegistroClinico } from "../types/models";

export function useTutorExames() {
    const [exames, setExames] = useState<RegistroClinico[]>([]);

    const [cardAberto, setCardAberto] = useState<string | null>(null);

    useEffect(() => {
            buscarExames();
        }, []);

    async function buscarExames() {
            const usuarioStorage = await AsyncStorage.getItem("USUARIO_LOGADO");
            const examesStorage = await AsyncStorage.getItem("EXAMES_ENVIADOS");
    
            if (usuarioStorage !== null) {
                const user: Usuario = JSON.parse(usuarioStorage);
                const listaExames: RegistroClinico[] = examesStorage ? JSON.parse(examesStorage) : [];
                setExames(listaExames.filter((item) => item.tutorId === user.id));
            }
        }

    function abrirCard(id: string) {
            setCardAberto(cardAberto === id ? null : id);
        }

    return {
        exames,
        setExames,
        cardAberto,
        setCardAberto,
        buscarExames,
        abrirCard,
    };
}
