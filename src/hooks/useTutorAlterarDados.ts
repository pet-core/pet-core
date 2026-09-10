import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useAtualizarMeuUsuario, useMeuUsuario } from "./api";

export function useTutorAlterarDados() {
    const { usuario: usuarioSessao, sincronizarUsuario } = useAuth();
    const { data: usuarioApi, isLoading: carregandoUsuario, isError: erroUsuario, refetch: recarregarUsuario } = useMeuUsuario();
    const atualizarMutation = useAtualizarMeuUsuario();

    const usuario = usuarioApi ?? usuarioSessao;
    const [nome, setNome] = useState("");
    const [nascimento, setNascimento] = useState("");
    const [telefone, setTelefone] = useState("");
    const [genero, setGenero] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [mensagem, setMensagem] = useState("");

    useEffect(() => {
        if (!usuario) return;
        setNome(usuario.nome || "");
        setNascimento(usuario.nascimento || "");
        setTelefone(usuario.telefone || "");
        setGenero(usuario.genero || "");
        setEmail(usuario.email || "");
        setSenha("");
        setConfirmarSenha("");
    }, [usuario]);

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
        if (!nome.trim()) return setMensagem("Informe o nome.");
        if (!email.trim()) return setMensagem("Informe o e-mail.");
        if (senha && senha !== confirmarSenha) return setMensagem("As senhas não conferem.");
        if (!usuario) return setMensagem("Usuário não encontrado.");

        try {
            const dados = {
                nome: nome.trim(),
                email: email.trim(),
                nascimento: nascimento.trim(),
                telefone: telefone.trim(),
                genero: genero.trim(),
                ...(senha ? { senha } : {}),
            };
            const atualizado = await atualizarMutation.mutateAsync(dados);
            await sincronizarUsuario(atualizado);
            setSenha("");
            setConfirmarSenha("");
            setMensagem("Dados atualizados com sucesso.");
            return atualizado;
        } catch (error) {
            setMensagem(error instanceof Error ? error.message : "Não foi possível atualizar os dados.");
        }
    }

    return {
        usuario,
        nome, setNome,
        nascimento, setNascimento,
        telefone, setTelefone,
        genero, setGenero,
        email, setEmail,
        senha, setSenha,
        confirmarSenha, setConfirmarSenha,
        mensagem, setMensagem,
        carregando: carregandoUsuario,
        salvando: atualizarMutation.isPending,
        erroUsuario,
        buscarUsuario: recarregarUsuario,
        formatarData,
        formatarTelefone,
        salvar,
    };
}
