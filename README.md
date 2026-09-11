# PetCore

Aplicativo mobile para gerenciamento da saúde de pets, desenvolvido com React Native, Expo e TypeScript. O app oferece fluxos diferentes para tutores e veterinários, com autenticação, cadastro de pets e acesso a informações clínicas por meio de uma API .NET.

## Sumário

- [Visão geral](#visão-geral)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração do ambiente](#configuração-do-ambiente)
- [Como executar](#como-executar)
- [Comandos disponíveis](#comandos-disponíveis)
- [Funcionalidades](#funcionalidades)
- [Arquitetura](#arquitetura)
- [Autenticação e API](#autenticação-e-api)
- [Estrutura de pastas](#estrutura-de-pastas)
- [Solução de problemas](#solução-de-problemas)
- [Documentação](#documentação)
- [Equipe](#equipe)

## Visão geral

O PetCore foi criado como projeto acadêmico da disciplina de Mobile Application Development, da FIAP. A aplicação pratica componentização, navegação mobile, gerenciamento de estado, persistência de sessão e integração com uma API HTTP.

Os dados funcionais são obtidos do backend. O `AsyncStorage` é usado somente para manter a sessão autenticada entre aberturas do aplicativo.

## Pré-requisitos

Instale os seguintes recursos antes de começar:

- Node.js 20 ou superior;
- npm;
- Git;
- Expo Go no celular, ou um emulador Android/iOS configurado;
- backend PetCore disponível e acessível pela URL configurada.

Para conferir as versões instaladas:

```bash
node --version
npm --version
```

## Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/pet-core/pet-core
cd pet-core
npm install
```

## Configuração do ambiente

Crie um arquivo `.env` na raiz do projeto. Ele não deve ser commitado, pois pode conter configurações específicas do ambiente:

```env
EXPO_PUBLIC_API_URL=https://petcore-net.onrender.com
```

O Expo disponibiliza variáveis com o prefixo `EXPO_PUBLIC_` para o aplicativo. Depois de alterar o `.env`, reinicie o servidor do Expo para que a nova configuração seja carregada.

´

- **Screens** apresentam as telas e recebem as interações do usuário.
- **Hooks** orquestram estado, navegação e operações da tela.
- **Services/API** encapsulam as chamadas HTTP por recurso.
- **Axios** é o cliente HTTP centralizado.
- **TanStack Query** gerencia consultas, mutações, cache e invalidação.
- **AuthContext** e `authStorage` controlam a sessão persistida.
- **AsyncStorage** não substitui o backend: guarda apenas os dados necessários para restaurar a sessão.

As telas não devem criar instâncias de Axios nem fazer chamadas HTTP diretamente.

## Autenticação e API

O cliente HTTP está em `src/api/client.ts` e as rotas ficam em `src/api/routes.ts`. O token da sessão é enviado automaticamente no header:

```http
Authorization: Bearer <token>
```

Principais endpoints de autenticação:

| Operação | Endpoint |
| --- | --- |
| Login de tutor | `GET /api/Tutor/login` |
| Login de veterinário | `GET /api/Medico/login` |
| Cadastro de tutor | `POST /api/Tutor` |
| Cadastro de veterinário | `POST /api/Medico` |

O fluxo de inicialização restaura a sessão salva. Sem sessão, o usuário permanece no fluxo público; com sessão, a navegação é direcionada conforme `tipoPerfil`. O logout remove a sessão local.

## Estrutura de pastas

```text
App.tsx                 # ponto de entrada e composição dos providers
src/
  api/                  # cliente Axios e rotas HTTP
  components/           # componentes visuais reutilizáveis
  context/              # contexto de autenticação
  data/                 # dados auxiliares
  hooks/                # hooks de tela e orquestração
  hooks/api/            # hooks TanStack Query por recurso
  navigation/           # navegação e rotas protegidas
  providers/            # providers globais, incluindo QueryProvider
  screens/              # telas da aplicação
  services/             # persistência e serviços de domínio
  services/api/         # acesso HTTP por recurso
  types/                # modelos, contratos de API e navegação

scripts/                # scripts auxiliares de migração e organização
assets/                 # ícones, splash e demais recursos visuais
```

## Solução de problemas

### O aplicativo não encontra a API

1. Confirme se `EXPO_PUBLIC_API_URL` existe no `.env`.
2. Verifique se a URL não possui uma barra `/` extra no final.
3. Reinicie o Expo após alterar o `.env`:

```bash
npx expo start --clear
```

4. Confirme se o backend está online e se o dispositivo consegue acessá-lo.

### O QR Code não abre no celular

- Confirme que computador e celular estão na mesma rede;
- tente iniciar com `npx expo start --tunnel`;
- confira se o Expo Go está atualizado.

### Alterações antigas continuam aparecendo

Limpe o cache do Metro:

```bash
npx expo start --clear
```

### O TypeScript apresenta erros

Instale novamente as dependências e rode a verificação:

```bash
npm install
npm run typecheck
```

## Documentação

A documentação técnica da Sprint 3 está em [`docs/`](./docs/):

- [`README_SPRINT3_API.md`](./docs/README_SPRINT3_API.md): contratos e endpoints;
- [`README_SPRINT3_AUTH.md`](./docs/README_SPRINT3_AUTH.md): autenticação e sessão;
- [`README_SPRINT3_HOOKS.md`](./docs/README_SPRINT3_HOOKS.md): hooks e TanStack Query;
- [`README_SPRINT3_ROUTES.md`](./docs/README_SPRINT3_ROUTES.md): rotas e proteção de navegação;
- [`README_SPRINT3_CHECKLIST_FINAL.md`](./docs/README_SPRINT3_CHECKLIST_FINAL.md): checklist final;
- [`README_SPRINT3_AUDITORIA.md`](./docs/README_SPRINT3_AUDITORIA.md): auditoria do projeto.

## Demonstração

[Assista à demonstração do aplicativo no YouTube]().

## Equipe

- **Carolina Nascimento Gonçalves** — RM 564786 — [GitHub](https://github.com/carolnascgoncalves) · [LinkedIn](http://linkedin.com/in/carolina-nascimento-906274364)
- **Emanuelly Ventura do Nascimento** — RM 562339 — [GitHub](https://github.com/Emanuelly0ventura) · [LinkedIn](https://www.linkedin.com/in/emanuelly-ventura-966135355)
- **Julia Sayuri Kina** — RM 564555 — [GitHub](https://github.com/juliakina) · [LinkedIn](https://www.linkedin.com/in/julia-kina)

Turma: **2TDSPJ** · Disciplina: **Mobile Application Development (FIAP)**
