# Sprint 3 — Avisos via API

A funcionalidade de Avisos do tutor foi migrada para a camada HTTP da aplicação.

## Fluxo

- A tela consulta `GET /clinical-records` através do Axios e TanStack Query.
- São exibidos somente registros com `tipoRegistro = protocolo` pertencentes ao tutor autenticado.
- A lista é atualizada com pull-to-refresh e pelo cache do TanStack Query.
- O envio de protocolos pelo veterinário agora grava `tipoRegistro = protocolo`, permitindo que o backend e o cliente diferenciem esse registro de exames, receitas e outros documentos.
- `AsyncStorage`, `storage.ts` e `mockData` não são utilizados pela tela de Avisos.

## Contrato esperado

`GET /clinical-records`

Os registros de protocolo devem possuir, no mínimo, `id`, `tutorId`, `petId`, `petNome`, `tutorNome`, `veterinarioNome`, `tipoRegistro`, `titulo`, `texto` e `dataEnvio`.
