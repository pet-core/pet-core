import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useAtualizarPet, usePets } from "./api/usePets";

export function useComedouro() {
    const { usuario } = useAuth();
    const petsQuery = usePets(usuario?.id, Boolean(usuario?.id));
    const atualizarPet = useAtualizarPet();
    const [petAberto, setPetAberto] = useState<string | null>(null);
    const [mensagem, setMensagem] = useState("");

    const pets = petsQuery.data ?? [];

    function abrirPet(id: string) {
        setPetAberto(petAberto === id ? null : id);
        setMensagem("");
    }

    async function encherComedouro(petId: string) {
        const petAtual = pets.find((pet) => pet.id === petId);

        if (!petAtual) return;

        if (petAtual.comedouroStatus === "cheio") {
            setMensagem("O comedouro já está cheio.");
            return;
        }

        try {
            await atualizarPet.mutateAsync({
                id: petAtual.id,
                dados: {
                    ...petAtual,
                    comedouroStatus: "cheio",
                },
            });
            setMensagem("Comedouro preenchido com sucesso.");
        } catch {
            setMensagem("Não foi possível atualizar o comedouro.");
        }
    }

    return {
        pets,
        petAberto,
        setPetAberto,
        mensagem,
        setMensagem,
        buscarPets: petsQuery.refetch,
        abrirPet,
        encherComedouro,
        isLoading: petsQuery.isLoading,
        isRefreshing: petsQuery.isFetching && !petsQuery.isLoading,
        isUpdating: atualizarPet.isPending,
        error: petsQuery.error,
    };
}
