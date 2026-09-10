import { StyleSheet, Text, TextInput, TouchableOpacity, ScrollView, View, Image } from "react-native";
import { useTutorAlterarDados } from "../../hooks/useTutorAlterarDados";
import { useAppNavigation } from "../../types";
export default function AlterarDados() {
    const { nome, setNome, nascimento, setNascimento, telefone, setTelefone, genero, setGenero, email, setEmail, senha, setSenha, confirmarSenha, setConfirmarSenha, mensagem, formatarData, formatarTelefone, carregando, salvando, erroUsuario, salvar } = useTutorAlterarDados();

    const navigation = useAppNavigation();

    return (
            <ScrollView contentContainerStyle={styles.container}>
                <Image source={require("../../../assets/avatar-default.png")} style={styles.avatar}/>
                <Text style={styles.titulo}>Alterar dados</Text>
                {(mensagem !== "" || erroUsuario) && <Text style={styles.mensagem}>{mensagem || "Não foi possível carregar seus dados."}</Text>}
                <TextInput placeholder="Nome" style={styles.input} value={nome} onChangeText={setNome}/>
    
                <TextInput placeholder="Data de nascimento" style={styles.input} value={nascimento} keyboardType="numeric" maxLength={10} onChangeText={(value) => setNascimento(formatarData(value))}/>
                <TextInput placeholder="Telefone" style={styles.input} value={telefone} keyboardType="phone-pad" maxLength={15} onChangeText={(value) => setTelefone(formatarTelefone(value))}/>
    
                <Text style={styles.label}>Gênero</Text>
                <View style={styles.opcoesGenero}>
                    <TouchableOpacity style={genero === "Feminino" ? styles.opcaoSelecionada : styles.opcao} onPress={() => setGenero("Feminino")}>
                        <Text style={genero === "Feminino" ? styles.textoOpcaoSelecionada : styles.textoOpcao}>Feminino</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={genero === "Masculino" ? styles.opcaoSelecionada : styles.opcao} onPress={() => setGenero("Masculino")}>
                        <Text style={genero === "Masculino" ? styles.textoOpcaoSelecionada : styles.textoOpcao}>Masculino</Text>
                    </TouchableOpacity>
                </View>
    
                <TextInput placeholder="E-mail" style={styles.input} value={email} keyboardType="email-address" autoCapitalize="none" onChangeText={setEmail}/>
                <TextInput placeholder="Nova senha" style={styles.input} value={senha} secureTextEntry onChangeText={setSenha}/>
                <TextInput placeholder="Confirmar nova senha" style={styles.input} value={confirmarSenha} secureTextEntry onChangeText={setConfirmarSenha}/>
    
                <TouchableOpacity style={styles.btn} onPress={salvar} disabled={carregando || salvando}>
                    <Text style={styles.textoBtn}>{salvando ? "Salvando..." : carregando ? "Carregando..." : "Salvar"}</Text>
                </TouchableOpacity>
    
                <TouchableOpacity style={styles.btnVoltar} onPress={() => navigation.replace("TutorHome")}>
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

    avatar: {
        width: 80,
        height: 80,
        borderRadius: 100,
        marginBottom:10,
        alignSelf: "center",
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
});