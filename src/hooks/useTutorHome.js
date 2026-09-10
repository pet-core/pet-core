import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export function useTutorHome() {
    const navigation = useNavigation();

    const [usuario, setUsuario] = useState(null);

    const [pets, setPets] = useState([]);

    useEffect(() => {
            buscarDados();
        }, []);

    async function buscarDados() {
            const usuarioStorage = await AsyncStorage.getItem("USUARIO_LOGADO");
            const petsStorage = await AsyncStorage.getItem("PETS");
    
            if (usuarioStorage !== null) {
                const user = JSON.parse(usuarioStorage);
                setUsuario(user);
                const todosPets = petsStorage ? JSON.parse(petsStorage) : [];
                setPets(todosPets.filter((pet) => pet.tutorId === user.id));
            }
        }

    function abrirPet(pet) {
            navigation.navigate("TutorPetDetalhe", { petId: pet.id });
        }

    return {
        usuario,
        setUsuario,
        pets,
        setPets,
        buscarDados,
        abrirPet,
    };
}
