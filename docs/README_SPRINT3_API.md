# API — Sprint 3

O mobile usa **Axios** como único cliente HTTP e **TanStack Query** para consultas e mutações.

A URL configurada em `EXPO_PUBLIC_API_URL` deve apontar para o host do backend. As rotas incluem o prefixo `/api` conforme a documentação oficial do PetCore-.NET.

## Autenticação

- Tutor: `GET /api/Tutor/login?email={email}&senha={senha}`
- Médico veterinário: `GET /api/Medico/login?email={email}&senha={senha}`
- Cadastro de tutor: `POST /api/Tutor`
- Cadastro de médico: `POST /api/Medico`

O aplicativo tenta os dois endpoints de login porque a documentação não informa um endpoint único para descobrir o perfil antes da autenticação.

## Recursos utilizados pelo app

- Pets: `/api/Pet`
- Prontuários: `/api/Prontuario`
- Exames: `/api/Exame`
- Histórico: `/api/Historico`
- Receitas: `/api/Receita`
- Relatórios: `/api/Relatorio`
- Protocolos: `/api/Protocolo`
- Tutores: `/api/Tutor`
- Médicos: `/api/Medico`
- Clínicas: `/api/Clinica`

Os métodos suportados por cada recurso estão documentados em `README_SPRINT3_ROUTES.md`.

## Arquitetura

```text
Screen
  ↓
Hook
  ↓
Service API
  ↓
Axios
  ↓
Backend .NET
```

As telas não fazem chamadas HTTP diretamente.
