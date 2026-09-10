# Sprint 3 — Perfil do tutor via API

A tela de Alterar dados do tutor agora utiliza a camada HTTP da aplicação, sem persistir alterações de perfil diretamente no `AsyncStorage`.

## Fluxo

- `GET /users/me` carrega os dados atuais.
- `PATCH /users/me` atualiza nome, e-mail, nascimento, telefone, gênero e, opcionalmente, a nova senha.
- Axios realiza as requisições.
- TanStack Query gerencia cache, carregamento e atualização.
- `AuthContext` sincroniza a sessão local após uma atualização bem-sucedida.
- A senha não é carregada nem armazenada na sessão.

O endpoint `PATCH /users/me` continua sendo um contrato do backend e pode ser ajustado em `src/services/api/userApiService.ts` caso o backend entregue campos diferentes.
