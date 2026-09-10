import type { Usuario } from "../types/models";
import { getUsuarios } from "./authStorage";

export async function getTutores(): Promise<Usuario[]> {
    const usuarios = await getUsuarios();
    return usuarios.filter((usuario) => usuario.tipoPerfil === "tutor");
}
