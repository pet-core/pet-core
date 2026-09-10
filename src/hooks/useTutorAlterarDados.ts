import { useState, useEffect } from "react";
import { getUsuarioLogado, atualizarUsuario } from "../services/authStorage";
import type { Usuario } from "../types/models";

export function useTutorAlterarDados() {
    const [usuario, setUsuario] = useState<Usuario | null>(null);

    const [nome, setNome] = useState("");

    const [nascimento, setNascimento] = useState("");

    const [telefone, setTelefone] = useState("");

    const [genero, setGenero] = useState("");

    const [email, setEmail] = useState("");

    const [senha, setSenha] = useState("");

    const [confirmarSenha, setConfirmarSenha] = useState("");

    const [mensagem, setMensagem] = useState("");

    useEffect(() => {
            buscarUsuario();
        }, []);

    async function buscarUsuario() {
        const user = await getUsuarioLogado();

        if (user !== null) {
            setUsuario(user);
            setNome(user.nome || "");
            setNascimento(user.nascimento || "");
            setTelefone(user.telefone || "");
            setGenero(user.genero || "");
            setEmail(user.email || "");
            setSenha(user.senha || "");
            setConfirmarSenha(user.senha || "");
        }
    }

    function formatarData(texto: string) {
            let numeros = texto.replace(/\D/g, "");
            if (numeros.length > 8) numeros = numeros.slice(0, 8);
            if (numeros.length > 4) return `${numeros.slice(0, 2)}/${numeros.slice(2, 4)}/${numeros.slice(4)}`;
            if (numeros.length > 2) return `${numeros.slice(0, 2)}/${numeros.slice(2)}`;
            return numeros;
        }

    function formatarTelefone(texto: string) {
            let numeros = texto.replace(/\D/g, "");
            if (numeros.length > 11) numeros = numeros.slice(0, 11);
            if (numeros.length > 10) return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`;
            if (numeros.length > 6) return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 6)}-${numeros.slice(6)}`;
            if (numeros.length > 2) return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
            return numeros;
        }

    async function salvar() {
        if (!nome || nome.trim() === "") {
            setMensagem("Informe o nome.");
            return;
        }

        if (!email || email.trim() === "") {
            setMensagem("Informe o e-mail.");
            return;
        }

        if (!senha || senha.trim() === "") {
            setMensagem("Informe a senha.");
            return;
        }

        if (senha !== confirmarSenha) {
            setMensagem("As senhas não conferem.");
            return;
        }

        if (!usuario) {
            setMensagem("Usuário não encontrado.");
            return;
        }

        const usuarioAtualizado: Usuario = {
            ...usuario,
            nome,
            nascimento,
            telefone,
            genero,
            email,
            senha,
        };

        await atualizarUsuario(usuarioAtualizado);
        setUsuario(usuarioAtualizado);
        setMensagem("Dados atualizados com sucesso.");
    }

    return {
        usuario,
        setUsuario,
        nome,
        setNome,
        nascimento,
        setNascimento,
        telefone,
        setTelefone,
        genero,
        setGenero,
        email,
        setEmail,
        senha,
        setSenha,
        confirmarSenha,
        setConfirmarSenha,
        mensagem,
        setMensagem,
        buscarUsuario,
        formatarData,
        formatarTelefone,
        salvar,
    };
}
