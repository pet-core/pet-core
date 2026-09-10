import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Modal } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRelatorios } from "../../hooks/useRelatorios";
import { useAppNavigation } from "../../types";
export default function Relatorios() {
    const {
        tutores, tutorSelecionado, petsDoTutor, petSelecionado, prontuariosPet, mensagem,
        setMensagem, modalTutor, setModalTutor, modalPet, setModalPet,
        selecionarTutor, selecionarPet, enviarRelatorio,
        carregandoTutores, carregandoPets, carregandoProntuarios, enviando,
        erroTutores, erroPets, erroProntuarios, atualizar,
    } = useRelatorios();

    const navigation = useAppNavigation();

    return (
            <ScrollView contentContainerStyle={styles.container}>
                <MaterialCommunityIcons name="file-chart-outline" size={50} color="#7167F6" alignSelf= "center"/>
                <Text style={styles.titulo}>Emitir relatório</Text>
    
                {mensagem !== "" && <Text style={styles.mensagem}>{mensagem}</Text>}

                {(erroTutores || erroPets || erroProntuarios) && (
                    <TouchableOpacity onPress={atualizar}>
                        <Text style={styles.mensagem}>Não foi possível carregar os dados. Toque para tentar novamente.</Text>
                    </TouchableOpacity>
                )}
    
                <TouchableOpacity style={styles.select} onPress={() => setModalTutor(true)} disabled={carregandoTutores}>
                    <Text style={tutorSelecionado ? styles.selectTexto : styles.selectPlaceholder}>
                    {carregandoTutores ? "Carregando tutores..." : tutorSelecionado ? tutorSelecionado.nome : "Selecionar tutor"}
                    </Text>
                    <Ionicons name="chevron-down" size={20} color="#7167F6"/>
                </TouchableOpacity>
    
                <TouchableOpacity style={styles.select} onPress={() => setModalPet(true)} disabled={!tutorSelecionado || carregandoPets}>
                    <Text style={petSelecionado ? styles.selectTexto : styles.selectPlaceholder}>
                    {carregandoPets ? "Carregando pets..." : petSelecionado ? petSelecionado.nome : "Selecionar pet"}
                    </Text>
                    <Ionicons name="chevron-down" size={20} color="#7167F6"/>
                </TouchableOpacity>
    
                {petSelecionado && (
                    <View style={styles.cardPet}>
                    <Text style={styles.petTitulo}>Histórico encontrado</Text>
                    <Text style={styles.petTexto}>Pet: {petSelecionado.nome}</Text>
                    <Text style={styles.petTexto}>
                        Status do pet: {petSelecionado.obitoInformado ? "Óbito" : "Ativo"}
                    </Text>
                    <Text style={styles.petTexto}>
                        {carregandoProntuarios ? "Carregando prontuários..." : `Quantidade de prontuários: ${prontuariosPet.length}`}
                    </Text>
                    </View>
                )}
    
                {prontuariosPet.map((item) => (
                    <View style={styles.prontuarioCard} key={item.id}>
                    <Text style={styles.prontuarioTitulo}>Consulta: {item.dataConsulta}</Text>
                    <Text style={styles.prontuarioTexto}>Temperatura: {item.temperatura}</Text>
                    <Text style={styles.prontuarioTexto}>Peso: {item.peso}</Text>
                    <Text style={styles.prontuarioTexto}>Tratamento: {item.tratamento}</Text>
                    <Text style={styles.prontuarioTexto}>Observações: {item.observacoes}</Text>
                    </View>
                ))}
    
                <TouchableOpacity style={styles.btn} onPress={enviarRelatorio} disabled={enviando || carregandoProntuarios}>
                    <Ionicons name="send" size={18} color="#fff"/>
                    <Text style={styles.textoBtn}>{enviando ? "Enviando..." : "Enviar relatório ao tutor"}</Text>
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
                                <Text style={styles.modalItemSubtexto}>
                                Selecione um tutor com pets cadastrados.
                                </Text>
                            )}
                            {petsDoTutor.map((item) => (
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
        textAlign: "center"
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

    cardPet: {
        backgroundColor: "#f1f1f1",
        borderWidth: 1.5,
        borderColor: "#7167F6",
        borderRadius: 12,
        padding: 14,
        marginBottom: 12,
    },

    petTitulo: {
        color: "#7167F6",
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8,
    },

    petTexto: {
        fontSize: 15,
        color: "#333",
        marginBottom: 3,
    },

    prontuarioCard: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        padding: 12,
        marginBottom: 10,
    },

    prontuarioTitulo: {
        color: "#7167F6",
        fontWeight: "bold",
        marginBottom: 6,
    },

    prontuarioTexto: {
        color: "#333",
        marginBottom: 3,
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