import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../types/navigation";

import SplashScreen from "../screens/SplashScreen";
import LoginScreen from "../screens/Auth/LoginScreen";
import CadastroScreen from "../screens/Auth/CadastroScreen";
import ErroScreen from "../screens/Common/ErroScreen";

import TutorHomeScreen from "../screens/Tutor/HomeScreen";
import TutorMenuScreen from "../screens/Tutor/MenuScreen";
import TutorAdicionarPetScreen from "../screens/Tutor/AdicionarPetScreen";
import TutorAlterarDadosScreen from "../screens/Tutor/AlterarDadosScreen";
import TutorAvisosScreen from "../screens/Tutor/AvisosScreen";
import TutorComedouroScreen from "../screens/Tutor/ComedouroScreen";
import TutorExamesScreen from "../screens/Tutor/ExamesScreen";
import TutorHistoricoScreen from "../screens/Tutor/HistoricoScreen";
import TutorPetDetalheScreen from "../screens/Tutor/PetDetalheScreen";
import TutorEditarPetScreen from "../screens/Tutor/EditarPetScreen";
import TutorReceitasScreen from "../screens/Tutor/ReceitasScreen";

import VetHomeScreen from "../screens/Vet/HomeScreen";
import VetMenuScreen from "../screens/Vet/MenuScreen";
import VetAlterarDadosScreen from "../screens/Vet/AlterarDadosScreen";
import VetExamesScreen from "../screens/Vet/ExamesScreen";
import VetProntuarioScreen from "../screens/Vet/ProntuarioScreen";
import VetProtocolosScreen from "../screens/Vet/ProtocolosScreen";
import VetReceitasScreen from "../screens/Vet/ReceitasScreen";
import VetRelatoriosScreen from "../screens/Vet/RelatoriosScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

// Stack única e "flat", igual à navegação que já existia no expo-router
// (não havia layouts aninhados: era tudo uma pilha só). Proteção de rotas
// por tipo de perfil (tutor/veterinário) fica para a etapa em que o
// contexto de autenticação for introduzido.
export default function AppNavigator() {
    return (
        <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Cadastro" component={CadastroScreen} />
            <Stack.Screen name="Erro" component={ErroScreen} />

            <Stack.Screen name="TutorHome" component={TutorHomeScreen} />
            <Stack.Screen name="TutorMenu" component={TutorMenuScreen} />
            <Stack.Screen name="TutorAdicionarPet" component={TutorAdicionarPetScreen} />
            <Stack.Screen name="TutorAlterarDados" component={TutorAlterarDadosScreen} />
            <Stack.Screen name="TutorAvisos" component={TutorAvisosScreen} />
            <Stack.Screen name="TutorComedouro" component={TutorComedouroScreen} />
            <Stack.Screen name="TutorExames" component={TutorExamesScreen} />
            <Stack.Screen name="TutorHistorico" component={TutorHistoricoScreen} />
            <Stack.Screen name="TutorPetDetalhe" component={TutorPetDetalheScreen} />
            <Stack.Screen name="TutorEditarPet" component={TutorEditarPetScreen} />
            <Stack.Screen name="TutorReceitas" component={TutorReceitasScreen} />

            <Stack.Screen name="VetHome" component={VetHomeScreen} />
            <Stack.Screen name="VetMenu" component={VetMenuScreen} />
            <Stack.Screen name="VetAlterarDados" component={VetAlterarDadosScreen} />
            <Stack.Screen name="VetExames" component={VetExamesScreen} />
            <Stack.Screen name="VetProntuario" component={VetProntuarioScreen} />
            <Stack.Screen name="VetProtocolos" component={VetProtocolosScreen} />
            <Stack.Screen name="VetReceitas" component={VetReceitasScreen} />
            <Stack.Screen name="VetRelatorios" component={VetRelatoriosScreen} />
        </Stack.Navigator>
    );
}
