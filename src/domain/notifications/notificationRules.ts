import type { Pet, RegistroClinico, StatusComedouro } from "../../types/models";
import type {
    EstadoNotificacoes,
    NotificacaoLocal,
    TipoRegistroNotificavel,
} from "../../types/notifications";

export interface SnapshotTutor {
    usuarioId: string;
    protocolos: RegistroClinico[];
    exames: RegistroClinico[];
    receitas: RegistroClinico[];
    pets: Pet[];
}

export interface ResultadoAvaliacao {
    notificacoes: NotificacaoLocal[];
    estado: EstadoNotificacoes;
}

const TIPOS_REGISTRO: TipoRegistroNotificavel[] = ["protocolo", "receita", "exame"];

export function avaliarNotificacoes(
    snapshot: SnapshotTutor,
    estadoAnterior: EstadoNotificacoes | null,
): ResultadoAvaliacao {
    const registrosPorTipo = {
        protocolo: snapshot.protocolos,
        receita: snapshot.receitas,
        exame: snapshot.exames,
    } satisfies Record<TipoRegistroNotificavel, RegistroClinico[]>;

    const notificacoes: NotificacaoLocal[] = [];
    const idsVistos = criarIdsVistosVazios();

    for (const tipo of TIPOS_REGISTRO) {
        const anteriores = new Set(estadoAnterior?.idsVistos[tipo] ?? []);
        const atuais = registrosPorTipo[tipo];

        if (estadoAnterior) {
            for (const registro of atuais) {
                if (!anteriores.has(registro.id)) {
                    notificacoes.push(notificacaoDeRegistro(tipo, registro, snapshot.usuarioId));
                }
            }
        }

        idsVistos[tipo] = Array.from(new Set([...anteriores, ...atuais.map((registro) => registro.id)]));
    }

    const comedouros: Record<string, StatusComedouro> = { ...(estadoAnterior?.comedouros ?? {}) };

    for (const pet of snapshot.pets) {
        const statusAnterior = estadoAnterior?.comedouros[pet.id];
        if (statusAnterior === "cheio" && pet.comedouroStatus === "vazio") {
            notificacoes.push(notificacaoDeComedouroVazio(pet, snapshot.usuarioId));
        }
        comedouros[pet.id] = pet.comedouroStatus;
    }

    return { notificacoes, estado: { idsVistos, comedouros } };
}

function criarIdsVistosVazios(): Record<TipoRegistroNotificavel, string[]> {
    return { protocolo: [], receita: [], exame: [] };
}

function notificacaoDeRegistro(
    tipo: TipoRegistroNotificavel,
    registro: RegistroClinico,
    usuarioId: string,
): NotificacaoLocal {
    const pet = registro.petNome || "seu pet";
    const vet = registro.veterinarioNome ? `Dr(a). ${registro.veterinarioNome}` : "Seu veterinário";

    const textos: Record<TipoRegistroNotificavel, { titulo: string; corpo: string }> = {
        protocolo: {
            titulo: `Novo protocolo para ${pet}`,
            corpo: `${vet} enviou: ${registro.titulo || "protocolo de cuidados"}. Toque para ler.`,
        },
        receita: {
            titulo: `Nova receita para ${pet}`,
            corpo: `${vet} enviou uma receita. Toque para ver os detalhes.`,
        },
        exame: {
            titulo: `Exame solicitado para ${pet}`,
            corpo: `${vet} solicitou ${registro.tipoExame || "um exame"}. Toque para ver o pedido.`,
        },
    };

    return {
        ...textos[tipo],
        canal: "avisos-clinicos",
        payload: { tipo, usuarioId, registroId: registro.id, petId: registro.petId },
    };
}

function notificacaoDeComedouroVazio(pet: Pet, usuarioId: string): NotificacaoLocal {
    return {
        titulo: `O comedouro de ${pet.nome} está vazio`,
        corpo: "Toque para abrir o comedouro e enchê-lo agora.",
        canal: "comedouro",
        payload: { tipo: "comedouro", usuarioId, petId: pet.id },
    };
}
