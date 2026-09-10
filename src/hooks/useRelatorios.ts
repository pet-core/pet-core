import { useState, useEffect } from "react";
import { getUsuarioLogado } from "../services/authStorage";
import { getTutores } from "../services/userService";
import { getPetsByTutor } from "../services/petService";
import { getClinicalRecords, addClinicalRecord } from "../services/clinicalRecordService";
import { KEYS } from "../services/storage";
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

    async function buscarProntuariosDoPet(petId: string) {
        const prontuarios = await getClinicalRecords(KEYS.PRONTUARIOS);
        setProntuariosPet(prontuarios.filter((item) => item.petId === petId));
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

        if (!usuario) {
            setMensagem("Usuário não encontrado.");
            return;
        }

        const novoHistorico: RegistroClinico = {
            id: `${Date.now()}`,
            tutorId: tutorSelecionado.id,
            tutorNome: tutorSelecionado.nome,
            petId: petSelecionado.id,
            petNome: petSelecionado.nome,
            veterinarioId: usuario.id,
            veterinarioNome: usuario.nome,
            dataEmissao: new Date().toLocaleDateString("pt-BR"),
            arquivoHistorico: `historico_clinico_${petSelecionado.nome.toLowerCase().replaceAll(" ", "_")}.pdf`,
            prontuarios: JSON.stringify(prontuariosPet),
        };

        await addClinicalRecord(KEYS.HISTORICOS_ENVIADOS, novoHistorico);
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
