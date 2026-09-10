import { useState, useEffect } from "react";
import type { RegistroClinico } from "../types/models";
import { getUsuarioLogado } from "../services/authStorage";
import { getClinicalRecords } from "../services/clinicalRecordService";
import { KEYS } from "../services/storage";

export function useTutorExames() {
    const [exames, setExames] = useState<RegistroClinico[]>([]);

    const [cardAberto, setCardAberto] = useState<string | null>(null);

    useEffect(() => {
            buscarExames();
        }, []);

    async function buscarExames() {
        const usuario = await getUsuarioLogado();

        if (usuario !== null) {
            const lista = await getClinicalRecords(KEYS.EXAMES_ENVIADOS);
            setExames(lista.filter((item) => item.tutorId === usuario.id));
        }
    }

    function abrirCard(id: string) {
            setCardAberto(cardAberto === id ? null : id);
        }

    return {
        exames,
        setExames,
        cardAberto,
        setCardAberto,
        buscarExames,
        abrirCard,
    };
}
