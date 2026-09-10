import { useState, useEffect } from "react";
import { getUsuarioLogado } from "../services/authStorage";
import { getPetsByTutor } from "../services/petService";
import { getClinicalRecords, addClinicalRecord } from "../services/clinicalRecordService";
import { KEYS } from "../services/storage";
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
        const user = await getUsuarioLogado();

        if (user !== null) {
            setUsuario(user);
            setPets(await getPetsByTutor(user.id));

            const listaHistoricos = await getClinicalRecords(KEYS.HISTORICOS_ENVIADOS);
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

        if (!usuario) {
            setMensagem("Usuário não encontrado.");
            return;
        }

        const novaSolicitacao: RegistroClinico = {
            id: `${Date.now()}`,
            tutorId: usuario.id,
            tutorNome: usuario.nome,
            petId: petSelecionado.id,
            petNome: petSelecionado.nome,
            status: "Solicitado",
            dataSolicitacao: new Date().toLocaleDateString("pt-BR"),
        };

        await addClinicalRecord(KEYS.SOLICITACOES_HISTORICO, novaSolicitacao);
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
