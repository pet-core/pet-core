# Sprint 3 — Comedouro integrado à API

A funcionalidade de Comedouro foi migrada para a camada HTTP da aplicação.

## Fluxo

- Os pets são consultados com `GET /pets?tutorId=...` através de Axios + TanStack Query.
- O usuário autenticado vem do `AuthContext`.
- Ao encher o comedouro, o pet é atualizado com `PUT /pets/:id`.
- A invalidação da query de pets atualiza a interface automaticamente.
- Loading, atualização, erro e tentativa novamente são tratados pela interface.

A funcionalidade não usa mais `getPetsByTutor`, `updatePet` ou dados de `mockData` para alimentar a tela.
