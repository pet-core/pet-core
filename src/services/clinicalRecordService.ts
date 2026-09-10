import type { RegistroClinico } from "../types/models";
import { KEYS, getData, setData } from "./storage";

type ClinicalRecordKey =
    | typeof KEYS.EXAMES_ENVIADOS
    | typeof KEYS.RECEITAS_ENVIADAS
    | typeof KEYS.PROTOCOLOS_ENVIADOS
    | typeof KEYS.HISTORICOS_ENVIADOS
    | typeof KEYS.SOLICITACOES_HISTORICO
    | typeof KEYS.PRONTUARIOS;

export async function getClinicalRecords(key: ClinicalRecordKey): Promise<RegistroClinico[]> {
    return (await getData<RegistroClinico[]>(key)) ?? [];
}

export async function addClinicalRecord(
    key: ClinicalRecordKey,
    record: RegistroClinico,
): Promise<void> {
    const records = await getClinicalRecords(key);
    await setData(key, [...records, record]);
}
