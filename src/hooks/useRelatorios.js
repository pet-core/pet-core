import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export function useRelatorios() {
    const navigation = useNavigation();

    const [usuario, setUsuario] = useState(null);

    const [tutores, setTutores] = useState([]);

    const [tutorSelecionado, setTutorSelecionado] = useState(null);

    const [petsDoTutor, setPetsDoTutor] = useState([]);

    const [petSelecionado, setPetSelecionado] = useState(null);

    const [prontuariosPet, setProntuariosPet] = useState([]);

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

    async function buscarProntuariosDoPet(petId) {
            const storage = await AsyncStorage.getItem("PRONTUARIOS");
            const todos = storage ? JSON.parse(storage) : [];
            const filtrados = todos.filter((item) => item.petId === petId);
            setProntuariosPet(filtrados);
        }

    function selecionarTutor(item) {
            setTutorSelecionado(item);
            setPetSelecionado(null);
            setProntuariosPet([]);
            setMensagem("");
            setModalTutor(false);
            buscarPetsDoTutor(item.id);
        }

    function selecionarPet(item) {
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
                veterinarioId: usuario.id,
                veterinarioNome: usuario.nome,
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
