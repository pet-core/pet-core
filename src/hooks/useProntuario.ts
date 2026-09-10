import { useState, useEffect } from "react";
import { getUsuarioLogado } from "../services/authStorage";
import { getTutores } from "../services/userService";
import { getPetsByTutor } from "../services/petService";
import { addClinicalRecord } from "../services/clinicalRecordService";
import { KEYS } from "../services/storage";
import type { Usuario, Pet, RegistroClinico } from "../types/models";

export function useProntuario() {
    const [usuario, setUsuario] = useState<Usuario | null>(null);

    const [tutores, setTutores] = useState<Usuario[]>([]);

    const [tutorSelecionado, setTutorSelecionado] = useState<Usuario | null>(null);

    const [petsDoTutor, setPetsDoTutor] = useState<Pet[]>([]);

    const [petSelecionado, setPetSelecionado] = useState<Pet | null>(null);

    const [dataConsulta, setDataConsulta] = useState("");

    const [temperatura, setTemperatura] = useState("");

    const [peso, setPeso] = useState("");

    const [tratamento, setTratamento] = useState("");

    const [observacoes, setObservacoes] = useState("");

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

    function formatarData(texto: string) {
            let numeros = texto.replace(/\D/g, "");
            if (numeros.length > 8) {
                numeros = numeros.slice(0, 8);
            }
            if (numeros.length > 4) {
                return `${numeros.slice(0, 2)}/${numeros.slice(2, 4)}/${numeros.slice(4)}`;
            }
            if (numeros.length > 2) {
                return `${numeros.slice(0, 2)}/${numeros.slice(2)}`;
            }
            return numeros;
        }

    async function salvarProntuario() {
        if (!tutorSelecionado || !petSelecionado || !dataConsulta) {
            setMensagem("Selecione tutor, pet e informe a data da consulta.");
            return;
        }

        if (!usuario) {
            setMensagem("Usuário não encontrado.");
            return;
        }

        const novoProntuario: RegistroClinico = {
            id: `${Date.now()}`,
            tutorId: tutorSelecionado.id,
            tutorNome: tutorSelecionado.nome,
            petId: petSelecionado.id,
            petNome: petSelecionado.nome,
            veterinarioId: usuario.id,
            veterinarioNome: usuario.nome,
            dataConsulta,
            temperatura,
            peso,
            tratamento,
            observacoes,
        };

        await addClinicalRecord(KEYS.PRONTUARIOS, novoProntuario);

        setMensagem("Prontuário salvo com sucesso.");

        setTutorSelecionado(null);
        setPetsDoTutor([]);
        setPetSelecionado(null);
        setDataConsulta("");
        setTemperatura("");
        setPeso("");
        setTratamento("");
        setObservacoes("");
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
        dataConsulta,
        setDataConsulta,
        temperatura,
        setTemperatura,
        peso,
        setPeso,
        tratamento,
        setTratamento,
        observacoes,
        setObservacoes,
        mensagem,
        setMensagem,
        modalTutor,
        setModalTutor,
        modalPet,
        setModalPet,
        buscarDados,
        buscarPetsDoTutor,
        selecionarTutor,
        selecionarPet,
        formatarData,
        salvarProntuario,
    };
}
