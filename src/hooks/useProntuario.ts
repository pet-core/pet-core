import { useMemo, useState } from "react";
import type { Pet, RegistroClinico } from "../types/models";
import type { ClinicalRecordCreateRequest, ClinicalRecordUpdateRequest } from "../types/api";
import {
    useAtualizarClinicalRecord,
    useCriarClinicalRecord,
    useExcluirClinicalRecord,
    useClinicalRecords,
} from "./api/useClinicalRecords";
import { usePets } from "./api/usePets";

const registroVazio = {
    petId: "",
    petNome: "",
    tutorId: "",
    tutorNome: "",
    dataConsulta: "",
    temperatura: "",
    peso: "",
    tratamento: "",
    observacoes: "",
};

export function useProntuario() {
    const [formulario, setFormulario] = useState(registroVazio);
    const [registroEditando, setRegistroEditando] = useState<string | null>(null);
    const [petSelecionado, setPetSelecionado] = useState<Pet | null>(null);
    const [mensagem, setMensagem] = useState("");

    const registrosQuery = useClinicalRecords();
    const petsQuery = usePets();
    const criarRegistro = useCriarClinicalRecord();
    const atualizarRegistro = useAtualizarClinicalRecord();
    const excluirRegistro = useExcluirClinicalRecord();

    const registros = useMemo(() => registrosQuery.data ?? [], [registrosQuery.data]);
    const pets = useMemo(() => petsQuery.data ?? [], [petsQuery.data]);

    function atualizarCampo(campo: keyof typeof registroVazio, valor: string) {
        setFormulario((atual) => ({ ...atual, [campo]: valor }));
        setMensagem("");
    }

    function selecionarPet(pet: Pet) {
        setPetSelecionado(pet);
        setFormulario((atual) => ({
            ...atual,
            petId: pet.id,
            petNome: pet.nome,
            tutorId: pet.tutorId,
        }));
        setMensagem("");
    }

    function iniciarNovoRegistro() {
        setRegistroEditando(null);
        setPetSelecionado(null);
        setFormulario(registroVazio);
        setMensagem("");
    }

    function editarRegistro(registro: RegistroClinico) {
        const pet = pets.find((item) => item.id === registro.petId) ?? null;
        setRegistroEditando(registro.id);
        setPetSelecionado(pet);
        setFormulario({
            petId: registro.petId,
            petNome: registro.petNome,
            tutorId: registro.tutorId,
            tutorNome: registro.tutorNome,
            dataConsulta: registro.dataConsulta ?? "",
            temperatura: registro.temperatura ?? "",
            peso: registro.peso ?? "",
            tratamento: registro.tratamento ?? "",
            observacoes: registro.observacoes ?? "",
        });
        setMensagem("");
    }

    function formatarData(texto: string) {
        let numeros = texto.replace(/\D/g, "");
        if (numeros.length > 8) numeros = numeros.slice(0, 8);
        if (numeros.length > 4) return `${numeros.slice(0, 2)}/${numeros.slice(2, 4)}/${numeros.slice(4)}`;
        if (numeros.length > 2) return `${numeros.slice(0, 2)}/${numeros.slice(2)}`;
        return numeros;
    }

    async function salvarProntuario() {
        if (!formulario.petId || !formulario.dataConsulta || !formulario.tutorNome.trim()) {
            setMensagem("Selecione o pet, informe a data e o nome do tutor.");
            return;
        }

        const dados = {
            ...formulario,
            tutorNome: formulario.tutorNome.trim(),
        };

        try {
            if (registroEditando) {
                const request: ClinicalRecordUpdateRequest = dados;
                await atualizarRegistro.mutateAsync({ id: registroEditando, dados: request });
                setMensagem("Prontuário atualizado com sucesso.");
            } else {
                const request: ClinicalRecordCreateRequest = dados;
                await criarRegistro.mutateAsync(request);
                setMensagem("Prontuário criado com sucesso.");
            }
            iniciarNovoRegistro();
        } catch {
            setMensagem("Não foi possível salvar o prontuário. Verifique a API e tente novamente.");
        }
    }

    async function excluirProntuario(id: string) {
        try {
            await excluirRegistro.mutateAsync(id);
            if (registroEditando === id) iniciarNovoRegistro();
            setMensagem("Prontuário excluído com sucesso.");
        } catch {
            setMensagem("Não foi possível excluir o prontuário. Tente novamente.");
        }
    }

    return {
        formulario,
        registros,
        pets,
        petSelecionado,
        registroEditando,
        mensagem,
        isLoading: registrosQuery.isLoading || petsQuery.isLoading,
        isSaving: criarRegistro.isPending || atualizarRegistro.isPending,
        isDeleting: excluirRegistro.isPending,
        isError: registrosQuery.isError || petsQuery.isError,
        atualizarCampo,
        selecionarPet,
        iniciarNovoRegistro,
        editarRegistro,
        formatarData,
        salvarProntuario,
        excluirProntuario,
    };
}
