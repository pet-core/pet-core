import { useState, useEffect } from "react";
import type { Usuario, Pet } from "../types/models";
import { getUsuarioLogado } from "../services/authStorage";
import { createPet } from "../services/petService";

export function useAdicionarPet() {
    const [usuario, setUsuario] = useState<Usuario | null>(null);

    const [nome, setNome] = useState("");

    const [nascimento, setNascimento] = useState("");

    const [raca, setRaca] = useState("");

    const [especie, setEspecie] = useState("");

    const [porte, setPorte] = useState("");

    const [pelagem, setPelagem] = useState("");

    const [sexo, setSexo] = useState("");

    const [mensagem, setMensagem] = useState("");

    const [tipoMensagem, setTipoMensagem] = useState("");

    useEffect(() => {
            buscarUsuario();
        }, []);

    async function buscarUsuario() {
            const usuario = await getUsuarioLogado();
            if (usuario !== null) setUsuario(usuario);
        }

    function mostrarMensagem(tipo: string, texto: string) {
            setTipoMensagem(tipo);
            setMensagem(texto);
        }

    function formatarData(texto: string) {
            let numeros = texto.replace(/\D/g, "");
            if (numeros.length > 8) numeros = numeros.slice(0, 8);
            if (numeros.length > 4) return `${numeros.slice(0, 2)}/${numeros.slice(2, 4)}/${numeros.slice(4)}`;
            if (numeros.length > 2) return `${numeros.slice(0, 2)}/${numeros.slice(2)}`;
            return numeros;
        }

    async function salvarPet() {
        if (!nome || nome.trim() === "") {
            mostrarMensagem("erro", "Informe o nome do pet.");
            return;
        }

        if (!usuario) {
            mostrarMensagem("erro", "Usuário não encontrado.");
            return;
        }

        const novoPet: Pet = {
            id: `PET${Date.now()}`,
            tutorId: usuario.id,
            nome,
            nascimento,
            raca,
            especie,
            porte,
            pelagem,
            sexo,
            obitoInformado: false,
            comedouroStatus: "vazio",
        };

        await createPet(novoPet);
        mostrarMensagem("sucesso", "Pet cadastrado com sucesso.");
    }

    return {
        usuario,
        setUsuario,
        nome,
        setNome,
        nascimento,
        setNascimento,
        raca,
        setRaca,
        especie,
        setEspecie,
        porte,
        setPorte,
        pelagem,
        setPelagem,
        sexo,
        setSexo,
        mensagem,
        setMensagem,
        tipoMensagem,
        setTipoMensagem,
        buscarUsuario,
        mostrarMensagem,
        formatarData,
        salvarPet,
    };
}
