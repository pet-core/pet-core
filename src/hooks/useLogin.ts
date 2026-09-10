import { useState } from "react";
import { useAppNavigation } from "../types";
import { findUsuarioByCredentials, salvarSessao } from "../services/authStorage";

export function useLogin() {
    const navigation = useAppNavigation();

    const [email, setEmail] = useState("");

    const [senha, setSenha] = useState("");

    const [mensagem, setMensagem] = useState("");

    const [tipoMensagem, setTipoMensagem] = useState("");

    function mostrarMensagem(tipo: string, texto: string) {
            setTipoMensagem(tipo);
            setMensagem(texto);
        }

    async function entrar() {
            if (!email || email.trim() === "") {
                mostrarMensagem("erro", "Informe o e-mail");
                return;
            }
            if (!senha || senha.trim() === "") {
                mostrarMensagem("erro", "Informe a senha");
                return;
            }
    
            const usuarioEncontrado = await findUsuarioByCredentials(email, senha);
    
            if (!usuarioEncontrado) {
                mostrarMensagem("erro", "E-mail ou senha inválidos");
                return;
            }
    
            await salvarSessao(usuarioEncontrado);
    
            if (usuarioEncontrado.tipoPerfil === "veterinario") {
                navigation.replace("VetHome");
            } else {
                navigation.replace("TutorHome");
            }
        }

    return {
        email,
        setEmail,
        senha,
        setSenha,
        mensagem,
        setMensagem,
        tipoMensagem,
        setTipoMensagem,
        mostrarMensagem,
        entrar,
    };
}
