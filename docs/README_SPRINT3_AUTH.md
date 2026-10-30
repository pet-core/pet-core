# Autenticação — Sprint 3

A autenticação é feita contra o backend real.

## Login

O app usa o endpoint unificado com especificação de role:

- `POST /api/auth/login`

Payload:
```json
{
  "email": "usuario@exemplo.com",
  "password": "senha",
  "role": "tutor"
}
```

O fluxo tenta Tutor (`role: "tutor"`) primeiro e Médico (`role: "medico"`) em seguida quando a role não for especificada previamente.

## Cadastro

- Tutor: `POST /api/Tutor`
- Médico veterinário: `POST /api/Medico`

## Sessão

O backend devolve `accessToken` (JWT). O app o guarda em `expo-secure-store` e o envia em `Authorization: Bearer`. Os dados do usuário (sem senha e sem token) ficam no AsyncStorage. Um `401` em rota autenticada encerra a sessão. Detalhes e pontos a confirmar: `API_CONTRACT.md`.

## Proteção de rotas

O `AuthContext` controla o estado da sessão e o `AppNavigator` expõe as telas de Tutor ou Médico conforme `tipoPerfil`.
