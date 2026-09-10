import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Footer from "../../components/Footer";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCadastro } from "../../hooks/useCadastro";
import { useAppNavigation } from "../../types";
export default function Cadastro() {
    const { nome, setNome, nascimento, setNascimento, telefone, setTelefone, genero, setGenero, email, setEmail, senha, setSenha, isVeterinario, setIsVeterinario, especializacao, setEspecializacao, clinica, setClinica, cnpj, setCnpj, nomeClinica, setNomeClinica, cep, setCep, complemento, setComplemento, mensagem, setMensagem, tipoMensagem, setTipoMensagem, modalEspecializacao, setModalEspecializacao, modalClinica, setModalClinica, mostrarMensagem, selecionarClinica, limparClinicaSelecionada, formatarData, formatarTelefone, cadastrar, carregando, especializacoes, clinicas, carregandoCatalogos, erroCatalogos } = useCadastro();

    const navigation = useAppNavigation();

    return (
            <SafeAreaView style={styles.container}>
                <ScrollView contentContainerStyle={styles.conteudo}>
                    <Image source={require("../../../assets/logo.jpeg")} style={styles.logo}/>
                    <Text style={styles.titulo}>Cadastre-se!</Text>
    
                    {mensagem !== "" && (
                        <View style={tipoMensagem === "sucesso" ? styles.cardSucesso : styles.cardErro}>
                            <View style={tipoMensagem === "sucesso" ? styles.iconeSucesso : styles.iconeErro}>
                                <Ionicons name={tipoMensagem === "sucesso" ? "checkmark" : "alert"} size={24} color="#fff"/>
                            </View>
    
                            <Text style={tipoMensagem === "sucesso" ? styles.tituloSucesso : styles.tituloErro}>{tipoMensagem === "sucesso" ? "Tudo certo!" : "Atenção"}</Text>
    
                            <Text style={styles.textoMensagem}>{mensagem}</Text>
    
                                {tipoMensagem === "sucesso" && (
                                    <TouchableOpacity style={styles.btnSucesso} onPress={() => navigation.replace("Login")}>
                                        <Text style={styles.textoBtnSucesso}>Ir para login</Text>
                                    </TouchableOpacity>
                                )}
                        </View>
                    )}
    
                    <TextInput placeholder="Digite seu nome" style={styles.input} value={nome} onChangeText={setNome}/>
    
                    <TextInput placeholder="Digite sua data de nascimento" style={styles.input} value={nascimento} keyboardType="numeric" maxLength={10} onChangeText={(value) => setNascimento(formatarData(value))}/>
    
                    <TextInput placeholder="Digite seu telefone" style={styles.input} value={telefone} keyboardType="phone-pad" maxLength={15} onChangeText={(value) => setTelefone(formatarTelefone(value))}/>
    
                    <Text style={styles.label}>Gênero</Text>
                        <View style={styles.opcoesGenero}>
                            <TouchableOpacity style={genero === "Feminino" ? styles.opcaoSelecionada : styles.opcao} onPress={() => setGenero("Feminino")}>
                                <Text style={genero === "Feminino" ? styles.textoOpcaoSelecionada : styles.textoOpcao}>Feminino</Text>
                            </TouchableOpacity>
    
                            <TouchableOpacity style={genero === "Masculino" ? styles.opcaoSelecionada : styles.opcao} onPress={() => setGenero("Masculino")}>
                                <Text style={genero === "Masculino" ? styles.textoOpcaoSelecionada : styles.textoOpcao}>Masculino</Text>
                            </TouchableOpacity>
                        </View>
    
                    <TextInput placeholder="Digite seu email" style={styles.input} value={email} keyboardType="email-address" autoCapitalize="none" onChangeText={setEmail}  />
    
                    <TextInput placeholder="Digite sua senha" style={styles.input} secureTextEntry value={senha} onChangeText={setSenha}/>
    
                    <TouchableOpacity style={styles.checkboxArea} onPress={() => setIsVeterinario(!isVeterinario)}>
                        <View style={styles.checkbox}>
                            {isVeterinario && <Ionicons name="checkmark" size={18} color="#7167F6"/>}
                        </View>
    
                        <Text style={styles.textoCheckbox}>Sou Médico Veterinário</Text>
                        </TouchableOpacity>
    
                        {isVeterinario && (
                            <View style={styles.areaVet}>
                                <TouchableOpacity style={styles.selectVet} onPress={() => setModalEspecializacao(true)}>
                                    <Text style={especializacao ? styles.selectVetTexto : styles.selectVetPlaceholder}>
                                        {especializacao || "Selecione sua especialização"}
                                    </Text>
                                    <Ionicons name="chevron-down" size={18} color="#7167F6"/>
                                </TouchableOpacity>
                                
                                <TouchableOpacity style={styles.selectVet} onPress={() => setModalClinica(true)}>
                                    <Text style={clinica ? styles.selectVetTexto : styles.selectVetPlaceholder}>
                                        {clinica || "Selecione sua clínica"}
                                    </Text>
                                    <Ionicons name="chevron-down" size={18} color="#7167F6"/>
                                </TouchableOpacity>
                                
                                <Text style={styles.textoBranco}>Se não achou, cadastre!</Text>
    
                                <TextInput placeholder="Digite o CNPJ da clínica" style={styles.inputVet} value={cnpj} onChangeText={(value) => {
                                    limparClinicaSelecionada();
                                    setCnpj(value);
                                }}/>
    
                                <TextInput placeholder="Digite o nome da clínica" style={styles.inputVet} value={nomeClinica} onChangeText={(value) => {
                                    limparClinicaSelecionada();
                                    setNomeClinica(value);
                                }}/>
    
                                <TextInput placeholder="Digite o CEP da clínica" style={styles.inputVet} value={cep} onChangeText={(value) => {
                                    limparClinicaSelecionada();
                                    setCep(value);
                                }}/>
    
                                <TextInput placeholder="Digite o complemento" style={styles.inputVet} value={complemento} onChangeText={(value) => {
                                    limparClinicaSelecionada();
                                    setComplemento(value);
                                }}/>
                            </View>
                        )}
    
                    <TouchableOpacity style={[styles.btn, carregando && styles.btnDesabilitado]} onPress={cadastrar} disabled={carregando}><Text style={styles.textoBtn}>{carregando ? "Cadastrando..." : "Cadastrar"}</Text></TouchableOpacity>
    
                    <View style={styles.areaLogin}>
                        <Text style={styles.textoLogin}>Já tem cadastro? </Text>
                        <TouchableOpacity onPress={() => navigation.replace("Login")}>
                        <Text style={styles.linkLogin}>Faça seu login!</Text>
                        </TouchableOpacity>
                    </View>
    
                    <Modal visible={modalEspecializacao} transparent={true} animationType="slide">
                        <View style={styles.modalOverlay}>
                            <View style={styles.modalBox}>
                                <Text style={styles.modalTitulo}>Especialização</Text>
    
                                {carregandoCatalogos ? (
                                    <Text style={styles.modalItemTexto}>Carregando especializações...</Text>
                                ) : erroCatalogos ? (
                                    <Text style={styles.modalItemTexto}>Não foi possível carregar as especializações.</Text>
                                ) : especializacoes.map((item, index) => (
                                    <TouchableOpacity key={index} style={styles.modalItem} onPress={() => {
                                        setEspecializacao(item);
                                        setModalEspecializacao(false);
                                    }}>
                                        <Text>{item}</Text>
                                    </TouchableOpacity>
                                ))}
    
                                <TouchableOpacity style={styles.btnCancelar} onPress={() => setModalEspecializacao(false)}>
                                    <Text>Cancelar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                    <Modal visible={modalClinica} transparent={true} animationType="slide">
                        <View style={styles.modalOverlay}>
                            <View style={styles.modalBox}>
                                <Text style={styles.modalTitulo}>Clínica</Text>
    
                                {carregandoCatalogos ? (
                                    <Text style={styles.modalItemTexto}>Carregando clínicas...</Text>
                                ) : erroCatalogos ? (
                                    <Text style={styles.modalItemTexto}>Não foi possível carregar as clínicas.</Text>
                                ) : clinicas.map((item, index) => (
                                    <TouchableOpacity key={index} style={styles.modalItem} onPress={() => selecionarClinica(item)}>
                                        <Text style={styles.modalItemTexto}>{item.nome}</Text>
                                        <Text style={styles.modalItemSubtexto}>{item.cnpj}</Text>
                                    </TouchableOpacity>
                                ))}
    
                                <TouchableOpacity style={styles.btnCancelar} onPress={() => setModalClinica(false)}>
                                    <Text>Cancelar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </ScrollView>
                <Footer/>
            </SafeAreaView>
        );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },

    conteudo: {
        paddingHorizontal: 28,
        paddingTop: 50,
        paddingBottom: 20,
        alignItems: "center",
    },

    logo: {
        width: 150,
        height: 150,
        resizeMode: "contain",
        alignSelf: "center"
    },

    titulo: {
        fontSize: 24,
        marginBottom: 12
    },

    input: {
        width: "100%",
        height: 48,
        backgroundColor: "#e5e5e5",
        borderWidth: 1.5,
        borderColor: "#7167F6",
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 10,
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
        justifyContent: "space-evenly",
        marginBottom: 10,
    },

    opcao: {
        width: "31%",
        height: 42,
        borderWidth: 1.5,
        borderColor: "#7167F6",
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#e5e5e5",
    },

    opcaoSelecionada: {
        width: "31%",
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

    checkboxArea: {
        width: "100%",
        backgroundColor: "#7167F6",
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderRadius: 6,
    },

    checkbox: {
        width: 22,
        height: 22,
        backgroundColor: "#fff",
        borderRadius: 4,
        marginRight: 8,
        alignItems: "center",
        justifyContent: "center",
    },

    textoCheckbox: {
        color: "#fff",
        fontSize: 15,
    },

    areaVet: {
        width: "100%",
        backgroundColor: "#7167F6",
        padding: 12,
        borderRadius: 6,
        marginBottom: 12,
        marginTop: 12,
    },

    inputVet: {
        width: "100%",
        height: 48,
        backgroundColor: "#e5e5e5",
        borderWidth: 1,
        borderColor: "#fff",
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 10,
    },

    selectVet: {
        width: "100%",
        height: 48,
        backgroundColor: "#e5e5e5",
        borderWidth: 1,
        borderColor: "#fff",
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        color: "#333",
        fontSize: 13,
    },

    selectVetTexto: {
        color: "#333",
        fontSize: 14,
    },

    selectVetPlaceholder: {
        color: "#777",
        fontSize: 14,
    },

    areaLogin: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 16,
        marginBottom: 40,
    },

    textoLogin: {
        color: "#333",
        fontSize: 14,
    },

    linkLogin: {
        color: "#7167F6",
        fontSize: 14,
        fontWeight: "bold",
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

    textoBranco: {
        color: "#fff",
        marginBottom: 8,
    },

    btn: {
        backgroundColor: "#7167F6",
        width: 150,
        height: 45,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 12,
    },

    btnDesabilitado: {
        opacity: 0.6,
    },

    textoBtn: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
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