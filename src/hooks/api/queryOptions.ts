/** Opções opcionais repassadas pelos hooks de consulta ao TanStack Query. */
export interface OpcoesDeConsulta {
    enabled?: boolean;
    /** Reconsulta periódica em milissegundos (apenas com o app em primeiro plano). */
    refetchInterval?: number | false;
}
