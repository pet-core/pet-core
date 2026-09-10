import { useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useCriarClinicalRecord, useClinicalRecords } from "./api/useClinicalRecords";
import { usePets } from "./api/usePets";
import type { Pet, RegistroClinico } from "../types/models";

export function useHistorico() {
    const { usuario } = useAuth();
    const [petSelecionado, setPetSelecionado] = useState<Pet | null>(null);
    const [mensagem, setMensagem] = useState("");
    const [cardAberto, setCardAberto] = useState<string | null>(null);
    const [modalPet, setModalPet] = useState(false);

    const petsQuery = usePets(usuario?.id, Boolean(usuario?.id));
    const registrosQuery = useClinicalRecords();
    const criarRegistro = useCriarClinicalRecord();

    const historicos = useMemo(
        () => (registrosQuery.data ?? []).filter(
            (item) => item.tutorId === usuario?.id && item.tipoRegistro === "historico",
        ),
        [registrosQuery.data, usuario?.id],
    );

    function selecionarPet(item: Pet) {
        setPetSelecionado(item);
        setMensagem("");
        setModalPet(false);
    }

    async function solicitarHistorico() {
        if (!petSelecionado) {
            setMensagem("Selecione um pet para solicitar o histórico.");
            return;
        }

        if (!usuario) {
            setMensagem("Sessão do usuário não encontrada.");
            return;
        }

        setMensagem("");

        try {
            await criarRegistro.mutateAsync({
                tutorId: usuario.id,
                tutorNome: usuario.nome,
                petId: petSelecionado.id,
                petNome: petSelecionado.nome,
                tipoRegistro: "solicitacao_historico",
                status: "Solicitado",
                dataSolicitacao: new Date().toISOString(),
            });
            setMensagem("Solicitação de histórico enviada com sucesso.");
        } catch {
            setMensagem("Não foi possível solicitar o histórico. Tente novamente.");
        }
    }

    function abrirCard(id: string) {
        setCardAberto(cardAberto === id ? null : id);
    }

    async function atualizar() {
        await Promise.all([petsQuery.refetch(), registrosQuery.refetch()]);
    }

    return {
        usuario,
        pets: petsQuery.data ?? [],
        petSelecionado,
        setPetSelecionado,
        historicos,
        mensagem,
        setMensagem,
        cardAberto,
        modalPet,
        setModalPet,
        selecionarPet,
        solicitarHistorico,
        abrirCard,
        atualizar,
        carregando: petsQuery.isLoading || registrosQuery.isLoading,
        atualizando: petsQuery.isRefetching || registrosQuery.isRefetching,
        salvando: criarRegistro.isPending,
        erro: petsQuery.error ?? registrosQuery.error,
    };
}
