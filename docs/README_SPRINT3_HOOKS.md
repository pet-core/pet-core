# Sprint 3 — Hooks com TanStack Query

A camada `src/hooks/api` concentra os hooks responsáveis pelo ciclo de dados da API.

## Padrão

```text
Tela/Componente
      ↓
Custom Hook
      ↓
TanStack Query
      ↓
Service HTTP
      ↓
Axios
      ↓
Backend
```

## Funcionalidades preparadas

### Pets

- `usePets`: consulta a lista.
- `usePet`: consulta um pet por ID.
- `useCriarPet`: cria um pet.
- `useAtualizarPet`: atualiza um pet.
- `useExcluirPet`: exclui um pet.

### Registros clínicos

- `useClinicalRecords`: consulta a lista.
- `useClinicalRecord`: consulta um registro por ID.
- `useCriarClinicalRecord`: cria um registro.
- `useAtualizarClinicalRecord`: atualiza um registro.
- `useExcluirClinicalRecord`: exclui um registro.

## Atualização automática

As mutações atualizam o cache do item alterado e invalidam a consulta de lista correspondente. Assim, quando a interface estiver conectada a esses hooks, uma alteração feita pelo usuário será refletida sem reiniciar o aplicativo.

Os hooks não criam dados locais e não utilizam `fetch`.
