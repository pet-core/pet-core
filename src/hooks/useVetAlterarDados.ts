import { useState, useEffect } from "react";
import { getUsuarioLogado, atualizarUsuario } from "../services/authStorage";
import type { Usuario, Clinica } from "../types/models";

export function useVetAlterarDados() {
    const [usuario, setUsuario] = useState<Usuario | null>(null);

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
            buscarUsuario();
        }, []);

    async function buscarUsuario() {
        const user = await getUsuarioLogado();

        if (user !== null) {
            setUsuario(user);
            setNome(user.nome || "");
            setEspecializacao(user.especializacao || "");
            setClinica(user.clinica || user.nomeClinica || "");
            setCnpj(user.cnpj || "");
            setCep(user.cep || "");
            setComplemento(user.complemento || "");
        }
    }

    function selecionarClinica(item: Clinica) {
            setClinica(item.nome);
            setCnpj(item.cnpj);
            setCep(item.cep);
            setComplemento(item.complemento);
            setModalClinica(false);
        }

    async function salvar() {
        if (!nome || nome.trim() === "") {
            setMensagem("Informe o nome.");
            return;
        }
        if (!especializacao || especializacao.trim() === "") {
            setMensagem("Informe a especialização.");
            return;
        }
        if (!clinica || clinica.trim() === "") {
            setMensagem("Informe a clínica.");
            return;
        }

        if (!usuario) {
            setMensagem("Usuário não encontrado.");
            return;
        }

        const usuarioAtualizado: Usuario = {
            ...usuario,
            nome,
            especializacao,
            clinica,
            nomeClinica: clinica,
            cnpj,
            cep,
            complemento,
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
        buscarUsuario,
        selecionarClinica,
        salvar,
    };
}
