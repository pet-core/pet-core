import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Usuario, Pet, RegistroClinico } from "../types/models";

export function useHistorico() {
    const [usuario, setUsuario] = useState<Usuario | null>(null);

    const [pets, setPets] = useState<Pet[]>([]);

    const [petSelecionado, setPetSelecionado] = useState<Pet | null>(null);

    const [historicos, setHistoricos] = useState<RegistroClinico[]>([]);

    const [mensagem, setMensagem] = useState("");

    const [cardAberto, setCardAberto] = useState<string | null>(null);

    const [modalPet, setModalPet] = useState(false);

    useEffect(() => {
            buscarDados();
        }, []);

    async function buscarDados() {
            const usuarioStorage = await AsyncStorage.getItem("USUARIO_LOGADO");
            const petsStorage = await AsyncStorage.getItem("PETS");
            const historicosStorage = await AsyncStorage.getItem("HISTORICOS_ENVIADOS");
    
            if (usuarioStorage !== null) {
                const user: Usuario = JSON.parse(usuarioStorage);
                setUsuario(user);
    
                const todosPets: Pet[] = petsStorage ? JSON.parse(petsStorage) : [];
                setPets(todosPets.filter((pet) => pet.tutorId === user.id));
    
                const listaHistoricos: RegistroClinico[] = historicosStorage ? JSON.parse(historicosStorage) : [];
                setHistoricos(listaHistoricos.filter((item) => item.tutorId === user.id));
            }
        }

    function selecionarPet(item: Pet) {
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
            let solicitacoes: RegistroClinico[] = storage ? JSON.parse(storage) : [];
    
            const novaSolicitacao: RegistroClinico = {
                id: `${Date.now()}`,
                tutorId: usuario!.id,
                tutorNome: usuario!.nome,
                petId: petSelecionado.id,
                petNome: petSelecionado.nome,
                status: "Solicitado",
                dataSolicitacao: new Date().toLocaleDateString("pt-BR"),
            };
    
            solicitacoes.push(novaSolicitacao);
            await AsyncStorage.setItem("SOLICITACOES_HISTORICO", JSON.stringify(solicitacoes));
            setMensagem("Solicitação de histórico enviada com sucesso.");
        }

    function abrirCard(id: string) {
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
