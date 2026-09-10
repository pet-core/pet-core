import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Usuario, Pet, RegistroClinico } from "../types/models";

export function useRelatorios() {
    const [usuario, setUsuario] = useState<Usuario | null>(null);

    const [tutores, setTutores] = useState<Usuario[]>([]);

    const [tutorSelecionado, setTutorSelecionado] = useState<Usuario | null>(null);

    const [petsDoTutor, setPetsDoTutor] = useState<Pet[]>([]);

    const [petSelecionado, setPetSelecionado] = useState<Pet | null>(null);

    const [prontuariosPet, setProntuariosPet] = useState<RegistroClinico[]>([]);

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

    async function buscarProntuariosDoPet(petId: string) {
            const storage = await AsyncStorage.getItem("PRONTUARIOS");
            const todos: RegistroClinico[] = storage ? JSON.parse(storage) : [];
            const filtrados = todos.filter((item) => item.petId === petId);
            setProntuariosPet(filtrados);
        }

    function selecionarTutor(item: Usuario) {
            setTutorSelecionado(item);
            setPetSelecionado(null);
            setProntuariosPet([]);
            setMensagem("");
            setModalTutor(false);
            buscarPetsDoTutor(item.id);
        }

    function selecionarPet(item: Pet) {
            setPetSelecionado(item);
            setMensagem("");
            setModalPet(false);
            buscarProntuariosDoPet(item.id);
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
    
            const storage = await AsyncStorage.getItem("HISTORICOS_ENVIADOS");
            let historicos = storage ? JSON.parse(storage) : [];
    
            const novoHistorico = {
                id: `${Date.now()}`,
                tutorId: tutorSelecionado.id,
                tutorNome: tutorSelecionado.nome,
                petId: petSelecionado.id,
                petNome: petSelecionado.nome,
                veterinarioId: usuario!.id,
                veterinarioNome: usuario!.nome,
                dataEmissao: new Date().toLocaleDateString("pt-BR"),
                arquivoHistorico: `historico_clinico_${petSelecionado.nome.toLowerCase().replaceAll(" ", "_")}.pdf`,
                prontuarios: prontuariosPet,
            };
            historicos.push(novoHistorico);
            await AsyncStorage.setItem("HISTORICOS_ENVIADOS", JSON.stringify(historicos));
            setMensagem("Histórico enviado para o tutor.");
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
        prontuariosPet,
        setProntuariosPet,
        mensagem,
        setMensagem,
        modalTutor,
        setModalTutor,
        modalPet,
        setModalPet,
        buscarDados,
        buscarPetsDoTutor,
        buscarProntuariosDoPet,
        selecionarTutor,
        selecionarPet,
        enviarRelatorio,
    };
}
