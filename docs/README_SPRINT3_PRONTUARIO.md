# Sprint 3 — CRUD de prontuários

O módulo de prontuários foi conectado à camada HTTP da aplicação.

## Fluxo

`ProntuarioScreen` → `useProntuario` → hooks TanStack Query → `clinicalRecordApiService` → Axios → API.

## Operações disponíveis

- **Create:** criação de prontuário pelo formulário.
- **Read:** listagem dos prontuários retornados pela API.
- **Update:** edição de um prontuário existente.
- **Delete:** exclusão com confirmação na interface.

## Estados

A tela apresenta carregamento durante consultas/mutações e mensagens de erro quando a API não responde corretamente. Após uma mutação, o cache do TanStack Query é invalidado/atualizado para refletir a alteração sem reiniciar o aplicativo.

## Backend

Os caminhos HTTP permanecem centralizados em `src/api/routes.ts`. Como os endpoints oficiais ainda serão fornecidos pelo backend, eventuais diferenças de contrato devem ser ajustadas nessa camada, sem mover chamadas HTTP para as telas.
