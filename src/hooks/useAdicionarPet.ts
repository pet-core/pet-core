import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import type { PetCreateRequest } from "../types/api";
import { useCriarPet } from "./api/usePets";

export function useAdicionarPet() {
    const { usuario } = useAuth();
    const [nome, setNome] = useState(""); const [nascimento, setNascimento] = useState("");
    const [raca, setRaca] = useState(""); const [especie, setEspecie] = useState("");
    const [porte, setPorte] = useState(""); const [pelagem, setPelagem] = useState("");
    const [sexo, setSexo] = useState(""); const [mensagem, setMensagem] = useState("");
    const [tipoMensagem, setTipoMensagem] = useState<"sucesso" | "erro" | "">("");
    const criarPet = useCriarPet();
    function mostrarMensagem(tipo: "sucesso" | "erro", texto: string) { setTipoMensagem(tipo); setMensagem(texto); }
    function formatarData(texto: string) { let n=texto.replace(/\D/g,""); if(n.length>8)n=n.slice(0,8); if(n.length>4)return `${n.slice(0,2)}/${n.slice(2,4)}/${n.slice(4)}`; if(n.length>2)return `${n.slice(0,2)}/${n.slice(2)}`; return n; }
    async function salvarPet() {
        const user = usuario;
        if (!user) { mostrarMensagem("erro", "Usuário não encontrado."); return; }
        if (!nome.trim()) { mostrarMensagem("erro", "Informe o nome do pet."); return; }
        const novoPet: PetCreateRequest = { tutorId:user.id, nome:nome.trim(), nascimento, raca, especie, porte, pelagem, sexo, obitoInformado:false, comedouroStatus:"vazio" };
        try { await criarPet.mutateAsync(novoPet); mostrarMensagem("sucesso", "Pet cadastrado com sucesso."); }
        catch { mostrarMensagem("erro", "Não foi possível cadastrar o pet. Tente novamente."); }
    }
    return { usuario,nome,setNome,nascimento,setNascimento,raca,setRaca,especie,setEspecie,porte,setPorte,pelagem,setPelagem,sexo,setSexo,mensagem,setMensagem,tipoMensagem,setTipoMensagem,mostrarMensagem,formatarData,salvarPet,isSaving:criarPet.isPending };
}
