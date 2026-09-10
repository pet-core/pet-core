import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export function useProntuario() {
    const navigation = useNavigation();

    const [usuario, setUsuario] = useState(null);

    const [tutores, setTutores] = useState([]);

    const [tutorSelecionado, setTutorSelecionado] = useState(null);

    const [petsDoTutor, setPetsDoTutor] = useState([]);

    const [petSelecionado, setPetSelecionado] = useState(null);

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
            const usuarioStorage = await AsyncStorage.getItem("USUARIO_LOGADO");
            const usuariosStorage = await AsyncStorage.getItem("USUARIOS");
    
            if (usuarioStorage !== null) setUsuario(JSON.parse(usuarioStorage));
    
            if (usuariosStorage !== null) {
                const usuarios = JSON.parse(usuariosStorage);
                setTutores(usuarios.filter((item) => item.tipoPerfil === "tutor"));
            }
        }

    async function buscarPetsDoTutor(tutorId) {
            const petsStorage = await AsyncStorage.getItem("PETS");
            const todosPets = petsStorage ? JSON.parse(petsStorage) : [];
            setPetsDoTutor(todosPets.filter((pet) => pet.tutorId === tutorId));
        }

    function selecionarTutor(item) {
            setTutorSelecionado(item);
            setPetSelecionado(null);
            setMensagem("");
            setModalTutor(false);
            buscarPetsDoTutor(item.id);
        }

    function selecionarPet(item) {
            setPetSelecionado(item);
            setMensagem("");
            setModalPet(false);
        }

    function formatarData(texto) {
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
    
            const storage = await AsyncStorage.getItem("PRONTUARIOS");
            let prontuarios = storage ? JSON.parse(storage) : [];
    
            const novoProntuario = {
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
    
            prontuarios.push(novoProntuario);
    
            await AsyncStorage.setItem("PRONTUARIOS", JSON.stringify(prontuarios));
    
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
