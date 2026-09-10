import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppNavigation } from "../types";
import type { Usuario, Pet } from "../types/models";

export function useTutorHome() {
    const navigation = useAppNavigation();

    const [usuario, setUsuario] = useState<Usuario | null>(null);

    const [pets, setPets] = useState<Pet[]>([]);

    useEffect(() => {
            buscarDados();
        }, []);

    async function buscarDados() {
            const usuarioStorage = await AsyncStorage.getItem("USUARIO_LOGADO");
            const petsStorage = await AsyncStorage.getItem("PETS");
    
            if (usuarioStorage !== null) {
                const user = JSON.parse(usuarioStorage);
                setUsuario(user);
                const todosPets: Pet[] = petsStorage ? JSON.parse(petsStorage) : [];
                setPets(todosPets.filter((pet) => pet.tutorId === user.id));
            }
        }

    function abrirPet(pet: Pet) {
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
