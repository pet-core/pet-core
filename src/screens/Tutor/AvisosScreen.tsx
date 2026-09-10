import { StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAvisos } from "../../hooks/useAvisos";
import { useAppNavigation } from "../../types";
export default function Avisos() {
    const { avisos, setAvisos, cardAberto, setCardAberto, buscarAvisos, abrirCard } = useAvisos();

    const navigation = useAppNavigation();

    return (
            <View style={styles.container}>
                <Ionicons name="notifications-outline" size={50} color="#7167F6" alignSelf= "center"/>
                <Text style={styles.titulo}>Avisos</Text>
    
                <FlatList data={avisos} keyExtractor={(item) => item.id} ListEmptyComponent={<Text style={styles.vazio}>Nenhum aviso recebido.</Text>} renderItem={({ item }) => (
                    <TouchableOpacity style={styles.card} onPress={() => abrirCard(item.id)}>
                        <Text style={styles.cardTitulo}>{item.titulo}</Text>
                        <Text style={styles.cardSubtitulo}>Pet: {item.petNome}</Text>
                        <Text style={styles.cardSubtitulo}>Enviado por: {item.veterinarioNome}</Text>
                        <Text style={styles.cardSubtitulo}>Data: {item.dataEnvio}</Text>
                        {cardAberto === item.id && (
                            <View style={styles.areaTexto}>
                                <Text style={styles.texto}>{item.texto}</Text>
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

    areaTexto: {
        marginTop: 14,
        borderTopWidth: 1,
        borderTopColor: "#ccc",
        paddingTop: 12,
    },

    texto: {
        fontSize: 15,
        color: "#222",
        lineHeight: 22,
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