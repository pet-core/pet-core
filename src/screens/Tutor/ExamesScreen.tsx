import { StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { useTutorExames } from "../../hooks/useTutorExames";
import { useAppNavigation } from "../../types";
export default function Exames() {
    const { exames, setExames, cardAberto, setCardAberto, buscarExames, abrirCard } = useTutorExames();

    const navigation = useAppNavigation();

    return (
            <View style={styles.container}>
                <MaterialCommunityIcons name="test-tube" size={50} color="#7167F6" alignSelf= "center"/>
                <Text style={styles.titulo}>Exames</Text>
    
                <FlatList data={exames} keyExtractor={(item) => item.id} ListEmptyComponent={<Text style={styles.vazio}>Nenhum exame recebido.</Text>} renderItem={({ item }) => (
                    <TouchableOpacity style={styles.card} onPress={() => abrirCard(item.id)}>
                        <Text style={styles.cardTitulo}>{item.tipoExame}</Text>
                        <Text style={styles.cardSubtitulo}>Solicitado por: {item.veterinarioNome}</Text>
                        <Text style={styles.cardSubtitulo}>Pet: {item.petNome}</Text>
    
                        {cardAberto === item.id && (
                            <View style={styles.areaDocumento}>
                                <Text style={styles.label}>Documento de solicitação:</Text>
                                <TouchableOpacity style={styles.linkArea} onPress={() => navigation.navigate("Erro")}>
                                    <Ionicons name="document-text-outline" size={18} color="#7167F6"/>
                                    <Text style={styles.link}>{item.arquivoSolicitacao}</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </TouchableOpacity>
                )}/>
                <TouchableOpacity style={styles.btnVoltar} onPress={() => navigation.goBack()}>
                    <Text style={styles.textoVoltar}>Voltar</Text>
                </TouchableOpacity>
            </View>
        );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 28,
        paddingTop: 60,
        backgroundColor: "#fff",
    },

    titulo: {
        fontSize: 28,
        color: "#7167F6",
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },

    vazio: {
        color: "#666",
        fontSize: 16,
    },

    card: {
        backgroundColor: "#f1f1f1",
        borderWidth: 1.5,
        borderColor: "#7167F6",
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
    },

    cardTitulo: {
        fontSize: 20,
        color: "#7167F6",
        fontWeight: "bold",
    },

    cardSubtitulo: {
        fontSize: 15,
        color: "#333",
        marginTop: 4,
    },

    areaDocumento: {
        marginTop: 14,
        borderTopWidth: 1,
        borderTopColor: "#ccc",
        paddingTop: 12,
    },

    label: {
        color: "#666",
        marginBottom: 4,
    },

    linkArea: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },

    link: {
        color: "#7167F6",
        textDecorationLine: "underline",
        fontWeight: "bold",
    },

    btnVoltar: {
        alignItems: "center",
        marginTop: 18,
    },

    textoVoltar: {
        color: "#7167F6",
        fontSize: 16,
        textDecorationLine: "underline",
    },
});