import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute, type RouteProp } from "@react-navigation/native";
import type { RootStackParamList } from "../types/navigation";
import type { Pet } from "../types/models";

export function usePetDetalhe() {
    const route = useRoute<RouteProp<RootStackParamList, "TutorPetDetalhe">>();

    const { petId } = route.params;

    const [pet, setPet] = useState<Pet | null>(null);

    useEffect(() => {
            buscarPet();
        }, []);

    async function buscarPet() {
            const petsStorage = await AsyncStorage.getItem("PETS");
    
            if (petsStorage !== null) {
                const pets: Pet[] = JSON.parse(petsStorage);
                const petEncontrado = pets.find((item) => item.id === petId);
                setPet(petEncontrado ?? null);
            }
        }

    async function alterarObito() {
            const petsStorage = await AsyncStorage.getItem("PETS");
            let pets: Pet[] = petsStorage ? JSON.parse(petsStorage) : [];
    
            const petsAtualizados = pets.map((item) => {
                if (item.id === pet?.id) {
                    return { ...item, obitoInformado: !item.obitoInformado };
                }
                return item;
            });
    
            await AsyncStorage.setItem("PETS", JSON.stringify(petsAtualizados));
    
            const petAtualizado = petsAtualizados.find((item) => item.id === pet?.id);
            setPet(petAtualizado ?? null);
        }

    return {
        pet,
        setPet,
        buscarPet,
        alterarObito,
    };
}
