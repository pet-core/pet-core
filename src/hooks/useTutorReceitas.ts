import { useMemo } from "react";
import { useRoute, type RouteProp } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import { selecionarReceitasDoTutor } from "../domain/tutorRecords";
import type { RootStackParamList } from "../types/navigation";
import { useReceitas } from "./api/useReceitas";
import { useCardAberto } from "./useCardAberto";

export function useTutorReceitas() {
    const { usuario } = useAuth();
    const { params } = useRoute<RouteProp<RootStackParamList, "TutorReceitas">>();
    const { data = [], isLoading, isError, error, refetch, isRefetching } = useReceitas();
    const { cardAberto, setCardAberto, abrirCard } = useCardAberto(params?.registroId);

    const receitas = useMemo(
        () => (usuario ? selecionarReceitasDoTutor(data, usuario.id) : []),
        [data, usuario],
    );

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
