import { useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import { INTERVALO_VERIFICACAO_EVENTOS_MS } from "../../config/notifications";
import { avaliarNotificacoes } from "../../domain/notifications/notificationRules";
import {
    selecionarExamesDoTutor,
    selecionarProtocolosDoTutor,
    selecionarReceitasDoTutor,
} from "../../domain/tutorRecords";
import {
    dispararNotificacaoLocal,
    garantirPermissaoNotificacoes,
    limparNotificacoesExibidas,
} from "../../services/notifications/notificationService";
import {
    obterEstadoNotificacoes,
    salvarEstadoNotificacoes,
} from "../../services/notifications/notificationStateStorage";
import { useClinicalRecords } from "../api/useClinicalRecords";
import { usePets } from "../api/usePets";
import { useReceitas } from "../api/useReceitas";

export function useTutorNotifications(): void {
    const { usuario } = useAuth();
    const tutorId = usuario?.tipoPerfil === "tutor" ? usuario.id : undefined;
    const ativo = Boolean(tutorId);

    const polling = { enabled: ativo, refetchInterval: INTERVALO_VERIFICACAO_EVENTOS_MS };
    const protocolosQuery = useClinicalRecords("protocolo", polling);
    const examesQuery = useClinicalRecords("exame", polling);
    const receitasQuery = useReceitas(polling);
    const petsQuery = usePets(tutorId, ativo, { refetchInterval: INTERVALO_VERIFICACAO_EVENTOS_MS });

    const processando = useRef(false);

    useEffect(() => {
        if (!tutorId) return;
        void garantirPermissaoNotificacoes();
    }, [tutorId]);

    useEffect(() => {
        if (!tutorId) {
            void limparNotificacoesExibidas();
        }
    }, [tutorId]);

    const protocolos = protocolosQuery.data;
    const exames = examesQuery.data;
    const receitas = receitasQuery.data;
    const pets = petsQuery.data;

    useEffect(() => {
        if (!tutorId || !protocolos || !exames || !receitas || !pets) return;
        if (processando.current) return;

        processando.current = true;

        void (async () => {
            try {
                const estadoAnterior = await obterEstadoNotificacoes(tutorId);

                const { notificacoes, estado } = avaliarNotificacoes(
                    {
                        usuarioId: tutorId,
                        protocolos: selecionarProtocolosDoTutor(protocolos, tutorId),
                        exames: selecionarExamesDoTutor(exames, tutorId),
                        receitas: selecionarReceitasDoTutor(receitas, tutorId),
                        pets,
                    },
                    estadoAnterior,
                );

                await salvarEstadoNotificacoes(tutorId, estado);

                if (notificacoes.length > 0 && (await garantirPermissaoNotificacoes())) {
                    for (const notificacao of notificacoes) {
                        await dispararNotificacaoLocal(notificacao);
                    }
                }
            } catch (erro) {
                console.warn("[notificações] falha ao avaliar eventos", erro);
            } finally {
                processando.current = false;
            }
        })();
    }, [tutorId, protocolos, exames, receitas, pets]);
}
