# Sprint 3 — Autenticação

A autenticação agora possui uma camada própria, independente das telas.

- `AuthProvider` mantém a sessão em memória.
- Token e usuário autenticado são persistidos no AsyncStorage.
- O cliente Axios injeta `Authorization: Bearer <token>` automaticamente.
- Login usa `POST /auth/login`.
- A senha nunca é persistida na sessão.
- O Splash restaura a sessão antes de decidir o perfil inicial.
- Logout limpa token e sessão local.

O contrato do backend continua centralizado em `src/types/api.ts` e `src/api/routes.ts`.
