import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTutores } from "./api/useUsers";
import { usePets } from "./api/usePets";
import { useCriarClinicalRecord } from "./api/useClinicalRecords";
import { useExames } from "./api/useCatalogos";
import type { Pet, Usuario } from "../types/models";
type UsuarioSemSenha = Omit<Usuario, "senha">;

export function useVetExames() {
    const { usuario } = useAuth();
    const tutoresQuery = useTutores();
    const examesQuery = useExames();
    const criarRegistro = useCriarClinicalRecord();
    const [tutorSelecionado, setTutorSelecionado] = useState<UsuarioSemSenha | null>(null);
    const [petSelecionado, setPetSelecionado] = useState<Pet | null>(null);
    const [exameSelecionado, setExameSelecionado] = useState("");
    const [arquivoSolicitacao, setArquivoSolicitacao] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [modalTutor, setModalTutor] = useState(false);
    const [modalPet, setModalPet] = useState(false);
    const [modalExame, setModalExame] = useState(false);

    const petsQuery = usePets(tutorSelecionado?.id, Boolean(tutorSelecionado?.id));
    const petsDoTutor = petsQuery.data ?? [];
    const tutores = tutoresQuery.data ?? [];
    const examesDisponiveis = examesQuery.data ?? [];

    function selecionarTutor(item: UsuarioSemSenha) {
        setTutorSelecionado(item);
        setPetSelecionado(null);
        setArquivoSolicitacao("");
        setMensagem("");
        setModalTutor(false);
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
        try {
            await criarRegistro.mutateAsync({
                tutorId: tutorSelecionado.id, tutorNome: tutorSelecionado.nome,
                petId: petSelecionado.id, petNome: petSelecionado.nome,
                veterinarioId: usuario.id, veterinarioNome: usuario.nome,
                tipoExame: exameSelecionado, arquivoSolicitacao,
                dataEnvio: new Date().toISOString(),
            });
            setMensagem("Solicitação de exame enviada para o tutor.");
            setTutorSelecionado(null); setPetSelecionado(null); setExameSelecionado(""); setArquivoSolicitacao("");
        } catch (error) {
            setMensagem(error instanceof Error ? error.message : "Não foi possível enviar a solicitação.");
        }
    }

    return { usuario, tutores, tutorSelecionado, setTutorSelecionado, petsDoTutor, petSelecionado, setPetSelecionado, exameSelecionado, setExameSelecionado, examesDisponiveis, arquivoSolicitacao, setArquivoSolicitacao, mensagem, setMensagem, modalTutor, setModalTutor, modalPet, setModalPet, modalExame, setModalExame, selecionarTutor, selecionarPet, selecionarExame, selecionarArquivo, enviarExame, isLoading: tutoresQuery.isLoading || examesQuery.isLoading, isSaving: criarRegistro.isPending, isError: tutoresQuery.isError || examesQuery.isError, error: tutoresQuery.error ?? examesQuery.error, buscarDados: () => { void tutoresQuery.refetch(); void examesQuery.refetch(); }, buscarPetsDoTutor: () => petsQuery.refetch() };
}
