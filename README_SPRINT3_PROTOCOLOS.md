# Sprint 3 — Protocolos via API

A tela de Protocolos do veterinário foi migrada para a camada HTTP da aplicação.

## O que mudou

- Protocolos são carregados por `GET /protocolos`.
- Tutores são carregados por `GET /users?tipoPerfil=tutor`.
- Pets do tutor selecionado são carregados por `GET /pets?tutorId=<id>`.
- O envio de um protocolo cria um registro por `POST /clinical-records`.
- A tela usa Axios através dos serviços da camada `src/services/api`.
- Consultas e mutações são controladas pelo TanStack Query.
- Estados de carregamento e erro são apresentados na interface.
- O `mockData.ts` deixou de ser usado pela tela de Protocolos.

## Contrato esperado do backend

As rotas acima são contratos esquemáticos enquanto o backend do Sprint 3 não estiver disponível. A aplicação não cria dados locais para simular respostas da API.

Quando o backend oficial estiver disponível, eventuais diferenças de caminho ou payload devem ser ajustadas na camada de API, sem colocar HTTP dentro da tela.
