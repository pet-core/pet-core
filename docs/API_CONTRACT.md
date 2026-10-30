# Contrato Mobile ↔ API (.NET)

Fonte única do que o app **envia** e **espera receber**. Qualquer divergência deve ser corrigida aqui e nos DTOs do C# ao mesmo tempo.
Itens marcados com ⚠️ são suposições do mobile que o backend precisa confirmar.

## Configuração
- `EXPO_PUBLIC_API_URL` = host do backend, sem `/api` (as rotas já incluem `/api`). Ver `.env.example`.
- Axios único em `src/api/client.ts`. Header em toda requisição autenticada: `Authorization: Bearer <accessToken>`.
- JWT guardado em `expo-secure-store` (Keychain/Keystore); dados do usuário (sem senha/token) no AsyncStorage.
- `401` em rota autenticada ⇒ sessão encerrada e retorno ao login.

## Login
`POST /api/auth/login`

| Request | Tipo | Observação |
|---|---|---|
| `email` | string | |
| `password` | string | ⚠️ nome do campo de senha |
| `role` | `"tutor"` \| `"medico"` | ⚠️ nome do campo de perfil |

Resposta `200`: `{ "accessToken": "<jwt>", ... }` (também aceito dentro de `{ "data": {...} }`).
O usuário vem do objeto `usuario`/`user` se existir; senão, das claims do JWT (`sub`, `name`, `email`, `role`). ⚠️ confirmar quais claims o C# emite.
Sem perfil informado, o app tenta `tutor` e só tenta `medico` se receber `400/401/403/404`. Erros de rede/5xx não disparam a segunda tentativa.
Credenciais inválidas: `401` (corpo ProblemDetails com `detail`/`title`, lido por `extrairMensagemErro`).

## Envelopes
| Operação | Status | Corpo |
|---|---|---|
| `GET /api/{Recurso}` | 200 | `{ items[], totalCount, page, pageSize, links? }` |
| `GET /api/{Recurso}/{id}` | 200 | `{ data, links? }` |
| `POST /api/{Recurso}` | 201 (ou 200) | `{ data }`; sem corpo ⇒ usa `Location` |
| `PUT /api/{Recurso}/{id}/patch` | 200 `{ data }` ou 204 | em 204 o app faz `GET /{id}` |
| `DELETE /api/{Recurso}/{id}` | 204 (ou 200) | ignorado |

Paginação e HATEOAS (`links`) permanecem no backend; o app lê `items`/`data` e ignora `links`.
Listas: `src/api/paginacao.ts` pede `Page=n&PageSize=100` e segue até `totalCount`. ⚠️ confirmar nomes `Page`/`PageSize` (o ASP.NET ignora maiúsculas/minúsculas, mas o parâmetro de página pode ter outro nome, ex. `PageNumber`).
Filtro usado: `GET /api/Pet?tutorId={id}`. ⚠️ confirmar suporte.

## Divergências de nomes encontradas (decidir de que lado corrigir)
| Fluxo | Mobile envia/lê | Observação |
|---|---|---|
| Cadastro Tutor/Médico (POST) | `nome, dataNascimento (yyyy-MM-dd), telefone, email, sexo (0=F,1=M), senha`, médico: `especialidade` | |
| Atualizar usuário (PUT patch) | `nome, email, telefone, senha, nascimento, genero, especializacao, clinica…` | ⚠️ difere do cadastro (`dataNascimento`/`sexo`/`especialidade`). |
| Ler usuário (GET) | tela lê `nascimento`, `genero`, `especializacao` | ⚠️ se a API devolve `dataNascimento`/`sexo`/`especialidade`, as telas de "Alterar dados" ficam vazias. |
| Pet (POST/PUT) | `dataNasc, sexo (number), pelagem, porte, especie, raca, tutorId` | |
| Pet (leitura nas telas) | `PetDetalhe` lê `pet.nascimento`; `PetCard` compara `pet.sexo === "Macho"` | ⚠️ API envia `dataNasc` e `sexo` numérico. |
| Receita (POST) | `idMedicoResponsavel` obrigatório, `idMedicamentos[]`, `idProntuario` | |
