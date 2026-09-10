import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Modal } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useProntuario } from "../../hooks/useProntuario";
export default function Prontuario(props) {
    const { usuario, setUsuario, tutores, setTutores, tutorSelecionado, setTutorSelecionado, petsDoTutor, setPetsDoTutor, petSelecionado, setPetSelecionado, dataConsulta, setDataConsulta, temperatura, setTemperatura, peso, setPeso, tratamento, setTratamento, observacoes, setObservacoes, mensagem, setMensagem, modalTutor, setModalTutor, modalPet, setModalPet, buscarDados, buscarPetsDoTutor, selecionarTutor, selecionarPet, formatarData, salvarProntuario } = useProntuario();

    const navigation = useNavigation();

    return (
            <ScrollView contentContainerStyle={styles.container}>
                <MaterialCommunityIcons name="clipboard-text-outline" size={50} color="#7167F6" alignSelf= "center"/>
                <Text style={styles.titulo}>Preencher prontuário</Text>
    
                {mensagem !== "" && <Text style={styles.mensagem}>{mensagem}</Text>}
    
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
                    <View style={styles.cardPet}>
                    <Text style={styles.petTitulo}>Dados do pet</Text>
                    <Text style={styles.petTexto}>Data de nascimento: {petSelecionado.nascimento}</Text>
                    <Text style={styles.petTexto}>Raça: {petSelecionado.raca}</Text>
                    <Text style={styles.petTexto}>Espécie: {petSelecionado.especie}</Text>
                    <Text style={styles.petTexto}>Porte: {petSelecionado.porte}</Text>
                    <Text style={styles.petTexto}>Pelagem: {petSelecionado.pelagem}</Text>
                    <Text style={styles.petTexto}>Sexo: {petSelecionado.sexo}</Text>
                    <Text style={styles.petTexto}>
                        Status do pet: {petSelecionado.obitoInformado ? "Óbito" : "Ativo"}
                    </Text>
                    </View>
                )}
    
                <Text style={styles.subtitulo}>Dados clínicos</Text>
    
                <TextInput placeholder="Data da consulta" style={styles.input} value={dataConsulta} keyboardType="numeric" maxLength={10} onChangeText={(value) => setDataConsulta(formatarData(value))}/>
                <TextInput placeholder="Temperatura" style={styles.input} onChangeText={setTemperatura}/>
                <TextInput placeholder="Peso" style={styles.input} value={peso} onChangeText={setPeso}/>
                <TextInput placeholder="Tratamento" style={styles.input} value={tratamento} onChangeText={setTratamento}/>
                <TextInput placeholder="Observações" style={styles.textArea} value={observacoes} onChangeText={setObservacoes} multiline/>
    
                <TouchableOpacity style={styles.btn} onPress={salvarProntuario}>
                    <Ionicons name="save-outline" size={18} color="#fff"/>
                    <Text style={styles.textoBtn}>Salvar prontuário</Text>
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
        textAlign: "center",
    },

    subtitulo: {
        fontSize: 20,
        color: "#7167F6",
        fontWeight: "bold",
        marginTop: 12,
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

    input: {
        height: 50,
        backgroundColor: "#e5e5e5",
        borderWidth: 1.5,
        borderColor: "#7167F6",
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 10,
    },
    textArea: {
        height: 100,
        backgroundColor: "#e5e5e5",
        borderWidth: 1.5,
        borderColor: "#7167F6",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingTop: 12,
        marginBottom: 10,
        textAlignVertical: "top",
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