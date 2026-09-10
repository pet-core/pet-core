import { useState, useEffect } from "react";
import { useRoute, type RouteProp } from "@react-navigation/native";
import type { RootStackParamList } from "../types/navigation";
import type { Pet } from "../types/models";
import { getPetById, updatePet } from "../services/petService";

export function usePetDetalhe() {
    const route = useRoute<RouteProp<RootStackParamList, "TutorPetDetalhe">>();

    const { petId } = route.params;

    const [pet, setPet] = useState<Pet | null>(null);

    useEffect(() => {
            buscarPet();
        }, []);

    async function buscarPet() {
        setPet(await getPetById(petId));
    }

    async function alterarObito() {
        if (!pet) {
            return;
        }

        const petAtualizado: Pet = {
            ...pet,
            obitoInformado: !pet.obitoInformado,
        };

        await updatePet(petAtualizado);
        setPet(petAtualizado);
    }

    return {
        pet,
        setPet,
        buscarPet,
        alterarObito,
    };
}
