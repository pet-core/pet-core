import { StyleSheet, Text, View, TouchableOpacity, FlatList, Modal } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useHistorico } from "../../hooks/useHistorico";
export default function Historico(props) {
    const { usuario, setUsuario, pets, setPets, petSelecionado, setPetSelecionado, historicos, setHistoricos, mensagem, setMensagem, cardAberto, setCardAberto, modalPet, setModalPet, buscarDados, selecionarPet, solicitarHistorico, abrirCard } = useHistorico();

    const navigation = useNavigation();

    return (
            <View style={styles.container}>
                <MaterialCommunityIcons name="file-chart-outline" size={50} color="#7167F6" alignSelf= "center"/>
                <Text style={styles.titulo}>Histórico do Pet</Text>
    
                <View style={styles.bloco}>
                    <Text style={styles.subtitulo}>Solicitar histórico</Text>
    
                    <TouchableOpacity style={styles.select} onPress={() => {
                        if (pets.length === 0) {
                            setMensagem("Você ainda não possui pets cadastrados.");
                            return;
                        }
                        setModalPet(true);
                    }}>
                        <Text style={petSelecionado ? styles.selectTexto : styles.selectPlaceholder}>
                            {petSelecionado ? petSelecionado.nome : "Selecionar pet"}
                        </Text>
                        <Ionicons name="chevron-down" size={20} color="#7167F6"/>
                    </TouchableOpacity>
    
                    <TouchableOpacity style={styles.btn} onPress={solicitarHistorico}>
                        <Ionicons name="send" size={18} color="#fff"/>
                        <Text style={styles.textoBtn}>Solicitar histórico</Text>
                    </TouchableOpacity>
    
                    {mensagem !== "" && <Text style={styles.mensagem}>{mensagem}</Text>}
                </View>
    
                <Text style={styles.subtitulo}>Históricos recebidos</Text>
    
                <FlatList data={historicos} keyExtractor={(item) => item.id} ListEmptyComponent={<Text style={styles.vazio}>Nenhum histórico recebido.</Text>} renderItem={({ item }) => (
                    <TouchableOpacity style={styles.card} onPress={() => abrirCard(item.id)}>
                        <Text style={styles.cardTitulo}>{item.petNome}</Text>
                        <Text style={styles.cardSubtitulo}>Data de emissão: {item.dataEmissao}</Text>
    
                        {cardAberto === item.id && (
                            <View style={styles.areaDocumento}>
                                <Text style={styles.label}>Documento:</Text>
                                <TouchableOpacity style={styles.linkArea} onPress={() => navigation.navigate("Erro")}>
                                    <Ionicons name="document-text-outline" size={18} color="#7167F6"/>
                                    <Text style={styles.link}>{item.arquivoHistorico}</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </TouchableOpacity>
                )}/>
    
                <Modal visible={modalPet} transparent animationType="slide">
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalBox}>
                            <Text style={styles.modalTitulo}>Selecionar pet</Text>
                            {pets.map((item) => (
                                <TouchableOpacity key={item.id} style={styles.modalItem} onPress={() => selecionarPet(item)}>
                                    <Text style={styles.modalItemTexto}>{item.nome}</Text>
                                    <Text style={styles.modalItemSubtexto}>
                                    {item.especie} • {item.raca}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                            <TouchableOpacity style={styles.btnCancelar} onPress={() => setModalPet(false)}>
                                <Text style={styles.textoCancelar}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
    
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

    bloco: {
        backgroundColor: "#f1f1f1",
        borderRadius: 12,
        padding: 16,
        borderWidth: 1.5,
        borderColor: "#7167F6",
        marginBottom: 20,
    },

    subtitulo: {
        fontSize: 20,
        color: "#7167F6",
        fontWeight: "bold",
        marginBottom: 12,
    },

    select: {
        height: 50,
        backgroundColor: "#fff",
        borderWidth: 1.5,
        borderColor: "#7167F6",
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    selectTexto: {
        color: "#000",
    },

    selectPlaceholder: {
        color: "#777",
    },

    btn: {
        backgroundColor: "#7167F6",
        height: 48,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: 8,
    },

    textoBtn: {
        color: "#fff",
        fontSize: 17,
        fontWeight: "bold",
    },

    mensagem: {
        marginTop: 10,
        color: "#7167F6",
        textAlign: "center",
        fontWeight: "bold",
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

    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "center",
        alignItems: "center",
    },

    modalBox: {
        width: "85%",
        backgroundColor: "#fff",
        borderRadius: 14,
        padding: 20,
    },

    modalTitulo: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#7167F6",
        marginBottom: 16,
    },

    modalItem: {
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },

    modalItemTexto: {
        fontSize: 15,
        color: "#333",
        fontWeight: "bold",
    },

    modalItemSubtexto: {
        fontSize: 12,
        color: "#777",
        marginTop: 2,
    },

    btnCancelar: {
        marginTop: 16,
        alignItems: "center",
    },

    textoCancelar: {
        color: "#7167F6",
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