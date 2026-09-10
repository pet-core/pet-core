import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export function useLogin() {
    const navigation = useNavigation();

    const [email, setEmail] = useState("");

    const [senha, setSenha] = useState("");

    const [mensagem, setMensagem] = useState("");

    const [tipoMensagem, setTipoMensagem] = useState("");

    function mostrarMensagem(tipo, texto) {
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
    
            const dados = await AsyncStorage.getItem("USUARIOS");
            const usuarios = dados ? JSON.parse(dados) : [];
            const usuarioEncontrado = usuarios.find((item) => {
                return item.email === email && item.senha === senha;
            });
    
            if (!usuarioEncontrado) {
                mostrarMensagem("erro", "E-mail ou senha inválidos");
                return;
            }
    
            await AsyncStorage.setItem("USUARIO_LOGADO", JSON.stringify(usuarioEncontrado));
    
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
