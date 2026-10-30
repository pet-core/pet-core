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

A sessão persistida contém somente os dados do usuário e, quando o backend fornecer um token, o token. A senha nunca é armazenada localmente.

Como a documentação recebida não especifica JWT nem outro mecanismo de token, o aplicativo não inventa um token.

## Proteção de rotas

O `AuthContext` controla o estado da sessão e o `AppNavigator` expõe as telas de Tutor ou Médico conforme `tipoPerfil`.
