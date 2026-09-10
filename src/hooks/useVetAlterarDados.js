import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export function useVetAlterarDados() {
    const navigation = useNavigation();

    const [usuario, setUsuario] = useState(null);

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
            const dados = await AsyncStorage.getItem("USUARIO_LOGADO");
            if (dados !== null) {
                const user = JSON.parse(dados);
                setUsuario(user);
                setNome(user.nome || "");
                setEspecializacao(user.especializacao || "");
                setClinica(user.clinica || user.nomeClinica || "");
                setCnpj(user.cnpj || "");
                setCep(user.cep || "");
                setComplemento(user.complemento || "");
            }
        }

    function selecionarClinica(item) {
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
    
            const usuariosStorage = await AsyncStorage.getItem("USUARIOS");
            let usuarios = usuariosStorage ? JSON.parse(usuariosStorage) : [];
    
            const usuarioAtualizado = {
                ...usuario,
                nome,
                especializacao,
                clinica,
                nomeClinica: clinica,
                cnpj,
                cep,
                complemento,
            };
    
            usuarios = usuarios.map((item) => {
                if (item.id === usuario.id) return usuarioAtualizado;
                return item;
            });
    
            await AsyncStorage.setItem("USUARIOS", JSON.stringify(usuarios));
            await AsyncStorage.setItem("USUARIO_LOGADO", JSON.stringify(usuarioAtualizado));
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
