import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useAtualizarMeuUsuario, useClinicas, useEspecializacoes, useMeuUsuario } from "./api";
import type { Clinica } from "../types/models";

export function useVetAlterarDados() {
    const { usuario: usuarioSessao, sincronizarUsuario } = useAuth();
    const { data: usuarioApi, isLoading: carregandoUsuario, isError: erroUsuario, refetch: recarregarUsuario } = useMeuUsuario();
    const { data: especializacoes = [], isLoading: carregandoEspecializacoes, isError: erroEspecializacoes } = useEspecializacoes();
    const { data: clinicas = [], isLoading: carregandoClinicas, isError: erroClinicas } = useClinicas();
    const atualizarMutation = useAtualizarMeuUsuario();

    const usuario = usuarioApi ?? usuarioSessao;
    const [nome, setNome] = useState("");
    const [especializacao, setEspecializacao] = useState("");
    const [clinica, setClinica] = useState("");
    const [cnpj, setCnpj] = useState("");
    const [cep, setCep] = useState("");
    const [complemento, setComplemento] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [modalEspecializacao, setModalEspecializacao] = useState(false);
    const [modalClinica, setModalClinica] = useState(false);

    useEffect(() => {
        if (!usuario) return;
        setNome(usuario.nome || "");
        setEspecializacao(usuario.especializacao || "");
        setClinica(usuario.clinica || usuario.nomeClinica || "");
        setCnpj(usuario.cnpj || "");
        setCep(usuario.cep || "");
        setComplemento(usuario.complemento || "");
    }, [usuario]);

    function selecionarClinica(item: Clinica) {
        setClinica(item.nome);
        setCnpj(item.cnpj);
        setCep(item.cep);
        setComplemento(item.complemento);
        setModalClinica(false);
    }

    async function salvar() {
        if (!nome.trim()) return setMensagem("Informe o nome.");
        if (!especializacao.trim()) return setMensagem("Informe a especialização.");
        if (!clinica.trim()) return setMensagem("Informe a clínica.");
        if (!usuario) return setMensagem("Usuário não encontrado.");

        try {
            const dados = {
                nome: nome.trim(),
                especializacao: especializacao.trim(),
                clinica: clinica.trim(),
                nomeClinica: clinica.trim(),
                cnpj: cnpj.trim(),
                cep: cep.trim(),
                complemento: complemento.trim(),
            };
            const atualizado = await atualizarMutation.mutateAsync(dados);
            await sincronizarUsuario(atualizado);
            setMensagem("Dados atualizados com sucesso.");
            return atualizado;
        } catch (error) {
            setMensagem(error instanceof Error ? error.message : "Não foi possível atualizar os dados.");
        }
    }

    return {
        usuario,
        nome,
        setNome,
        especializacao,
        setEspecializacao,
        clinica,
        setClinica,
        cnpj,
        setCnpj,
        cep,
        setCep,
        complemento,
        setComplemento,
        mensagem,
        setMensagem,
        modalEspecializacao,
        setModalEspecializacao,
        modalClinica,
        setModalClinica,
        especializacoes,
        clinicas,
        carregando: carregandoUsuario || carregandoEspecializacoes || carregandoClinicas,
        salvando: atualizarMutation.isPending,
        erroCatalogos: erroEspecializacoes || erroClinicas,
        erroUsuario,
        buscarUsuario: recarregarUsuario,
        selecionarClinica,
        salvar,
    };
}
