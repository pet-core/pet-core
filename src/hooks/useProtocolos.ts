import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
            const usuarioStorage = await AsyncStorage.getItem("USUARIO_LOGADO");
            const usuariosStorage = await AsyncStorage.getItem("USUARIOS");
    
            if (usuarioStorage !== null) setUsuario(JSON.parse(usuarioStorage));
    
            if (usuariosStorage !== null) {
                const usuarios: Usuario[] = JSON.parse(usuariosStorage);
                setTutores(usuarios.filter((item) => item.tipoPerfil === "tutor"));
            }
        }

    async function buscarPetsDoTutor(tutorId: string) {
            const petsStorage = await AsyncStorage.getItem("PETS");
            const todosPets: Pet[] = petsStorage ? JSON.parse(petsStorage) : [];
            setPetsDoTutor(todosPets.filter((pet) => pet.tutorId === tutorId));
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
    
            const storage = await AsyncStorage.getItem("PROTOCOLOS_ENVIADOS");
            let enviados: RegistroClinico[] = storage ? JSON.parse(storage) : [];
    
            const novoProtocolo: RegistroClinico = {
                id: `${Date.now()}`,
                tutorId: tutorSelecionado.id,
                tutorNome: tutorSelecionado.nome,
                petId: petSelecionado.id,
                petNome: petSelecionado.nome,
                veterinarioId: usuario!.id,
                veterinarioNome: usuario!.nome,
                titulo: protocoloSelecionado!.titulo,
                texto: protocoloSelecionado!.texto,
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
