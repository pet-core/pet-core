import { useState } from "react";
import type { Pet } from "../types/models";
import type { Usuario } from "../types/models";

type UsuarioSemSenha = Omit<Usuario, "senha">;
import { useAuth } from "../context/AuthContext";
import { useTutores } from "./api/useUsers";
import { usePets } from "./api/usePets";
import { useCriarReceita } from "./api/useReceitas";

export function useVetReceitas() {
    const { usuario } = useAuth();
    const { data: tutores = [], isLoading: carregandoTutores } = useTutores();
    const [tutorSelecionado, setTutorSelecionado] = useState<UsuarioSemSenha | null>(null);
    const [petSelecionado, setPetSelecionado] = useState<Pet | null>(null);
    const [arquivoReceita, setArquivoReceita] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [modalTutor, setModalTutor] = useState(false);
    const [modalPet, setModalPet] = useState(false);

    const { data: petsDoTutor = [], isLoading: carregandoPets } = usePets(tutorSelecionado?.id);
    const criar = useCriarReceita();

    function selecionarTutor(item: UsuarioSemSenha) {
        setTutorSelecionado(item);
        setPetSelecionado(null);
        setArquivoReceita("");
        setMensagem("");
        setModalTutor(false);
    }

    function selecionarPet(item: Pet) {
        setPetSelecionado(item);
        setArquivoReceita("");
        setMensagem("");
        setModalPet(false);
    }

    function selecionarArquivo() {
        setMensagem("O backend ainda não disponibiliza upload de arquivos. Informe a referência do documento enviada pelo serviço de arquivos.");
    }

    function enviarReceita() {
        if (!tutorSelecionado || !petSelecionado || !arquivoReceita.trim()) {
            setMensagem("Preencha o tutor, o pet e a referência do documento.");
            return;
        }
        if (!usuario) {
            setMensagem("Usuário autenticado não encontrado.");
            return;
        }

        criar.mutate({
            tutorId: tutorSelecionado.id,
            tutorNome: tutorSelecionado.nome,
            petId: petSelecionado.id,
            petNome: petSelecionado.nome,
            veterinarioId: usuario.id,
            veterinarioNome: usuario.nome,
            arquivoReceita: arquivoReceita.trim(),
            dataEnvio: new Date().toISOString(),
            tipoRegistro: "receita",
        }, {
            onSuccess: () => {
                setMensagem("Receita enviada para o tutor.");
                setTutorSelecionado(null);
                setPetSelecionado(null);
                setArquivoReceita("");
            },
            onError: (err) => setMensagem(err.message || "Não foi possível enviar a receita."),
        });
    }

    return {
        usuario,
        tutores,
        tutorSelecionado,
        setTutorSelecionado,
        petsDoTutor,
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
        selecionarTutor,
        selecionarPet,
        selecionarArquivo,
        enviarReceita,
        carregandoTutores,
        carregandoPets,
        enviando: criar.isPending,
    };
}
