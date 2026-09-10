import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Modal } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useVetExames } from "../../hooks/useVetExames";
import { useAppNavigation } from "../../types";
export default function Exames() {
    const { tutores, tutorSelecionado, petSelecionado, exameSelecionado, arquivoSolicitacao, mensagem, modalTutor, modalPet, modalExame, examesDisponiveis, setModalTutor, setModalPet, setModalExame, selecionarTutor, selecionarPet, selecionarExame, selecionarArquivo, enviarExame, isLoading, isSaving, isError, error } = useVetExames();

    const navigation = useAppNavigation();

    return (
            <ScrollView contentContainerStyle={styles.container}>
                <MaterialCommunityIcons name="test-tube" size={50} color="#7167F6" alignSelf= "center"/>
                <Text style={styles.titulo}>Solicitar Exame</Text>
                {isError && <Text style={styles.mensagem}>{error instanceof Error ? error.message : "Não foi possível carregar os dados."}</Text>}
                {mensagem !== "" && <Text style={styles.mensagem}>{mensagem}</Text>}
                {isLoading && <Text style={styles.carregando}>Carregando dados...</Text>}
                <TouchableOpacity style={styles.select} onPress={() => setModalTutor(true)}>
                    <Text style={tutorSelecionado ? styles.selectTexto : styles.selectPlaceholder}>
                    {tutorSelecionado ? tutorSelecionado.nome : "Selecionar tutor"}
                    </Text>
                    <Ionicons name="chevron-down" size={20} color="#7167F6"/>
                </TouchableOpacity>
    
                <TouchableOpacity style={styles.select} onPress={() => setModalPet(true)}>
                    <Text style={petSelecionado ? styles.selectTexto : styles.selectPlaceholder}>
                    {petSelecionado ? petSelecionado.nome : "Selecionar pet"}
                    </Text>
                    <Ionicons name="chevron-down" size={20} color="#7167F6"/>
                </TouchableOpacity>
    
                {petSelecionado && (
                    <View style={styles.infoPet}>
                        <Text style={styles.infoTexto}>Status do pet: {petSelecionado.obitoInformado ? "Óbito" : "Ativo"}</Text>
                    </View>
                )}
    
                <TouchableOpacity style={styles.select} onPress={() => setModalExame(true)}>
                    <Text style={exameSelecionado ? styles.selectTexto : styles.selectPlaceholder}>
                        {exameSelecionado || "Selecionar exame"}
                    </Text>
                    <Ionicons name="chevron-down" size={20} color="#7167F6"/>
                </TouchableOpacity>
    
                <TouchableOpacity style={styles.btnArquivo} onPress={selecionarArquivo}>
                    <Ionicons name="document-attach-outline" size={20} color="#7167F6"/>
                    <Text style={styles.textoBtnArquivo}>
                    {arquivoSolicitacao || "Selecionar arquivo de solicitação"}
                    </Text>
                </TouchableOpacity>
    
                <TouchableOpacity style={styles.btn} onPress={enviarExame}>
                    <Ionicons name="send" size={18} color="#fff"/>
                    <Text style={styles.textoBtn}>{isSaving ? "Enviando..." : "Enviar"}</Text>
                </TouchableOpacity>
    
                <TouchableOpacity style={styles.btnVoltar} onPress={() => navigation.goBack()}>
                    <Text style={styles.textoVoltar}>Voltar</Text>
                </TouchableOpacity>
    
                <Modal visible={modalTutor} transparent animationType="slide">
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalBox}>
                            <Text style={styles.modalTitulo}>Selecionar tutor</Text>
                            {tutores.map((item) => (
                                <TouchableOpacity key={item.id} style={styles.modalItem} onPress={() => selecionarTutor(item)}>
                                    <Text style={styles.modalItemTexto}>{item.nome}</Text>
                                    <Text style={styles.modalItemSubtexto}>{item.email}</Text>
                                </TouchableOpacity>
                            ))}
                            <TouchableOpacity style={styles.btnCancelar} onPress={() => setModalTutor(false)}>
                                <Text style={styles.textoCancelar}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
    
                <Modal visible={modalPet} transparent animationType="slide">
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalBox}>
                            <Text style={styles.modalTitulo}>Selecionar pet</Text>
                            {petsDoTutor.length === 0 && (
                                <Text style={styles.modalItemSubtexto}>Selecione um tutor com pets cadastrados.</Text>
                            )}
                            {petsDoTutor.map((item) => (
                                <TouchableOpacity key={item.id} style={styles.modalItem} onPress={() => selecionarPet(item)}>
                                    <Text style={styles.modalItemTexto}>{item.nome}</Text>
                                    <Text style={styles.modalItemSubtexto}>{item.especie} • {item.raca}</Text>
                                </TouchableOpacity>
                            ))}
                            <TouchableOpacity style={styles.btnCancelar} onPress={() => setModalPet(false)}>
                                <Text style={styles.textoCancelar}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
    
                <Modal visible={modalExame} transparent animationType="slide">
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalBox}>
                            <Text style={styles.modalTitulo}>Selecionar exame</Text>
                            {examesDisponiveis.map((item, index) => (
                                <TouchableOpacity key={index} style={styles.modalItem} onPress={() => selecionarExame(item)}>
                                    <Text style={styles.modalItemTexto}>{item}</Text>
                                </TouchableOpacity>
                            ))}
                            <TouchableOpacity style={styles.btnCancelar} onPress={() => setModalExame(false)}>
                                <Text style={styles.textoCancelar}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        );
}
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "#fff",
        padding: 28,
        paddingTop: 60,
    },

    titulo: {
        fontSize: 28,
        color: "#7167F6",
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },

    carregando: {
        color: "#666",
        textAlign: "center",
        marginBottom: 12,
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

    select: {
        height: 50,
        backgroundColor: "#e5e5e5",
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

    infoPet: {
        backgroundColor: "#f1f1f1",
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#7167F6",
    },

    infoTexto: {
        fontSize: 16,
        color: "#333",
    },

    btnArquivo: {
        backgroundColor: "#f1f1f1",
        borderWidth: 1.5,
        borderColor: "#7167F6",
        borderRadius: 8,
        minHeight: 50,
        padding: 12,
        justifyContent: "center",
        marginBottom: 12,
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },

    textoBtnArquivo: {
        color: "#7167F6",
        fontWeight: "bold",
        flex: 1,
    },

    btn: {
        backgroundColor: "#7167F6",
        height: 48,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 12,
        flexDirection: "row",
        gap: 8,
    },

    textoBtn: {
        color: "#fff",
        fontSize: 18, 
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
});