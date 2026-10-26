import type { Usuario } from "../types/models";
import { KEYS, getData } from "./storage";

export async function getTutores(): Promise<Usuario[]> {
    const usuarios = (await getData<Usuario[]>(KEYS.USUARIOS)) ?? [];
    return usuarios.filter((usuario: Usuario) => usuario.tipoPerfil === "tutor");
}
