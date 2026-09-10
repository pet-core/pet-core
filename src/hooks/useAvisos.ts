import { useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useClinicalRecords } from "./api/useClinicalRecords";
import type { RegistroClinico } from "../types/models";

export function useAvisos() {
    const { usuario } = useAuth();
    const registrosQuery = useClinicalRecords("protocolo");
    const [cardAberto, setCardAberto] = useState<string | null>(null);

    const avisos = useMemo<RegistroClinico[]>(() => {
        if (!usuario) return [];

        return (registrosQuery.data ?? []).filter(
            (item) => item.tipoRegistro === "protocolo" && item.tutorId === usuario.id,
        );
    }, [registrosQuery.data, usuario]);

    function abrirCard(id: string) {
        setCardAberto((atual) => (atual === id ? null : id));
    }

    return {
        avisos,
        cardAberto,
        setCardAberto,
        buscarAvisos: registrosQuery.refetch,
        abrirCard,
        carregando: registrosQuery.isLoading,
        atualizando: registrosQuery.isFetching,
        erro: registrosQuery.error,
    };
}
