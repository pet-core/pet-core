import { useAppNavigation } from "../types";
import { useAuth } from "../context/AuthContext";
import type { Pet } from "../types/models";
import { usePets } from "./api/usePets";

export function useTutorHome() {
    const navigation = useAppNavigation();
    const { usuario } = useAuth();
    const petsQuery = usePets(usuario?.id, Boolean(usuario?.id));
    const pets = petsQuery.data ?? [];

    function abrirPet(pet: Pet) {
        navigation.navigate("TutorPetDetalhe", { petId: pet.id });
    }

    return {
        usuario,
        pets,
        abrirPet,
        isLoading: petsQuery.isLoading,
        isRefreshing: petsQuery.isFetching && !petsQuery.isLoading,
        error: petsQuery.error,
        refetch: petsQuery.refetch,
    };
}
