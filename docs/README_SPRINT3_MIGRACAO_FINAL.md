# Sprint 3 — remoção do armazenamento legado

## O que foi alterado

- A tela de cadastro passou a consumir as listas de especializações e clínicas pela API usando Axios + TanStack Query.
- Os dados de catálogo não são mais importados de `src/data/mockData.ts`.
- Os serviços legados de armazenamento de usuários/pets/registros clínicos foram removidos porque não possuem mais consumidores no fluxo atual da aplicação.
- O `AsyncStorage` continua sendo utilizado somente pelo `authStorage`, exclusivamente para persistência da sessão autenticada.

## Estado da migração

Os dados funcionais migrados no Sprint 3 devem ser obtidos pela camada de API. O armazenamento local restante é deliberadamente limitado à persistência do token e do usuário da sessão.

## Contratos de catálogo utilizados

- `GET /catalogos/especializacoes`
- `GET /catalogos/clinicas`

Esses endpoints continuam esquemáticos até que o backend oficial forneça os contratos definitivos.
