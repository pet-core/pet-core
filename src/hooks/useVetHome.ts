import { useState, useEffect } from "react";
import type { Usuario } from "../types/models";
import { getUsuarioLogado } from "../services/authStorage";

export function useVetHome() {
    const [usuario, setUsuario] = useState<Usuario | null>(null);

    useEffect(() => {
            buscarUsuario();
        }, []);

    async function buscarUsuario() {
            const usuario = await getUsuarioLogado();
            if (usuario !== null) {
                setUsuario(usuario);
            }
        }

    return {
        usuario,
        setUsuario,
        buscarUsuario,
    };
}
