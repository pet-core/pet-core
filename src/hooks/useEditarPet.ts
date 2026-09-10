import { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import type { RootStackParamList } from "../types/navigation";
import { useAtualizarPet, usePet } from "./api/usePets";

export function useEditarPet() {
    const { petId } = useRoute<RouteProp<RootStackParamList, "TutorEditarPet">>().params;
    const petQuery=usePet(petId); const atualizar=useAtualizarPet();
    const [nome,setNome]=useState(""); const [nascimento,setNascimento]=useState(""); const [raca,setRaca]=useState(""); const [especie,setEspecie]=useState(""); const [porte,setPorte]=useState(""); const [pelagem,setPelagem]=useState(""); const [sexo,setSexo]=useState(""); const [mensagem,setMensagem]=useState("");
    useEffect(()=>{const p=petQuery.data;if(!p)return;setNome(p.nome);setNascimento(p.nascimento);setRaca(p.raca);setEspecie(p.especie);setPorte(p.porte);setPelagem(p.pelagem);setSexo(p.sexo)},[petQuery.data]);
    async function salvar(){if(!nome.trim()){setMensagem("Informe o nome do pet.");return false} if(!petQuery.data)return false;try{await atualizar.mutateAsync({id:petId,dados:{...petQuery.data,nome:nome.trim(),nascimento,raca,especie,porte,pelagem,sexo}});return true}catch{setMensagem("Não foi possível atualizar o pet. Tente novamente.");return false}}
    function formatarData(texto:string){let n=texto.replace(/\D/g,"");if(n.length>8)n=n.slice(0,8);if(n.length>4)return `${n.slice(0,2)}/${n.slice(2,4)}/${n.slice(4)}`;if(n.length>2)return `${n.slice(0,2)}/${n.slice(2)}`;return n}
    return {isLoading:petQuery.isLoading,nome,setNome,nascimento,setNascimento,raca,setRaca,especie,setEspecie,porte,setPorte,pelagem,setPelagem,sexo,setSexo,mensagem,salvar,isSaving:atualizar.isPending,formatarData};
}
