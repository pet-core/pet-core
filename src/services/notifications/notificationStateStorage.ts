import AsyncStorage from "@react-native-async-storage/async-storage";
import type { EstadoNotificacoes } from "../../types/notifications";


const chaveDoUsuario = (usuarioId: string) => `PETCORE_NOTIFICATION_STATE:${usuarioId}`;

export async function obterEstadoNotificacoes(usuarioId: string): Promise<EstadoNotificacoes | null> {
    const json = await AsyncStorage.getItem(chaveDoUsuario(usuarioId));
    if (!json) return null;

    try {
        return JSON.parse(json) as EstadoNotificacoes;
    } catch {
        await AsyncStorage.removeItem(chaveDoUsuario(usuarioId));
        return null;
    }
}

export async function salvarEstadoNotificacoes(usuarioId: string, estado: EstadoNotificacoes): Promise<void> {
    await AsyncStorage.setItem(chaveDoUsuario(usuarioId), JSON.stringify(estado));
}
