import { useState, useEffect } from "react";
import { getUsuarioLogado } from "../services/authStorage";
import { getTutores } from "../services/userService";
import { getPetsByTutor } from "../services/petService";
import { addClinicalRecord } from "../services/clinicalRecordService";
import { KEYS } from "../services/storage";
import type { Usuario, Pet, Protocolo, RegistroClinico } from "../types/models";

export function useProtocolos() {
    const [usuario, setUsuario] = useState<Usuario | null>(null);

    const [tutores, setTutores] = useState<Usuario[]>([]);

    const [tutorSelecionado, setTutorSelecionado] = useState<Usuario | null>(null);

    const [petsDoTutor, setPetsDoTutor] = useState<Pet[]>([]);

    const [petSelecionado, setPetSelecionado] = useState<Pet | null>(null);

    const [protocoloSelecionado, setProtocoloSelecionado] = useState<Protocolo | null>(null);

    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    const [mensagem, setMensagem] = useState("");

    const [modalTutor, setModalTutor] = useState(false);

    const [modalPet, setModalPet] = useState(false);

    useEffect(() => {
            buscarDados();
        }, []);

    async function buscarDados() {
        const user = await getUsuarioLogado();
        const tutoresDisponiveis = await getTutores();

        if (user !== null) {
            setUsuario(user);
        }

        setTutores(tutoresDisponiveis);
    }

    async function buscarPetsDoTutor(tutorId: string) {
        setPetsDoTutor(await getPetsByTutor(tutorId));
    }

    function abrirFormulario(protocolo: Protocolo) {
            setProtocoloSelecionado(protocolo);
            setMostrarFormulario(true);
            setTutorSelecionado(null);
            setPetSelecionado(null);
            setPetsDoTutor([]);
            setMensagem("");
        }

    function selecionarTutor(item: Usuario) {
            setTutorSelecionado(item);
            setPetSelecionado(null);
            setMensagem("");
            setModalTutor(false);
            buscarPetsDoTutor(item.id);
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
            id: `${Date.now()}`,
            tutorId: tutorSelecionado.id,
            tutorNome: tutorSelecionado.nome,
            petId: petSelecionado.id,
            petNome: petSelecionado.nome,
            veterinarioId: usuario.id,
            veterinarioNome: usuario.nome,
            titulo: protocoloSelecionado.titulo,
            texto: protocoloSelecionado.texto,
            dataEnvio: new Date().toLocaleDateString("pt-BR"),
        };

        await addClinicalRecord(KEYS.PROTOCOLOS_ENVIADOS, novoProtocolo);

        setMensagem("Protocolo enviado para o tutor.");
        setMostrarFormulario(false);
        setProtocoloSelecionado(null);
        setTutorSelecionado(null);
        setPetSelecionado(null);
        setPetsDoTutor([]);
    }

    return {
        usuario,
        setUsuario,
        tutores,
        setTutores,
        tutorSelecionado,
        setTutorSelecionado,
        petsDoTutor,
        setPetsDoTutor,
        petSelecionado,
        setPetSelecionado,
        protocoloSelecionado,
        setProtocoloSelecionado,
        mostrarFormulario,
        setMostrarFormulario,
        mensagem,
        setMensagem,
        modalTutor,
        setModalTutor,
        modalPet,
        setModalPet,
        buscarDados,
        buscarPetsDoTutor,
        abrirFormulario,
        selecionarTutor,
        selecionarPet,
        enviarProtocolo,
    };
}
