import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export function useAvisos() {
    const navigation = useNavigation();

    const [avisos, setAvisos] = useState([]);

    const [cardAberto, setCardAberto] = useState(null);

    useEffect(() => {
            buscarAvisos();
        }, []);

    async function buscarAvisos() {
            const usuarioStorage = await AsyncStorage.getItem("USUARIO_LOGADO");
            const protocolosStorage = await AsyncStorage.getItem("PROTOCOLOS_ENVIADOS");
    
            if (usuarioStorage !== null) {
                const usuario = JSON.parse(usuarioStorage);
                const lista = protocolosStorage ? JSON.parse(protocolosStorage) : [];
                setAvisos(lista.filter((item) => item.tutorId === usuario.id));
            }
        }

    function abrirCard(id) {
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
