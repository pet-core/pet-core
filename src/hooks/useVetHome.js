import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export function useVetHome() {
    const navigation = useNavigation();

    const [usuario, setUsuario] = useState(null);

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
