
import { Alert } from "react-native";
import { useAppNavigation } from "../types";
import { encerrarSessao } from "../services/authStorage";

export function useVetMenu() {
    const navigation = useAppNavigation();

    function alterarFoto() {
            Alert.alert(
                "Funcionalidade em desenvolvimento",
                "A alteração de foto de perfil estará disponível em uma próxima versão do aplicativo.",
                [{
                    text: "Entendi",
                    style: "default"
                }]
            );
        }

    async function sair() {
            await encerrarSessao();
            navigation.replace("Login");
        }

    return {
        alterarFoto,
        sair,
    };
}
