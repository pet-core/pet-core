# Sprint 3 — Receitas via API

A funcionalidade de receitas foi migrada para a camada HTTP da aplicação.

## Fluxo do tutor

- `GET /clinical-records?tipoRegistro=receita`
- A lista é filtrada pelo tutor autenticado.
- TanStack Query controla cache, loading, refresh e atualização.

## Fluxo do veterinário

- `GET /users?tipoPerfil=tutor` carrega os tutores.
- `GET /pets?tutorId={id}` carrega os pets do tutor selecionado.
- `POST /clinical-records` envia a receita como registro do tipo `receita`.

## Documento

O backend atual não possui um endpoint de upload de arquivos. Por isso esta etapa **não simula a seleção de um PDF** nem cria um nome de arquivo fictício. A interface recebe uma referência/URL do documento, que deve ser fornecida pelo serviço de arquivos quando esse endpoint existir.

Isso mantém a separação entre a aplicação mobile e a infraestrutura de armazenamento, sem declarar como concluída uma integração que ainda não existe no backend.
