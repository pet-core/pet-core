import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";

export function usePetDetalhe() {
    const navigation = useNavigation();

    const route = useRoute();

    const { petId } = route.params;

    const [pet, setPet] = useState(null);

    useEffect(() => {
            buscarPet();
        }, []);

    async function buscarPet() {
            const petsStorage = await AsyncStorage.getItem("PETS");
    
            if (petsStorage !== null) {
                const pets = JSON.parse(petsStorage);
                const petEncontrado = pets.find((item) => item.id === petId);
                setPet(petEncontrado);
            }
        }

    async function alterarObito() {
            const petsStorage = await AsyncStorage.getItem("PETS");
            let pets = petsStorage ? JSON.parse(petsStorage) : [];
    
            const petsAtualizados = pets.map((item) => {
                if (item.id === pet.id) {
                    return { ...item, obitoInformado: !item.obitoInformado };
                }
                return item;
            });
    
            await AsyncStorage.setItem("PETS", JSON.stringify(petsAtualizados));
    
            const petAtualizado = petsAtualizados.find((item) => item.id === pet.id);
            setPet(petAtualizado);
        }

    return {
        pet,
        setPet,
        buscarPet,
        alterarObito,
    };
}
