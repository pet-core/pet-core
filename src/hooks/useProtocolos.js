import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export function useProtocolos() {
    const navigation = useNavigation();

    const [usuario, setUsuario] = useState(null);

    const [tutores, setTutores] = useState([]);

    const [tutorSelecionado, setTutorSelecionado] = useState(null);

    const [petsDoTutor, setPetsDoTutor] = useState([]);

    const [petSelecionado, setPetSelecionado] = useState(null);

    const [protocoloSelecionado, setProtocoloSelecionado] = useState(null);

    const [mostrarFormulario, setMostrarFormulario] = useState(false);

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

    function abrirFormulario(protocolo) {
            setProtocoloSelecionado(protocolo);
            setMostrarFormulario(true);
            setTutorSelecionado(null);
            setPetSelecionado(null);
            setPetsDoTutor([]);
            setMensagem("");
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

    async function enviarProtocolo() {
            if (!protocoloSelecionado || !tutorSelecionado || !petSelecionado) {
                setMensagem("Selecione tutor e pet.");
                return;
            }
    
            const storage = await AsyncStorage.getItem("PROTOCOLOS_ENVIADOS");
            let enviados = storage ? JSON.parse(storage) : [];
    
            const novoProtocolo = {
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
    
            enviados.push(novoProtocolo);
    
            await AsyncStorage.setItem("PROTOCOLOS_ENVIADOS", JSON.stringify(enviados));
    
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
