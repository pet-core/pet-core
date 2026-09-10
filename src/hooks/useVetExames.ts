import { useState, useEffect } from "react";
import { getUsuarioLogado } from "../services/authStorage";
import { getTutores } from "../services/userService";
import { getPetsByTutor } from "../services/petService";
import { addClinicalRecord } from "../services/clinicalRecordService";
import { KEYS } from "../services/storage";
import type { Usuario, Pet, RegistroClinico } from "../types/models";

export function useVetExames() {
    const [usuario, setUsuario] = useState<Usuario | null>(null);

    const [tutores, setTutores] = useState<Usuario[]>([]);

    const [tutorSelecionado, setTutorSelecionado] = useState<Usuario | null>(null);

    const [petsDoTutor, setPetsDoTutor] = useState<Pet[]>([]);

    const [petSelecionado, setPetSelecionado] = useState<Pet | null>(null);

    const [exameSelecionado, setExameSelecionado] = useState("");

    const [arquivoSolicitacao, setArquivoSolicitacao] = useState("");

    const [mensagem, setMensagem] = useState("");

    const [modalTutor, setModalTutor] = useState(false);

    const [modalPet, setModalPet] = useState(false);

    const [modalExame, setModalExame] = useState(false);

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
            setArquivoSolicitacao("");
            setMensagem("");
            setModalTutor(false);
            buscarPetsDoTutor(item.id);
        }

    function selecionarPet(item: Pet) {
            setPetSelecionado(item);
            setArquivoSolicitacao("");
            setMensagem("");
            setModalPet(false);
        }

    function selecionarExame(item: string) {
            setExameSelecionado(item);
            setArquivoSolicitacao("");
            setMensagem("");
            setModalExame(false);
        }

    function selecionarArquivo() {
            if (!petSelecionado || !exameSelecionado) {
                setMensagem("Selecione o tutor, o pet e o exame antes do arquivo.");
                return;
            }
    
            const exameArquivo = exameSelecionado.toLowerCase().replaceAll(" ", "_");
            const petArquivo = petSelecionado.nome.toLowerCase().replaceAll(" ", "_");
    
            setArquivoSolicitacao(`solicitacao_${exameArquivo}_${petArquivo}.pdf`);
            setMensagem("");
        }

    async function enviarExame() {
        if (!tutorSelecionado || !petSelecionado || !exameSelecionado || !arquivoSolicitacao) {
            setMensagem("Preencha todos os campos.");
            return;
        }

        if (!usuario) {
            setMensagem("Usuário não encontrado.");
            return;
        }

        const novoExame: RegistroClinico = {
            id: `${Date.now()}`,
            tutorId: tutorSelecionado.id,
            tutorNome: tutorSelecionado.nome,
            petId: petSelecionado.id,
            petNome: petSelecionado.nome,
            veterinarioId: usuario.id,
            veterinarioNome: usuario.nome,
            tipoExame: exameSelecionado,
            arquivoSolicitacao,
            dataEnvio: new Date().toLocaleDateString("pt-BR"),
        };

        await addClinicalRecord(KEYS.EXAMES_ENVIADOS, novoExame);

        setMensagem("Solicitação de exame enviada para o tutor.");
        setTutorSelecionado(null);
        setPetsDoTutor([]);
        setPetSelecionado(null);
        setExameSelecionado("");
        setArquivoSolicitacao("");
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
        exameSelecionado,
        setExameSelecionado,
        arquivoSolicitacao,
        setArquivoSolicitacao,
        mensagem,
        setMensagem,
        modalTutor,
        setModalTutor,
        modalPet,
        setModalPet,
        modalExame,
        setModalExame,
        buscarDados,
        buscarPetsDoTutor,
        selecionarTutor,
        selecionarPet,
        selecionarExame,
        selecionarArquivo,
        enviarExame,
    };
}
