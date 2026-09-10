import AsyncStorage from "@react-native-async-storage/async-storage";
import { mockUsers, mockPets } from "../data/mockData";

// Chaves centralizadas do AsyncStorage. Mantidas iguais às usadas hoje pelos
// hooks para não perder dados já gravados durante o desenvolvimento.
export const KEYS = {
    USUARIOS: "USUARIOS",
    PETS: "PETS",
    USUARIO_LOGADO: "USUARIO_LOGADO",
    EXAMES_ENVIADOS: "EXAMES_ENVIADOS",
    RECEITAS_ENVIADAS: "RECEITAS_ENVIADAS",
    PROTOCOLOS_ENVIADOS: "PROTOCOLOS_ENVIADOS",
    HISTORICOS_ENVIADOS: "HISTORICOS_ENVIADOS",
    SOLICITACOES_HISTORICO: "SOLICITACOES_HISTORICO",
    PRONTUARIOS: "PRONTUARIOS",
};

export async function initializeStorage() {
    const usuarios = await AsyncStorage.getItem(KEYS.USUARIOS);
    const pets = await AsyncStorage.getItem(KEYS.PETS);

    if (usuarios === null) {
        await AsyncStorage.setItem(KEYS.USUARIOS, JSON.stringify(mockUsers));
    }
    if (pets === null) {
        await AsyncStorage.setItem(KEYS.PETS, JSON.stringify(mockPets));
    }
}

export async function getData(key) {
    const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}

export async function setData(key, value) {
    await AsyncStorage.setItem(key, JSON.stringify(value));
}

export async function removeData(key) {
    await AsyncStorage.removeItem(key);
}
