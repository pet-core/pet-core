import { useRoute } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import type { RootStackParamList } from "../types/navigation";
import { useAtualizarPet, useExcluirPet, usePet } from "./api/usePets";

export function usePetDetalhe() {
    const { petId } = useRoute<RouteProp<RootStackParamList, "TutorPetDetalhe">>().params;
    const petQuery = usePet(petId); const atualizar = useAtualizarPet(); const excluir = useExcluirPet();
    async function alterarObito() { if (!petQuery.data) return; await atualizar.mutateAsync({ id:petQuery.data.id, dados:{...petQuery.data, obitoInformado:!petQuery.data.obitoInformado} }); }
    async function excluirPet() { await excluir.mutateAsync(petId); }
    return { pet:petQuery.data ?? null,isLoading:petQuery.isLoading,error:petQuery.error,refetch:petQuery.refetch,alterarObito,excluirPet,isUpdating:atualizar.isPending,isDeleting:excluir.isPending };
}
