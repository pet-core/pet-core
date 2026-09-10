import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useClinicalRecords } from "./api/useClinicalRecords";

export function useTutorExames() {
    const { usuario } = useAuth();
    const { data: registros = [], isLoading, isError, error, refetch } = useClinicalRecords();
    const [cardAberto, setCardAberto] = useState<string | null>(null);

    const exames = registros.filter((item) => item.tutorId === usuario?.id && Boolean(item.tipoExame));

    function abrirCard(id: string) {
        setCardAberto((atual) => atual === id ? null : id);
    }

    return { exames, cardAberto, setCardAberto, buscarExames: refetch, abrirCard, isLoading, isError, error };
}
