import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Usuario, Clinica } from "../types/models";

export function useCadastro() {
    const [nome, setNome] = useState("");

    const [nascimento, setNascimento] = useState("");

    const [telefone, setTelefone] = useState("");

    const [genero, setGenero] = useState("");

    const [email, setEmail] = useState("");

    const [senha, setSenha] = useState("");

    const [isVeterinario, setIsVeterinario] = useState(false);

    const [especializacao, setEspecializacao] = useState("");

    const [clinica, setClinica] = useState("");

    const [cnpj, setCnpj] = useState("");

    const [nomeClinica, setNomeClinica] = useState("");

    const [cep, setCep] = useState("");

    const [complemento, setComplemento] = useState("");

    const [mensagem, setMensagem] = useState("");

    const [tipoMensagem, setTipoMensagem] = useState("");

    const [modalEspecializacao, setModalEspecializacao] = useState(false);

    const [modalClinica, setModalClinica] = useState(false);

    function mostrarMensagem(tipo: string, texto: string) {
            setTipoMensagem(tipo);
            setMensagem(texto);
        }

    function selecionarClinica(item: Clinica) {
            setClinica(item.nome);
            setNomeClinica(item.nome);
            setCnpj(item.cnpj);
            setCep(item.cep);
            setComplemento(item.complemento);
            setModalClinica(false);
        }

    function limparClinicaSelecionada() {
            setClinica("");
        }

    function formatarData(texto: string) {
            let numeros = texto.replace(/\D/g, "");
            if (numeros.length > 8) {
                numeros = numeros.slice(0, 8);
            }
            if (numeros.length > 4) {
                return `${numeros.slice(0, 2)}/${numeros.slice(2, 4)}/${numeros.slice(4)}`;
            }
            if (numeros.length > 2) {
                return `${numeros.slice(0, 2)}/${numeros.slice(2)}`;
            }
            return numeros;
        }

    function formatarTelefone(texto: string) {
            let numeros = texto.replace(/\D/g, "");
            if (numeros.length > 11) {
                numeros = numeros.slice(0, 11);
            }
            if (numeros.length > 10) {
                return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`;
            }
            if (numeros.length > 6) {
                return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 6)}-${numeros.slice(6)}`;
            }
            if (numeros.length > 2) {
                return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
            }
            return numeros;
        }

    async function cadastrar() {
            if (!nome || nome.trim() === "") {
                mostrarMensagem("erro", "Informe o nome");
                return;
            }
    
            if (!email || email.trim() === "") {
                mostrarMensagem("erro", "Informe o e-mail");
                return;
            }
    
            if (!senha || senha.trim() === "") {
                mostrarMensagem("erro", "Informe a senha");
                return;
            }
    
            let usuarios: Usuario[] = [];
            const dados = await AsyncStorage.getItem("USUARIOS");
            if (dados !== null) {
                usuarios = JSON.parse(dados);
            }
    
            const existeEmail = usuarios.find((item) => item.email === email);
            if (existeEmail) {
                mostrarMensagem("erro", "Este e-mail já está cadastrado");
                return;
            }
    
            const novoUsuario: Usuario = {
                id: isVeterinario ? `VET${Date.now()}` : `${Date.now()}`,
                nome: nome.trim(),
                nascimento,
                telefone,
                genero,
                email,
                senha,
                tipoPerfil: isVeterinario ? "veterinario" : "tutor",
                especializacao,
                clinica: clinica || nomeClinica,
                cnpj,
                nomeClinica: nomeClinica || clinica,
                cep,
                complemento,
            };
    
            usuarios.push(novoUsuario);
            await AsyncStorage.setItem("USUARIOS", JSON.stringify(usuarios));
            mostrarMensagem("sucesso", "Cadastro realizado com sucesso!");
        }

    return {
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
        isVeterinario,
        setIsVeterinario,
        especializacao,
        setEspecializacao,
        clinica,
        setClinica,
        cnpj,
        setCnpj,
        nomeClinica,
        setNomeClinica,
        cep,
        setCep,
        complemento,
        setComplemento,
        mensagem,
        setMensagem,
        tipoMensagem,
        setTipoMensagem,
        modalEspecializacao,
        setModalEspecializacao,
        modalClinica,
        setModalClinica,
        mostrarMensagem,
        selecionarClinica,
        limparClinicaSelecionada,
        formatarData,
        formatarTelefone,
        cadastrar,
    };
}
