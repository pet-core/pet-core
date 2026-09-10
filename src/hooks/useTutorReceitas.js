import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export function useTutorReceitas() {
    const navigation = useNavigation();

    const [receitas, setReceitas] = useState([]);

    const [cardAberto, setCardAberto] = useState(null);

    useEffect(() => {
            buscarReceitas();
        }, []);

    async function buscarReceitas() {
            const usuarioStorage = await AsyncStorage.getItem("USUARIO_LOGADO");
            const receitasStorage = await AsyncStorage.getItem("RECEITAS_ENVIADAS");
    
            if (usuarioStorage !== null) {
                const usuario = JSON.parse(usuarioStorage);
                const listaReceitas = receitasStorage ? JSON.parse(receitasStorage) : [];
                setReceitas(listaReceitas.filter((item) => item.tutorId === usuario.id));
            }
        }

    function abrirCard(id) {
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
