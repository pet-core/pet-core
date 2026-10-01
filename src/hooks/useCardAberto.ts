import { useCallback, useEffect, useState } from "react";

/**
 * Controla qual card de uma lista está expandido. Quando a tela é aberta por
 * uma notificação, `idInicial` já deixa o item correspondente aberto.
 */
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
