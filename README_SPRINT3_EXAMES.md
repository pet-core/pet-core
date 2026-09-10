# Sprint 3 — Exames integrados à API

Esta etapa remove a fonte local de dados da funcionalidade de exames.

## Fluxo do tutor

- Lista os registros clínicos via `GET /clinical-records`.
- Exibe somente registros pertencentes ao tutor autenticado e que possuem `tipoExame`.
- A atualização da lista é controlada pelo TanStack Query.

## Fluxo do veterinário

- Tutores são carregados via `GET /users?tipoPerfil=tutor`.
- Pets do tutor selecionado são carregados via `GET /pets?tutorId=:id`.
- Tipos de exame são carregados via `GET /catalogos/exames`.
- Solicitações são criadas via `POST /clinical-records`.
- Loading e erro são apresentados na interface.
- Após o cadastro, o cache de registros clínicos é invalidado automaticamente.

## Contratos esquemáticos

Os caminhos acima permanecem centralizados em `src/api/routes.ts` e podem ser ajustados quando o backend oficial fornecer o contrato definitivo.

> Observação: a seleção do documento ainda utiliza o fluxo visual existente para representar o nome do arquivo. O upload binário do documento depende de um endpoint de arquivos no backend e será integrado separadamente.
