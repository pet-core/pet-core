import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
    
            const storage = await AsyncStorage.getItem("RECEITAS_ENVIADAS");
            let receitas: RegistroClinico[] = storage ? JSON.parse(storage) : [];
    
            const novaReceita: RegistroClinico = {
                id: `${Date.now()}`,
                tutorId: tutorSelecionado.id,
                tutorNome: tutorSelecionado.nome,
                petId: petSelecionado.id,
                petNome: petSelecionado.nome,
                veterinarioId: usuario!.id,
                veterinarioNome: usuario!.nome,
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
