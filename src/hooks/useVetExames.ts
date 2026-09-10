import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
            const usuarioStorage = await AsyncStorage.getItem("USUARIO_LOGADO");
            const usuariosStorage = await AsyncStorage.getItem("USUARIOS");
    
            if (usuarioStorage !== null) setUsuario(JSON.parse(usuarioStorage));
    
            if (usuariosStorage !== null) {
                const usuarios: Usuario[] = JSON.parse(usuariosStorage);
                setTutores(usuarios.filter((item) => item.tipoPerfil === "tutor"));
            }
        }

    async function buscarPetsDoTutor(tutorId: string) {
            const petsStorage = await AsyncStorage.getItem("PETS");
            const todosPets: Pet[] = petsStorage ? JSON.parse(petsStorage) : [];
            setPetsDoTutor(todosPets.filter((pet) => pet.tutorId === tutorId));
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
    
            const storage = await AsyncStorage.getItem("EXAMES_ENVIADOS");
            let exames: RegistroClinico[] = storage ? JSON.parse(storage) : [];
    
            const novoExame: RegistroClinico = {
                id: `${Date.now()}`,
                tutorId: tutorSelecionado.id,
                tutorNome: tutorSelecionado.nome,
                petId: petSelecionado.id,
                petNome: petSelecionado.nome,
                veterinarioId: usuario!.id,
                veterinarioNome: usuario!.nome,
                tipoExame: exameSelecionado,
                arquivoSolicitacao,
                dataEnvio: new Date().toLocaleDateString("pt-BR"),
            };
    
            exames.push(novoExame);
    
            await AsyncStorage.setItem("EXAMES_ENVIADOS", JSON.stringify(exames));
    
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
