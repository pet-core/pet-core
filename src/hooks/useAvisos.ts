import { useState, useEffect } from "react";
import type { RegistroClinico } from "../types/models";
import { getUsuarioLogado } from "../services/authStorage";
import { getClinicalRecords } from "../services/clinicalRecordService";
import { KEYS } from "../services/storage";

export function useAvisos() {
    const [avisos, setAvisos] = useState<RegistroClinico[]>([]);

    const [cardAberto, setCardAberto] = useState<string | null>(null);

    useEffect(() => {
            buscarAvisos();
        }, []);

    async function buscarAvisos() {
        const usuario = await getUsuarioLogado();

        if (usuario !== null) {
            const lista = await getClinicalRecords(KEYS.PROTOCOLOS_ENVIADOS);
            setAvisos(lista.filter((item) => item.tutorId === usuario.id));
        }
    }

    function abrirCard(id: string) {
            setCardAberto(cardAberto === id ? null : id);
        }

    return {
        avisos,
        setAvisos,
        cardAberto,
        setCardAberto,
        buscarAvisos,
        abrirCard,
    };
}
