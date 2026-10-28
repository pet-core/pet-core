import { useCallback, useEffect, useState } from "react";

export function useCardAberto(idInicial?: string) {
    const [cardAberto, setCardAberto] = useState<string | null>(idInicial ?? null);

    useEffect(() => {
        if (idInicial) setCardAberto(idInicial);
    }, [idInicial]);

    const abrirCard = useCallback((id: string) => {
        setCardAberto((atual) => (atual === id ? null : id));
    }, []);

    return { cardAberto, setCardAberto, abrirCard };
}
