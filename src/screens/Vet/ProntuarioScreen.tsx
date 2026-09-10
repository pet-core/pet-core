import { Alert, ActivityIndicator, FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useProntuario } from "../../hooks/useProntuario";
import { useAppNavigation } from "../../types";

export default function ProntuarioScreen() {
    const navigation = useAppNavigation();
    const {
        formulario,
        registros,
        pets,
        petSelecionado,
        registroEditando,
        mensagem,
        isLoading,
        isSaving,
        isDeleting,
        isError,
        atualizarCampo,
        selecionarPet,
        iniciarNovoRegistro,
        editarRegistro,
        formatarData,
        salvarProntuario,
        excluirProntuario,
    } = useProntuario();

    const [modalPet, setModalPet] = useState(false);

    function confirmarExclusao(id: string) {
        Alert.alert("Excluir prontuário", "Esta ação não poderá ser desfeita. Deseja continuar?", [
            { text: "Cancelar", style: "cancel" },
            { text: "Excluir", style: "destructive", onPress: () => void excluirProntuario(id) },
        ]);
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={registros}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.conteudo}
                ListHeaderComponent={
                    <>
                        <MaterialCommunityIcons name="clipboard-text-outline" size={50} color="#7167F6" style={styles.icone} />
                        <Text style={styles.titulo}>Prontuários</Text>

                        <View style={styles.formulario}>
                            <View style={styles.linhaTitulo}>
                                <Text style={styles.subtitulo}>{registroEditando ? "Editar prontuário" : "Novo prontuário"}</Text>
                                {registroEditando && (
                                    <TouchableOpacity onPress={iniciarNovoRegistro}>
                                        <Text style={styles.cancelarEdicao}>Cancelar edição</Text>
                                    </TouchableOpacity>
                                )}
                            </View>

                            {isLoading && <ActivityIndicator size="small" color="#7167F6" style={styles.loader} />}
                            {isError && <Text style={styles.erro}>Não foi possível carregar os dados da API.</Text>}
                            {mensagem !== "" && <Text style={styles.mensagem}>{mensagem}</Text>}

                            <TouchableOpacity style={styles.select} onPress={() => setModalPet(true)} disabled={isSaving}>
                                <Text style={petSelecionado ? styles.selectTexto : styles.selectPlaceholder}>
                                    {petSelecionado ? petSelecionado.nome : "Selecionar pet"}
                                </Text>
                                <Ionicons name="chevron-down" size={20} color="#7167F6" />
                            </TouchableOpacity>

                            <TextInput
                                placeholder="Nome do tutor"
                                style={styles.input}
                                value={formulario.tutorNome}
                                onChangeText={(value) => atualizarCampo("tutorNome", value)}
                            />
                            <TextInput
                                placeholder="Data da consulta"
                                style={styles.input}
                                value={formulario.dataConsulta}
                                keyboardType="numeric"
                                maxLength={10}
                                onChangeText={(value) => atualizarCampo("dataConsulta", formatarData(value))}
                            />
                            <TextInput placeholder="Temperatura" style={styles.input} value={formulario.temperatura} onChangeText={(value) => atualizarCampo("temperatura", value)} />
                            <TextInput placeholder="Peso" style={styles.input} value={formulario.peso} onChangeText={(value) => atualizarCampo("peso", value)} />
                            <TextInput placeholder="Tratamento" style={styles.input} value={formulario.tratamento} onChangeText={(value) => atualizarCampo("tratamento", value)} />
                            <TextInput placeholder="Observações" style={styles.textArea} value={formulario.observacoes} onChangeText={(value) => atualizarCampo("observacoes", value)} multiline />

                            <TouchableOpacity style={styles.btn} onPress={() => void salvarProntuario()} disabled={isSaving}>
                                {isSaving ? <ActivityIndicator color="#fff" /> : <><Ionicons name="save-outline" size={18} color="#fff" /><Text style={styles.textoBtn}>{registroEditando ? "Atualizar prontuário" : "Salvar prontuário"}</Text></>}
                            </TouchableOpacity>
                        </View>

                        <View style={styles.listaCabecalho}>
                            <Text style={styles.subtitulo}>Prontuários cadastrados</Text>
                            <TouchableOpacity style={styles.novoBtn} onPress={iniciarNovoRegistro}>
                                <Ionicons name="add" size={18} color="#7167F6" />
                                <Text style={styles.novoTexto}>Novo</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                }
                ListEmptyComponent={<Text style={styles.vazio}>{isLoading ? "Carregando prontuários..." : "Nenhum prontuário retornado pela API."}</Text>}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <View style={styles.cardTexto}>
                            <Text style={styles.cardTitulo}>{item.petNome}</Text>
                            <Text style={styles.cardLinha}>Tutor: {item.tutorNome}</Text>
                            <Text style={styles.cardLinha}>Consulta: {item.dataConsulta}</Text>
                            {item.tratamento && <Text style={styles.cardLinha}>Tratamento: {item.tratamento}</Text>}
                        </View>
                        <View style={styles.acoes}>
                            <TouchableOpacity style={styles.acao} onPress={() => editarRegistro(item)}>
                                <Ionicons name="create-outline" size={20} color="#7167F6" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.acao} onPress={() => confirmarExclusao(item.id)} disabled={isDeleting}>
                                <Ionicons name="trash-outline" size={20} color="#C0392B" />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                ListFooterComponent={
                    <TouchableOpacity style={styles.btnVoltar} onPress={() => navigation.goBack()}>
                        <Text style={styles.textoVoltar}>Voltar</Text>
                    </TouchableOpacity>
                }
            />

            <Modal visible={modalPet} transparent animationType="slide" onRequestClose={() => setModalPet(false)}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalBox}>
                        <Text style={styles.modalTitulo}>Selecionar pet</Text>
                        {pets.map((item) => (
                            <TouchableOpacity key={item.id} style={styles.modalItem} onPress={() => { selecionarPet(item); setModalPet(false); }}>
                                <Text style={styles.modalItemTexto}>{item.nome}</Text>
                                <Text style={styles.modalItemSubtexto}>{item.especie} • {item.raca}</Text>
                            </TouchableOpacity>
                        ))}
                        {pets.length === 0 && <Text style={styles.modalItemSubtexto}>Nenhum pet retornado pela API.</Text>}
                        <TouchableOpacity style={styles.btnCancelar} onPress={() => setModalPet(false)}>
                            <Text style={styles.textoCancelar}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    conteudo: { padding: 28, paddingTop: 60, paddingBottom: 40 },
    icone: { alignSelf: "center" },
    titulo: { fontSize: 28, color: "#7167F6", fontWeight: "bold", marginBottom: 20, textAlign: "center" },
    formulario: { backgroundColor: "#f1f1f1", borderRadius: 12, padding: 16, borderWidth: 1.5, borderColor: "#7167F6", marginBottom: 22 },
    linhaTitulo: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 12 },
    subtitulo: { fontSize: 20, color: "#7167F6", fontWeight: "bold" },
    cancelarEdicao: { color: "#7167F6", textDecorationLine: "underline" },
    loader: { marginBottom: 10 },
    erro: { color: "#C0392B", textAlign: "center", marginBottom: 10 },
    mensagem: { backgroundColor: "#F4F3FF", color: "#7167F6", fontWeight: "bold", padding: 10, borderRadius: 8, marginBottom: 12, textAlign: "center" },
    select: { height: 50, backgroundColor: "#fff", borderWidth: 1.5, borderColor: "#7167F6", borderRadius: 8, paddingHorizontal: 12, marginBottom: 12, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
    selectTexto: { color: "#000" },
    selectPlaceholder: { color: "#777" },
    input: { height: 50, backgroundColor: "#fff", borderWidth: 1, borderColor: "#ccc", borderRadius: 8, paddingHorizontal: 12, marginBottom: 12 },
    textArea: { minHeight: 100, backgroundColor: "#fff", borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 12, marginBottom: 12, textAlignVertical: "top" },
    btn: { backgroundColor: "#7167F6", minHeight: 48, borderRadius: 8, alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 8 },
    textoBtn: { color: "#fff", fontSize: 17, fontWeight: "bold" },
    listaCabecalho: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 12 },
    novoBtn: { flexDirection: "row", alignItems: "center", gap: 4, padding: 8 },
    novoTexto: { color: "#7167F6", fontWeight: "bold" },
    vazio: { color: "#666", fontSize: 16, marginBottom: 16 },
    card: { backgroundColor: "#f1f1f1", borderWidth: 1.5, borderColor: "#7167F6", borderRadius: 12, padding: 14, marginBottom: 12, flexDirection: "row", alignItems: "center" },
    cardTexto: { flex: 1 },
    cardTitulo: { fontSize: 19, color: "#7167F6", fontWeight: "bold", marginBottom: 4 },
    cardLinha: { color: "#333", marginTop: 2 },
    acoes: { flexDirection: "row", marginLeft: 8 },
    acao: { padding: 8 },
    btnVoltar: { alignItems: "center", marginTop: 10 },
    textoVoltar: { color: "#7167F6", fontSize: 16, textDecorationLine: "underline" },
    modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "center", alignItems: "center" },
    modalBox: { width: "85%", maxHeight: "80%", backgroundColor: "#fff", borderRadius: 14, padding: 20 },
    modalTitulo: { fontSize: 20, fontWeight: "bold", color: "#7167F6", marginBottom: 14 },
    modalItem: { paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: "#eee" },
    modalItemTexto: { fontSize: 17, fontWeight: "bold", color: "#222" },
    modalItemSubtexto: { color: "#666", marginTop: 3 },
    btnCancelar: { marginTop: 14, alignItems: "center", padding: 10 },
    textoCancelar: { color: "#7167F6", fontWeight: "bold" },
});
