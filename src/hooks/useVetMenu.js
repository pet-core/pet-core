
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export function useVetMenu() {
    const navigation = useNavigation();

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
            await AsyncStorage.removeItem("USUARIO_LOGADO");
            navigation.replace("Login");
        }

    return {
        alterarFoto,
        sair,
    };
}
