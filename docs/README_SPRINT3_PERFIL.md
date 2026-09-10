# Sprint 3 — Perfil do veterinário via API

A tela **Alterar dados** do veterinário foi migrada para a camada HTTP da aplicação.

## O que mudou

- Perfil atual: `GET /users/me`.
- Atualização: `PATCH /users/me`.
- Especializações: `GET /catalogos/especializacoes`.
- Clínicas: `GET /catalogos/clinicas`.
- Consultas e atualização usam TanStack Query.
- O token da sessão é aplicado automaticamente pelo cliente Axios.
- A sessão persistida é sincronizada após uma atualização bem-sucedida.
- A tela não importa mais `mockData`.

## Contrato esperado

Os endpoints de catálogo são contratos esquemáticos até a disponibilização do backend definitivo. A aplicação mantém os caminhos centralizados em `src/api/routes.ts` para permitir a troca sem colocar URLs diretamente nas telas.
