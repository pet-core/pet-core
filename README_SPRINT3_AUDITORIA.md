# Sprint 3 — auditoria de navegação, autenticação e arquitetura

## Navegação

A aplicação utiliza React Navigation (`@react-navigation/native` + native stack), sem Expo Router.
As rotas são declaradas explicitamente em `src/types/navigation.ts` e registradas em
`src/navigation/AppNavigator.tsx`.

Há mais de seis telas distintas e os fluxos são separados entre autenticação, tutor e veterinário.

## Autenticação

O login e o cadastro usam a API por Axios. A sessão autenticada é persistida somente para permitir
restauração entre aberturas do aplicativo. Senha não é persistida no `AsyncStorage`.

O `AppNavigator` expõe somente as rotas compatíveis com o estado de autenticação e o perfil do usuário.

## API e dados

- Axios é o cliente HTTP da aplicação.
- Não existem chamadas `fetch` em `src/`.
- TanStack Query é utilizado nos recursos funcionais integrados à API.
- As telas consomem dados pelos hooks e não acessam diretamente os serviços HTTP.
- Operações de criação, edição e exclusão existentes na interface utilizam mutations da API.
- Após mutations, o cache correspondente é invalidado/refeito para refletir as alterações sem reiniciar o app.

## Arquitetura

```text
Tela (UI)
   ↓
Hook de tela / Hook TanStack Query
   ↓
Serviço de API
   ↓
Cliente Axios
   ↓
Backend
```

`src/services/authStorage.ts` é uma exceção deliberada: ele mantém apenas token e usuário da sessão,
necessários para persistência da autenticação.

## Pendências externas ao aplicativo

Os endpoints reais do backend ainda precisam existir com os contratos esperados pela aplicação.
Onde o backend não oferece upload binário de arquivos, o app mantém apenas referências textuais/URLs,
sem simular upload ou geração falsa de PDF.

## Validação

Foi feita auditoria estática dos diretórios `src/`, incluindo busca por `fetch`, `mockData` e serviços
legados sem consumidores. O `typecheck` depende da instalação das dependências do projeto; no ambiente
de trabalho utilizado durante a migração, a instalação completa do `node_modules` não foi concluída,
portanto isso não deve ser apresentado como um `tsc` executado com sucesso.
