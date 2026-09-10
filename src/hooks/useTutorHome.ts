import { useEffect, useState } from "react";
import { useAppNavigation } from "../types";
import { getUsuarioLogado } from "../services/authStorage";
import type { Usuario, Pet } from "../types/models";
import { usePets } from "./api/usePets";

export function useTutorHome() {
    const navigation = useAppNavigation();
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    useEffect(() => { void carregarUsuario(); }, []);
    async function carregarUsuario() { setUsuario(await getUsuarioLogado()); }
    const petsQuery = usePets(usuario?.id);
    const pets = petsQuery.data ?? [];
    function abrirPet(pet: Pet) { navigation.navigate("TutorPetDetalhe", { petId: pet.id }); }
    return { usuario, pets, abrirPet, isLoading: petsQuery.isLoading, isRefreshing: petsQuery.isFetching && !petsQuery.isLoading, error: petsQuery.error, refetch: petsQuery.refetch };
}
