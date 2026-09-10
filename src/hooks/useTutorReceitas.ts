import { useState, useEffect } from "react";
import type { RegistroClinico } from "../types/models";
import { getUsuarioLogado } from "../services/authStorage";
import { getClinicalRecords } from "../services/clinicalRecordService";
import { KEYS } from "../services/storage";

export function useTutorReceitas() {
    const [receitas, setReceitas] = useState<RegistroClinico[]>([]);

    const [cardAberto, setCardAberto] = useState<string | null>(null);

    useEffect(() => {
            buscarReceitas();
        }, []);

    async function buscarReceitas() {
        const usuario = await getUsuarioLogado();

        if (usuario !== null) {
            const lista = await getClinicalRecords(KEYS.RECEITAS_ENVIADAS);
            setReceitas(lista.filter((item) => item.tutorId === usuario.id));
        }
    }

    function abrirCard(id: string) {
            setCardAberto(cardAberto === id ? null : id);
        }

    return {
        receitas,
        setReceitas,
        cardAberto,
        setCardAberto,
        buscarReceitas,
        abrirCard,
    };
}
