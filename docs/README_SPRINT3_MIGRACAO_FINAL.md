# Migração final de dados locais

A aplicação não utiliza dados mockados para alimentar as telas do Sprint 3.

O acesso aos dados passa pelos serviços HTTP em `src/services/api`, usando Axios e TanStack Query.

A única persistência local é a sessão de autenticação em `AsyncStorage`, sem armazenamento da senha.

## Rotas

O contrato atual está centralizado em `src/api/routes.ts` e documentado em `README_SPRINT3_ROUTES.md`.
