# Sprint 3 — Contrato inicial da API

Esta etapa prepara a camada de integração HTTP sem depender dos endpoints de domínio definitivos do backend.

## Camadas

- `src/api/client.ts`: instância única do Axios.
- `src/api/routes.ts`: mapa centralizado das rotas.
- `src/types/api.ts`: contratos de request/response.
- `src/services/api/`: serviços responsáveis pelas chamadas HTTP.
- `src/hooks/`: próxima camada a consumir esses serviços por TanStack Query.
- `src/screens/`: camada de apresentação.

## Rotas esperadas

Autenticação:

- `POST /auth/login`
- `POST /auth/register`
- `GET /auth/me`

Usuário:

- `GET /users/me`

Pets:

- `GET /pets`
- `GET /pets/:id`
- `POST /pets`
- `PUT /pets/:id`
- `DELETE /pets/:id`

Registros clínicos:

- `GET /clinical-records`
- `GET /clinical-records/:id`
- `POST /clinical-records`
- `PUT /clinical-records/:id`
- `DELETE /clinical-records/:id`

> As rotas de domínio são um esquema inicial. Quando o backend fornecer o contrato oficial, os caminhos e os DTOs devem ser conferidos antes da integração final.

## Regra importante

Nenhuma tela deve chamar Axios diretamente. As telas deverão consumir hooks, e os hooks deverão consumir os serviços da API através do TanStack Query.
