import { useState } from "react";
import type { Clinica } from "../types/models";
import { cadastrar as cadastrarApi } from "../services/api/authApiService";
import { useClinicas, useEspecializacoes } from "./api";

export function useCadastro() {
    const especializacoesQuery = useEspecializacoes();
    const clinicasQuery = useClinicas();
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

    const [carregando, setCarregando] = useState(false);

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

        try {
            setCarregando(true);
            setMensagem("");

            const request = {
                nome: nome.trim(),
                email: email.trim(),
                senha,
                tipoPerfil: isVeterinario ? "veterinario" as const : "tutor" as const,
                nascimento,
                telefone,
                genero,
                especializacao: isVeterinario ? especializacao : undefined,
                clinica: isVeterinario ? (clinica || nomeClinica) : undefined,
                cnpj: isVeterinario ? cnpj : undefined,
                nomeClinica: isVeterinario ? (nomeClinica || clinica) : undefined,
                cep: isVeterinario ? cep : undefined,
                complemento: isVeterinario ? complemento : undefined,
            };

            await cadastrarApi(request);
            mostrarMensagem("sucesso", "Cadastro realizado com sucesso!");
        } catch {
            mostrarMensagem("erro", "Não foi possível realizar o cadastro. Verifique os dados e tente novamente.");
        } finally {
            setCarregando(false);
        }
    }

    const especializacoes = especializacoesQuery.data ?? [];
    const clinicas = clinicasQuery.data ?? [];

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
        especializacoes,
        clinicas,
        limparClinicaSelecionada,
        formatarData,
        formatarTelefone,
        cadastrar,
        carregando: carregando || especializacoesQuery.isLoading || clinicasQuery.isLoading,
        carregandoCatalogos: especializacoesQuery.isLoading || clinicasQuery.isLoading,
        erroCatalogos: especializacoesQuery.isError || clinicasQuery.isError,
    };
}
