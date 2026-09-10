# Sprint 3 — Histórico integrado à API

A tela de Histórico do Pet foi migrada do armazenamento local para a camada HTTP da aplicação.

## Fluxo

- Pets do tutor: `GET /pets?tutorId=:id`.
- Históricos recebidos: `GET /clinical-records`, filtrando `tipoRegistro = historico` e o tutor autenticado.
- Solicitação de histórico: `POST /clinical-records` com `tipoRegistro = solicitacao_historico`.
- Atualização manual usa `refetch` do TanStack Query.
- A sessão do tutor é obtida pelo `AuthContext`; não há leitura de usuário por `AsyncStorage` na funcionalidade.

## Observação

O endpoint de documentos/arquivos ainda depende do contrato definitivo do backend. A tela não simula download ou upload de PDF.
