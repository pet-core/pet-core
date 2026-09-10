# Perfil

O perfil é carregado pelo ID do usuário autenticado:

- Tutor: `GET /api/Tutor/{id}`
- Médico: `GET /api/Medico/{id}`

Atualização:

- Tutor: `PUT /api/Tutor/{id}/patch`
- Médico: `PUT /api/Medico/{id}/patch`

As alterações atualizam o cache do TanStack Query e sincronizam a sessão do usuário.

Os catálogos usados no cadastro são derivados das APIs oficiais:

- Clínicas: `GET /api/Clinica`
- Especializações: derivadas de `GET /api/Medico`, quando o campo de especialização estiver disponível.
