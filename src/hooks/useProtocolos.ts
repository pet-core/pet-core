import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useCriarClinicalRecord } from "./api/useClinicalRecords";
import { usePets } from "./api/usePets";
import { useTutores } from "./api/useUsers";
import { useProtocolosApi } from "./api/useProtocolos";
import type { Pet, Protocolo, RegistroClinico } from "../types/models";

type UsuarioSemSenha = Omit<NonNullable<ReturnType<typeof useAuth>["usuario"]>, "senha">;

export function useProtocolos() {
    const { usuario } = useAuth();
    const tutoresQuery = useTutores();
    const protocolosQuery = useProtocolosApi();
    const criarRegistro = useCriarClinicalRecord();

    const [tutorSelecionado, setTutorSelecionado] = useState<UsuarioSemSenha | null>(null);
    const [petSelecionado, setPetSelecionado] = useState<Pet | null>(null);
    const [protocoloSelecionado, setProtocoloSelecionado] = useState<Protocolo | null>(null);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [mensagem, setMensagem] = useState("");
    const [modalTutor, setModalTutor] = useState(false);
    const [modalPet, setModalPet] = useState(false);

    const petsQuery = usePets(tutorSelecionado?.id, Boolean(tutorSelecionado?.id));

    function abrirFormulario(protocolo: Protocolo) {
        setProtocoloSelecionado(protocolo);
        setMostrarFormulario(true);
        setTutorSelecionado(null);
        setPetSelecionado(null);
        setMensagem("");
    }

    function selecionarTutor(item: UsuarioSemSenha) {
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

    async function enviarProtocolo() {
        if (!protocoloSelecionado || !tutorSelecionado || !petSelecionado) {
            setMensagem("Selecione tutor e pet.");
            return;
        }

        if (!usuario) {
            setMensagem("Usuário não encontrado.");
            return;
        }

        const novoProtocolo: RegistroClinico = {
            id: "",
            tutorId: tutorSelecionado.id,
            tutorNome: tutorSelecionado.nome,
            petId: petSelecionado.id,
            petNome: petSelecionado.nome,
            veterinarioId: usuario.id,
            veterinarioNome: usuario.nome,
            tipoRegistro: "protocolo",
            titulo: protocoloSelecionado.titulo,
            texto: protocoloSelecionado.texto,
            dataEnvio: new Date().toLocaleDateString("pt-BR"),
        };

        try {
            const { id: _id, ...dados } = novoProtocolo;
            await criarRegistro.mutateAsync(dados);
            setMensagem("Protocolo enviado para o tutor.");
            setMostrarFormulario(false);
            setProtocoloSelecionado(null);
            setTutorSelecionado(null);
            setPetSelecionado(null);
        } catch {
            setMensagem("Não foi possível enviar o protocolo. Tente novamente.");
        }
    }

    return {
        usuario,
        tutores: tutoresQuery.data ?? [],
        tutorSelecionado,
        setTutorSelecionado,
        petsDoTutor: petsQuery.data ?? [],
        petSelecionado,
        setPetSelecionado,
        protocoloSelecionado,
        setProtocoloSelecionado,
        protocolos: protocolosQuery.data ?? [],
        mostrarFormulario,
        setMostrarFormulario,
        mensagem,
        setMensagem,
        modalTutor,
        setModalTutor,
        modalPet,
        setModalPet,
        buscarDados: () => void Promise.all([tutoresQuery.refetch(), protocolosQuery.refetch()]),
        buscarPetsDoTutor: () => void petsQuery.refetch(),
        abrirFormulario,
        selecionarTutor,
        selecionarPet,
        enviarProtocolo,
        carregandoProtocolos: protocolosQuery.isLoading,
        carregandoTutores: tutoresQuery.isLoading,
        carregandoPets: petsQuery.isLoading,
        enviandoProtocolo: criarRegistro.isPending,
        erroProtocolos: protocolosQuery.error,
        erroTutores: tutoresQuery.error,
        erroPets: petsQuery.error,
    };
}
