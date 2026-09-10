# Sprint 3 — Relatórios via API

A funcionalidade de relatórios do veterinário foi migrada para a camada HTTP da aplicação.

## Fluxo

- Tutores: `GET /users?tipoPerfil=tutor`
- Pets do tutor: `GET /pets?tutorId={id}`
- Prontuários: `GET /clinical-records`
- Envio do relatório/histórico: `POST /clinical-records`

A tela utiliza TanStack Query para consultas, cache, loading, erro e invalidação após o envio.

A geração/upload binário de PDF não é simulada: o backend ainda precisa fornecer um endpoint específico para arquivos caso essa etapa seja exigida no contrato definitivo.
