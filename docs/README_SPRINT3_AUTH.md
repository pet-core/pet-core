# Autenticação — Sprint 3

A autenticação é feita contra o backend real.

## Login

O app usa:

- `GET /api/Tutor/login?email={email}&senha={senha}`
- `GET /api/Medico/login?email={email}&senha={senha}`

O fluxo tenta Tutor primeiro e Médico veterinário em seguida. Não existe endpoint de login único na documentação recebida.

## Cadastro

- Tutor: `POST /api/Tutor`
- Médico veterinário: `POST /api/Medico`

## Sessão

A sessão persistida contém somente os dados do usuário e, quando o backend fornecer um token, o token. A senha nunca é armazenada localmente.

Como a documentação recebida não especifica JWT nem outro mecanismo de token, o aplicativo não inventa um token.

## Proteção de rotas

O `AuthContext` controla o estado da sessão e o `AppNavigator` expõe as telas de Tutor ou Médico conforme `tipoPerfil`.
