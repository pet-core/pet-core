import { useMemo } from "react";
import { useRoute, type RouteProp } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import { selecionarExamesDoTutor } from "../domain/tutorRecords";
import type { RootStackParamList } from "../types/navigation";
import { useClinicalRecords } from "./api/useClinicalRecords";
import { useCardAberto } from "./useCardAberto";

export function useTutorExames() {
    const { usuario } = useAuth();
    const { params } = useRoute<RouteProp<RootStackParamList, "TutorExames">>();
    const { data: registros = [], isLoading, isError, error, refetch } = useClinicalRecords("exame");
    const { cardAberto, setCardAberto, abrirCard } = useCardAberto(params?.registroId);

    const exames = useMemo(
        () => (usuario ? selecionarExamesDoTutor(registros, usuario.id) : []),
        [registros, usuario],
    );

    return { exames, cardAberto, setCardAberto, buscarExames: refetch, abrirCard, isLoading, isError, error };
}
