import { useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useReceitas } from "./api/useReceitas";

export function useTutorReceitas() {
    const { usuario } = useAuth();
    const { data = [], isLoading, isError, error, refetch, isRefetching } = useReceitas();
    const [cardAberto, setCardAberto] = useState<string | null>(null);

    const receitas = useMemo(
        () => data.filter((item) => item.tutorId === usuario?.id),
        [data, usuario?.id],
    );

    function abrirCard(id: string) {
        setCardAberto((atual) => (atual === id ? null : id));
    }

    return {
        receitas,
        cardAberto,
        setCardAberto,
        buscarReceitas: refetch,
        abrirCard,
        isLoading,
        isError,
        error,
        isRefetching,
    };
}
