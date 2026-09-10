import { useState, useEffect } from "react";
import { getUsuarioLogado } from "../services/authStorage";
import { getTutores } from "../services/userService";
import { getPetsByTutor } from "../services/petService";
import { addClinicalRecord } from "../services/clinicalRecordService";
import { KEYS } from "../services/storage";
import type { Usuario, Pet, RegistroClinico } from "../types/models";

export function useVetReceitas() {
    const [usuario, setUsuario] = useState<Usuario | null>(null);

    const [tutores, setTutores] = useState<Usuario[]>([]);

    const [tutorSelecionado, setTutorSelecionado] = useState<Usuario | null>(null);

    const [petsDoTutor, setPetsDoTutor] = useState<Pet[]>([]);

    const [petSelecionado, setPetSelecionado] = useState<Pet | null>(null);

    const [arquivoReceita, setArquivoReceita] = useState("");

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

    function selecionarTutor(item: Usuario) {
            setTutorSelecionado(item);
            setPetSelecionado(null);
            setArquivoReceita("");
            setMensagem("");
            setModalTutor(false);
            buscarPetsDoTutor(item.id);
        }

    function selecionarPet(item: Pet) {
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

        if (!usuario) {
            setMensagem("Usuário não encontrado.");
            return;
        }

        const novaReceita: RegistroClinico = {
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

        await addClinicalRecord(KEYS.RECEITAS_ENVIADAS, novaReceita);

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
