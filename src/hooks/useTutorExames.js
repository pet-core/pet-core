import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export function useTutorExames() {
    const navigation = useNavigation();

    const [exames, setExames] = useState([]);

    const [cardAberto, setCardAberto] = useState(null);

    useEffect(() => {
            buscarExames();
        }, []);

    async function buscarExames() {
            const usuarioStorage = await AsyncStorage.getItem("USUARIO_LOGADO");
            const examesStorage = await AsyncStorage.getItem("EXAMES_ENVIADOS");
    
            if (usuarioStorage !== null) {
                const user = JSON.parse(usuarioStorage);
                const listaExames = examesStorage ? JSON.parse(examesStorage) : [];
                setExames(listaExames.filter((item) => item.tutorId === user.id));
            }
        }

    function abrirCard(id) {
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
