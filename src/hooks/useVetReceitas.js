import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export function useVetReceitas() {
    const navigation = useNavigation();

    const [usuario, setUsuario] = useState(null);

    const [tutores, setTutores] = useState([]);

    const [tutorSelecionado, setTutorSelecionado] = useState(null);

    const [petsDoTutor, setPetsDoTutor] = useState([]);

    const [petSelecionado, setPetSelecionado] = useState(null);

    const [arquivoReceita, setArquivoReceita] = useState("");

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
            setArquivoReceita("");
            setMensagem("");
            setModalTutor(false);
            buscarPetsDoTutor(item.id);
        }

    function selecionarPet(item) {
            setPetSelecionado(item);
            setArquivoReceita("");
            setMensagem("");
            setModalPet(false);
        }

    function selecionarArquivo() {
            if (!petSelecionado) {
                setMensagem("Selecione o tutor e o pet primeiro.");
                return;
            }
    
            const petArquivo = petSelecionado.nome.toLowerCase().replaceAll(" ", "_");
            setArquivoReceita(`receita_${petArquivo}_${Date.now()}.pdf`);
            setMensagem("");
        }

    async function enviarReceita() {
            if (!tutorSelecionado || !petSelecionado || !arquivoReceita) {
                setMensagem("Preencha todos os campos.");
                return;
            }
    
            const storage = await AsyncStorage.getItem("RECEITAS_ENVIADAS");
            let receitas = storage ? JSON.parse(storage) : [];
    
            const novaReceita = {
                id: `${Date.now()}`,
                tutorId: tutorSelecionado.id,
                tutorNome: tutorSelecionado.nome,
                petId: petSelecionado.id,
                petNome: petSelecionado.nome,
                veterinarioId: usuario.id,
                veterinarioNome: usuario.nome,
                arquivoReceita,
                dataEnvio: new Date().toLocaleDateString("pt-BR"),
            };
    
            receitas.push(novaReceita);
    
            await AsyncStorage.setItem("RECEITAS_ENVIADAS", JSON.stringify(receitas));
    
            setMensagem("Receita enviada para o tutor.");
            setTutorSelecionado(null);
            setPetsDoTutor([]);
            setPetSelecionado(null);
            setArquivoReceita("");
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
        arquivoReceita,
        setArquivoReceita,
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
        selecionarArquivo,
        enviarReceita,
    };
}
