import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { extrairMensagemErro } from "../api";

export function useLogin() {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [tipoMensagem, setTipoMensagem] = useState("");
    const [carregando, setCarregando] = useState(false);

    function mostrarMensagem(tipo: string, texto: string) {
        setTipoMensagem(tipo);
        setMensagem(texto);
    }

    async function entrar(roleParam?: unknown) {
        if (!email.trim()) return mostrarMensagem("erro", "Informe o e-mail");
        if (!senha.trim()) return mostrarMensagem("erro", "Informe a senha");

        try {
            setCarregando(true);
            setMensagem("");
            const role = typeof roleParam === "string" ? roleParam : undefined;
            await login(email, senha, role);
        } catch (erro) {
            mostrarMensagem("erro", extrairMensagemErro(erro, "E-mail ou senha inválidos"));
        } finally {
            setCarregando(false);
        }
    }

    return { email, setEmail, senha, setSenha, mensagem, setMensagem, tipoMensagem, setTipoMensagem, mostrarMensagem, entrar, carregando };
}
