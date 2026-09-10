import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export function useHistorico() {
    const navigation = useNavigation();

    const [usuario, setUsuario] = useState(null);

    const [pets, setPets] = useState([]);

    const [petSelecionado, setPetSelecionado] = useState(null);

    const [historicos, setHistoricos] = useState([]);

    const [mensagem, setMensagem] = useState("");

    const [cardAberto, setCardAberto] = useState(null);

    const [modalPet, setModalPet] = useState(false);

    useEffect(() => {
            buscarDados();
        }, []);

    async function buscarDados() {
            const usuarioStorage = await AsyncStorage.getItem("USUARIO_LOGADO");
            const petsStorage = await AsyncStorage.getItem("PETS");
            const historicosStorage = await AsyncStorage.getItem("HISTORICOS_ENVIADOS");
    
            if (usuarioStorage !== null) {
                const user = JSON.parse(usuarioStorage);
                setUsuario(user);
    
                const todosPets = petsStorage ? JSON.parse(petsStorage) : [];
                setPets(todosPets.filter((pet) => pet.tutorId === user.id));
    
                const listaHistoricos = historicosStorage ? JSON.parse(historicosStorage) : [];
                setHistoricos(listaHistoricos.filter((item) => item.tutorId === user.id));
            }
        }

    function selecionarPet(item) {
            setPetSelecionado(item);
            setMensagem("");
            setModalPet(false);
        }

    async function solicitarHistorico() {
            if (!petSelecionado) {
                setMensagem("Selecione um pet para solicitar o histórico.");
                return;
            }
    
            const storage = await AsyncStorage.getItem("SOLICITACOES_HISTORICO");
            let solicitacoes = storage ? JSON.parse(storage) : [];
    
            const novaSolicitacao = {
                id: `${Date.now()}`,
                tutorId: usuario.id,
                tutorNome: usuario.nome,
                petId: petSelecionado.id,
                petNome: petSelecionado.nome,
                status: "Solicitado",
                dataSolicitacao: new Date().toLocaleDateString("pt-BR"),
            };
    
            solicitacoes.push(novaSolicitacao);
            await AsyncStorage.setItem("SOLICITACOES_HISTORICO", JSON.stringify(solicitacoes));
            setMensagem("Solicitação de histórico enviada com sucesso.");
        }

    function abrirCard(id) {
            setCardAberto(cardAberto === id ? null : id);
        }

    return {
        usuario,
        setUsuario,
        pets,
        setPets,
        petSelecionado,
        setPetSelecionado,
        historicos,
        setHistoricos,
        mensagem,
        setMensagem,
        cardAberto,
        setCardAberto,
        modalPet,
        setModalPet,
        buscarDados,
        selecionarPet,
        solicitarHistorico,
        abrirCard,
    };
}
