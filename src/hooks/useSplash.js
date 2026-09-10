import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { mockUsers, mockPets } from "../data/mockData";

export function useSplash() {
    const navigation = useNavigation();

    useEffect(() => {
        iniciarApp();
    }, []);

    async function iniciarApp() {
        const usuarios = await AsyncStorage.getItem("USUARIOS");
        const pets = await AsyncStorage.getItem("PETS");

        if (usuarios === null) {
            await AsyncStorage.setItem("USUARIOS", JSON.stringify(mockUsers));
        }
        if (pets === null) {
            await AsyncStorage.setItem("PETS", JSON.stringify(mockPets));
        }

        const usuarioLogado = await AsyncStorage.getItem("USUARIO_LOGADO");

        setTimeout(() => {
            if (usuarioLogado === null) {
                navigation.replace("Login");
            } else {
                const usuario = JSON.parse(usuarioLogado);
                if (usuario.tipoPerfil === "veterinario") {
                    navigation.replace("VetHome");
                } else {
                    navigation.replace("TutorHome");
                }
            }
        }, 700);
    }

    return {};
}
