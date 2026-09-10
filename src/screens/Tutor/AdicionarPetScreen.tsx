import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useAdicionarPet } from "../../hooks/useAdicionarPet";
import { useAppNavigation } from "../../types";
export default function AdicionarPet() {
    const { usuario, setUsuario, nome, setNome, nascimento, setNascimento, raca, setRaca, especie, setEspecie, porte, setPorte, pelagem, setPelagem, sexo, setSexo, mensagem, setMensagem, tipoMensagem, setTipoMensagem, buscarUsuario, mostrarMensagem, formatarData, salvarPet } = useAdicionarPet();

    const navigation = useAppNavigation();

    return (
            <ScrollView contentContainerStyle={styles.container}>
                <MaterialCommunityIcons name="paw" size={50} color="#7167F6" alignSelf= "center"/>
                <Text style={styles.titulo}>Adicionar pet</Text>
    
                {mensagem !== "" && (
                    <View style={tipoMensagem === "sucesso" ? styles.cardSucesso : styles.cardErro}>
                        <View style={tipoMensagem === "sucesso" ? styles.iconeSucesso : styles.iconeErro}>
                            <Ionicons name={tipoMensagem === "sucesso" ? "checkmark" : "alert"} size={24} color="#fff"/>
                        </View>
                        <Text style={tipoMensagem === "sucesso" ? styles.tituloSucesso : styles.tituloErro}>
                            {tipoMensagem === "sucesso" ? "Tudo certo!" : "Atenção"}
                        </Text>
                        <Text style={styles.textoMensagem}>{mensagem}</Text>
                        {tipoMensagem === "sucesso" && (
                            <TouchableOpacity style={styles.btnSucesso} onPress={() => navigation.replace("TutorHome")}>
                                <Text style={styles.textoBtnSucesso}>Voltar para início</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                )}
    
                <TextInput placeholder="Nome" style={styles.input} value={nome} onChangeText={setNome} />
                <TextInput placeholder="Data de nascimento" style={styles.input} value={nascimento} keyboardType="numeric" maxLength={10} onChangeText={(value) => setNascimento(formatarData(value))}/>
                <TextInput placeholder="Raça" style={styles.input} value={raca} onChangeText={setRaca} />
                <TextInput placeholder="Espécie" style={styles.input} value={especie} onChangeText={setEspecie} />
                <TextInput placeholder="Porte" style={styles.input} value={porte} onChangeText={setPorte} />
                <TextInput placeholder="Pelagem" style={styles.input} value={pelagem} onChangeText={setPelagem} />
    
                <Text style={styles.label}>Sexo</Text>
    
                <View style={styles.opcoesGenero}>
                    <TouchableOpacity style={sexo === "Macho" ? styles.opcaoSelecionada : styles.opcao} onPress={() => setSexo("Macho")}>
                        <Text style={sexo === "Macho" ? styles.textoOpcaoSelecionada : styles.textoOpcao}>Macho</Text>
                    </TouchableOpacity>
    
                    <TouchableOpacity style={sexo === "Fêmea" ? styles.opcaoSelecionada : styles.opcao} onPress={() => setSexo("Fêmea")}>
                        <Text style={sexo === "Fêmea" ? styles.textoOpcaoSelecionada : styles.textoOpcao}>Fêmea</Text>
                    </TouchableOpacity>
                </View>
    
                <TouchableOpacity style={styles.btn} onPress={salvarPet}>
                    <Text style={styles.textoBtn}>Salvar pet</Text>
                </TouchableOpacity>
    
                <TouchableOpacity style={styles.btnVoltar} onPress={() => navigation.goBack()}>
                    <Text style={styles.textoVoltar}>Voltar</Text>
                </TouchableOpacity>
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
        fontSize: 26,
        color: "#7167F6",
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },

    input: {
        height: 50,
        backgroundColor: "#e5e5e5",
        borderWidth: 1.5,
        borderColor: "#7167F6",
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 10,
        width: "100%",
    },

    label: {
        width: "100%",
        fontSize: 15,
        marginBottom: 6,
        color: "#333",
    },

    opcoesGenero: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    opcao: {
        width: "48%",
        height: 42,
        borderWidth: 1.5,
        borderColor: "#7167F6",
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#e5e5e5",
    },
    opcaoSelecionada: {
        width: "48%",
        height: 42,
        borderWidth: 1.5,
        borderColor: "#7167F6",
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#7167F6",
    },

    textoOpcao: {
        color: "#333",
        fontSize: 13,
    },

    textoOpcaoSelecionada: {
        color: "#fff",
        fontSize: 13,
        fontWeight: "bold",
    },

    btn: {
        backgroundColor: "#7167F6",
        height: 48,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 12,
        width: "100%",
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

    cardSucesso: {
        width: "100%",
        backgroundColor: "#F4F3FF",
        borderWidth: 1.5,
        borderColor: "#7167F6",
        borderRadius: 14,
        padding: 18,
        alignItems: "center",
        marginBottom: 12,
    },

    cardErro: {
        width: "100%",
        backgroundColor: "#FFF1F2",
        borderWidth: 1.5,
        borderColor: "#EF4444",
        borderRadius: 14,
        padding: 18,
        alignItems: "center",
        marginBottom: 12,
    },

    iconeSucesso: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: "#7167F6",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
    },

    iconeErro: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: "#EF4444",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
    },

    tituloSucesso: {
        fontSize: 20,
        color: "#7167F6",
        fontWeight: "bold",
        marginBottom: 6,
    },

    tituloErro: {
        fontSize: 20,
        color: "#EF4444",
        fontWeight: "bold",
        marginBottom: 6,
    },
    
    textoMensagem: {
        fontSize: 15,
        color: "#333",
        textAlign: "center",
        marginBottom: 12,
    },

    btnSucesso: {
        backgroundColor: "#7167F6",
        paddingVertical: 10,
        paddingHorizontal: 18,
        borderRadius: 8,
    },
    textoBtnSucesso: {
        color: "#fff",
        fontWeight: "bold",
    },
});