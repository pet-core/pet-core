import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Usuario, Pet } from "../types/models";

export function useComedouro() {
    const [pets, setPets] = useState<Pet[]>([]);

    const [petAberto, setPetAberto] = useState<string | null>(null);

    const [mensagem, setMensagem] = useState("");

    useEffect(() => {
            buscarPets();
        }, []);

    async function buscarPets() {
            const usuarioStorage = await AsyncStorage.getItem("USUARIO_LOGADO");
            const petsStorage = await AsyncStorage.getItem("PETS");
    
            if (usuarioStorage !== null && petsStorage !== null) {
                const usuario: Usuario = JSON.parse(usuarioStorage);
                const todosPets: Pet[] = JSON.parse(petsStorage);
                setPets(todosPets.filter((pet) => pet.tutorId === usuario.id));
            }
        }

    function abrirPet(id: string) {
            setPetAberto(petAberto === id ? null : id);
            setMensagem("");
        }

    async function encherComedouro(petId: string) {
            const petAtual = pets.find((pet) => pet.id === petId);
    
            if (petAtual && petAtual.comedouroStatus === "cheio") {
                setMensagem("O comedouro já está cheio.");
                return;
            }
    
            const petsStorage = await AsyncStorage.getItem("PETS");
            let todosPets: Pet[] = petsStorage ? JSON.parse(petsStorage) : [];
    
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
