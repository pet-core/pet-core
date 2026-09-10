import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export function useComedouro() {
    const navigation = useNavigation();

    const [pets, setPets] = useState([]);

    const [petAberto, setPetAberto] = useState(null);

    const [mensagem, setMensagem] = useState("");

    useEffect(() => {
            buscarPets();
        }, []);

    async function buscarPets() {
            const usuarioStorage = await AsyncStorage.getItem("USUARIO_LOGADO");
            const petsStorage = await AsyncStorage.getItem("PETS");
    
            if (usuarioStorage !== null && petsStorage !== null) {
                const usuario = JSON.parse(usuarioStorage);
                const todosPets = JSON.parse(petsStorage);
                setPets(todosPets.filter((pet) => pet.tutorId === usuario.id));
            }
        }

    function abrirPet(id) {
            setPetAberto(petAberto === id ? null : id);
            setMensagem("");
        }

    async function encherComedouro(petId) {
            const petAtual = pets.find((pet) => pet.id === petId);
    
            if (petAtual && petAtual.comedouroStatus === "cheio") {
                setMensagem("O comedouro já está cheio.");
                return;
            }
    
            const petsStorage = await AsyncStorage.getItem("PETS");
            let todosPets = petsStorage ? JSON.parse(petsStorage) : [];
    
            todosPets = todosPets.map((pet) => {
                if (pet.id === petId) {
                return { ...pet, comedouroStatus: "cheio" };
                }
                return pet;
            });
    
            await AsyncStorage.setItem("PETS", JSON.stringify(todosPets));
            setMensagem("Comedouro preenchido com sucesso.");
            buscarPets();
        }

    return {
        pets,
        setPets,
        petAberto,
        setPetAberto,
        mensagem,
        setMensagem,
        buscarPets,
        abrirPet,
        encherComedouro,
    };
}
