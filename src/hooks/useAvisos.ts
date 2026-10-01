import { useMemo } from "react";
import { useRoute, type RouteProp } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import { selecionarProtocolosDoTutor } from "../domain/tutorRecords";
import type { RootStackParamList } from "../types/navigation";
import type { RegistroClinico } from "../types/models";
import { useClinicalRecords } from "./api/useClinicalRecords";
import { useCardAberto } from "./useCardAberto";

export function useAvisos() {
    const { usuario } = useAuth();
    const { params } = useRoute<RouteProp<RootStackParamList, "TutorAvisos">>();
    const registrosQuery = useClinicalRecords("protocolo");
    const { cardAberto, setCardAberto, abrirCard } = useCardAberto(params?.registroId);

    const avisos = useMemo<RegistroClinico[]>(
        () => (usuario ? selecionarProtocolosDoTutor(registrosQuery.data ?? [], usuario.id) : []),
        [registrosQuery.data, usuario],
    );

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
