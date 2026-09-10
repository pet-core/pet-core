import { useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTutores } from "./api/useUsers";
import { usePets } from "./api/usePets";
import { useClinicalRecords, useCriarClinicalRecord } from "./api/useClinicalRecords";
import type { Pet, RegistroClinico, Usuario } from "../types/models";

export function useRelatorios() {
    const { usuario } = useAuth();
    const tutoresQuery = useTutores();
    const [tutorSelecionado, setTutorSelecionado] = useState<Usuario | null>(null);
    const [petSelecionado, setPetSelecionado] = useState<Pet | null>(null);
    const [mensagem, setMensagem] = useState("");
    const [modalTutor, setModalTutor] = useState(false);
    const [modalPet, setModalPet] = useState(false);

    const petsQuery = usePets(tutorSelecionado?.id);
    const registrosQuery = useClinicalRecords("prontuario");
    const criarRelatorio = useCriarClinicalRecord("relatorio");

    const tutores = tutoresQuery.data ?? [];
    const petsDoTutor = petsQuery.data ?? [];
    const prontuariosPet = useMemo(
        () => (registrosQuery.data ?? []).filter(
            (item) => item.petId === petSelecionado?.id && item.tipoRegistro === "prontuario",
        ),
        [registrosQuery.data, petSelecionado?.id],
    );

    function selecionarTutor(item: Usuario) {
        setTutorSelecionado(item);
        setPetSelecionado(null);
        setMensagem("");
        setModalTutor(false);
    }

    function selecionarPet(item: Pet) {
        setPetSelecionado(item);
        setMensagem("");
        setModalPet(false);
    }

    async function enviarRelatorio() {
        if (!tutorSelecionado || !petSelecionado) {
            setMensagem("Selecione tutor e pet.");
            return;
        }
        if (prontuariosPet.length === 0) {
            setMensagem("Este pet ainda não possui prontuários.");
            return;
        }
        if (!usuario) {
            setMensagem("Usuário não encontrado.");
            return;
        }

        try {
            await criarRelatorio.mutateAsync({
                tutorId: tutorSelecionado.id,
                tutorNome: tutorSelecionado.nome,
                petId: petSelecionado.id,
                petNome: petSelecionado.nome,
                veterinarioId: usuario.id,
                veterinarioNome: usuario.nome,
                dataEmissao: new Date().toLocaleDateString("pt-BR"),
                arquivoHistorico: `historico_clinico_${petSelecionado.nome.toLowerCase().replaceAll(" ", "_")}.pdf`,
                prontuarios: JSON.stringify(prontuariosPet),
                tipoRegistro: "historico",
            } as unknown as import("../types/api").ClinicalRecordCreateRequest);
            setMensagem("Histórico enviado para o tutor.");
        } catch {
            setMensagem("Não foi possível enviar o relatório. Tente novamente.");
        }
    }

    return {
        usuario,
        tutores,
        tutorSelecionado,
        setTutorSelecionado,
        petsDoTutor,
        petSelecionado,
        setPetSelecionado,
        prontuariosPet,
        mensagem,
        setMensagem,
        modalTutor,
        setModalTutor,
        modalPet,
        setModalPet,
        selecionarTutor,
        selecionarPet,
        enviarRelatorio,
        carregandoTutores: tutoresQuery.isLoading,
        carregandoPets: petsQuery.isLoading,
        carregandoProntuarios: registrosQuery.isLoading,
        enviando: criarRelatorio.isPending,
        erroTutores: tutoresQuery.error,
        erroPets: petsQuery.error,
        erroProntuarios: registrosQuery.error,
        atualizar: () => {
            void tutoresQuery.refetch();
            if (tutorSelecionado) void petsQuery.refetch();
            void registrosQuery.refetch();
        },
    };
}
