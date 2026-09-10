import { useState, useEffect } from "react";
import type { Pet } from "../types/models";
import { getUsuarioLogado } from "../services/authStorage";
import { getPetsByTutor, updatePet } from "../services/petService";

export function useComedouro() {
    const [pets, setPets] = useState<Pet[]>([]);

    const [petAberto, setPetAberto] = useState<string | null>(null);

    const [mensagem, setMensagem] = useState("");

    useEffect(() => {
            buscarPets();
        }, []);

    async function buscarPets() {
        const usuario = await getUsuarioLogado();

        if (usuario !== null) {
            setPets(await getPetsByTutor(usuario.id));
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

        if (petAtual) {
            await updatePet({
                ...petAtual,
                comedouroStatus: "cheio",
            });
        }

        setMensagem("Comedouro preenchido com sucesso.");
        await buscarPets();
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
