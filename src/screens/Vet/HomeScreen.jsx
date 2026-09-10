import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useNavigation } from "@react-navigation/native";
import { useVetHome } from "../../hooks/useVetHome";
export default function Home(props) {
    const { usuario, setUsuario, buscarUsuario } = useVetHome();

    const navigation = useNavigation();

    return (
            <View style={styles.container}>
                <Header menuRoute="VetMenu"/>
                <Text style={styles.boasVindas}>Bem-vindo(a), Dr(a). {usuario?.nome}</Text>
    
                <Text style={styles.subtitulo}>Serviços</Text>
                <View style={styles.cards}>
                    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("VetExames")}>
                        <Text style={styles.cardTexto}>Exames</Text>
                        <MaterialCommunityIcons name="test-tube" size={32} color="#fff"/>
                    </TouchableOpacity>
    
                    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("VetProntuario")}>
                        <Text style={styles.cardTexto}>Preencher prontuário</Text>
                        <MaterialCommunityIcons name="clipboard-text-outline" size={32} color="#fff"/>
                    </TouchableOpacity>
    
                    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("VetProtocolos")}>
                        <Text style={styles.cardTexto}>Protocolos</Text>
                        <MaterialCommunityIcons name="shield-check-outline" size={32} color="#fff"/>
                    </TouchableOpacity>
    
                    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("VetReceitas")}>
                        <Text style={styles.cardTexto}>Receitas</Text>
                        <MaterialCommunityIcons name="file-document-outline" size={32} color="#fff"/>
                    </TouchableOpacity>
    
                    <TouchableOpacity style={styles.cardGrande} onPress={() => navigation.navigate("VetRelatorios")}>
                        <Text style={styles.cardTexto}>Emitir relatório</Text>
                        <MaterialCommunityIcons name="file-chart-outline" size={32} color="#fff"/>
                    </TouchableOpacity>
                </View>
                <Footer/>
            </View>
        );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },

    boasVindas: {
        fontSize: 22,
        marginHorizontal: 22,
        marginTop: 5,
    },

    subtitulo: {
        fontSize: 20,
        marginHorizontal: 22,
        marginTop: 28,
        marginBottom: 10,
    },

    cards: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        paddingBottom: 80,
    },

    card: {
        width: "42%",
        height: 120,
        backgroundColor: "#7167F6",
        borderRadius: 10,
        padding: 12,
        margin: 8,
        justifyContent: "space-between",
    },

    cardGrande: {
        width: "88%",
        height: 110,
        backgroundColor: "#7167F6",
        borderRadius: 10,
        padding: 12,
        margin: 8,
        justifyContent: "space-between",
    },

    cardTexto: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "500",
    },
});