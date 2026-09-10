
import { Alert } from "react-native";
import { useAuth } from "../context/AuthContext";

export function useVetMenu() {
    const { logout } = useAuth();

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
            await logout();
        }

    return {
        alterarFoto,
        sair,
    };
}
