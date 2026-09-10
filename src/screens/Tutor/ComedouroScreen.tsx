import { StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";
import { FontAwesome6, MaterialCommunityIcons } from "@expo/vector-icons";
import { useComedouro } from "../../hooks/useComedouro";
import { useAppNavigation } from "../../types";
export default function Comedouro() {
    const { pets, setPets, petAberto, setPetAberto, mensagem, setMensagem, buscarPets, abrirPet, encherComedouro } = useComedouro();

    const navigation = useAppNavigation();

    return (
            <View style={styles.container}>
                <FontAwesome6 name="bowl-rice" size={50} color="#7167F6" alignSelf= "center" />
                <Text style={styles.titulo}>Comedouro inteligente</Text>
    
                {mensagem !== "" && <Text style={styles.mensagem}>{mensagem}</Text>}
    
                <FlatList data={pets} keyExtractor={(item) => item.id} ListEmptyComponent={<Text style={styles.vazio}>Nenhum pet cadastrado.</Text>} renderItem={({ item }) => (
                    <TouchableOpacity style={styles.card} onPress={() => abrirPet(item.id)}>
                        <View style={styles.linhaPet}>
                            <View style={styles.petImagem}>
                                <MaterialCommunityIcons name="paw" size={28} color="#fff"/>
                            </View>
                            <Text style={styles.petNome}>{item.nome}</Text>
                        </View>
                        
                        {petAberto === item.id && (
                            <View style={styles.areaStatus}>
                                <View
                                    style={
                                        item.comedouroStatus === "cheio"
                                        ? styles.statusCheio
                                        : styles.statusVazio
                                    }
                                    >
                                    <Text
                                        style={
                                        item.comedouroStatus === "cheio"
                                            ? styles.textoStatusCheio
                                            : styles.textoStatusVazio
                                        }
                                    >
                                        Status do comedouro: {item.comedouroStatus === "cheio" ? "Cheio" : "Vazio"}
                                    </Text>
                                </View>
                                <TouchableOpacity style={item.comedouroStatus === "cheio" ? styles.btnCheio : styles.btnAtivo} onPress={() => encherComedouro(item.id)}>
                                    <Text style={styles.textoBtn}>
                                        {item.comedouroStatus === "cheio" ? "Comedouro cheio" : "Encher"}
                                    </Text>
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

    mensagem: {
        backgroundColor: "#F4F3FF",
        color: "#7167F6",
        fontWeight: "bold",
        padding: 12,
        borderRadius: 8,
        marginBottom: 12,
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

    linhaPet: {
        flexDirection: "row",
        alignItems: "center",
    },

    petImagem: {
        width: 58,
        height: 58,
        borderRadius: 29,
        backgroundColor: "#7167F6",
        alignItems: "center",
        justifyContent: "center",
    },

    petNome: {
        marginLeft: 14,
        fontSize: 20,
        fontWeight: "bold",
        color: "#7167F6",
    },

    areaStatus: {
        marginTop: 14,
        borderTopWidth: 1,
        borderTopColor: "#ccc",
        paddingTop: 14,
    },

    statusCheio: {
        backgroundColor: "#DCFCE7",
        borderWidth: 1.5,
        borderColor: "#22C55E",
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
    },

    statusVazio: {
        backgroundColor: "#FEF2F2",
        borderWidth: 1.5,
        borderColor: "#EF4444",
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
    },

    textoStatusCheio: {
        color: "#166534",
        fontWeight: "bold",
        fontSize: 16,
        textAlign: "center",
    },

    textoStatusVazio: {
        color: "#991B1B",
        fontWeight: "bold",
        fontSize: 16,
        textAlign: "center",
    },

    btnAtivo: {
        backgroundColor: "#22C55E",
        height: 44,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },

    btnCheio: {
        backgroundColor: "#999",
        height: 44,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        opacity: 0.8,
    },

    textoBtn: {
        color: "#fff",
        fontSize: 17,
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