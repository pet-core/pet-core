import { useState, useEffect } from "react";
import { useAppNavigation } from "../types";
import { getPetsByTutor } from "../services/petService";
import { getUsuarioLogado } from "../services/authStorage";
import type { Usuario, Pet } from "../types/models";

export function useTutorHome() {
    const navigation = useAppNavigation();

    const [usuario, setUsuario] = useState<Usuario | null>(null);

    const [pets, setPets] = useState<Pet[]>([]);

    useEffect(() => {
            buscarDados();
        }, []);

    async function buscarDados() {
        const user = await getUsuarioLogado();

        if (user !== null) {
            setUsuario(user);
            setPets(await getPetsByTutor(user.id));
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
