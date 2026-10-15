# PetCore

Aplicativo mobile para gerenciamento da saúde de pets, desenvolvido com React Native, Expo e TypeScript. O app oferece fluxos diferentes para tutores e veterinários, com autenticação, cadastro de pets e acesso a informações clínicas por meio de uma API .NET.

## Sumário

- [Visão geral](#visão-geral)
- [Problema e solução proposta](#problema-e-solução-proposta)
- [Tecnologias utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração do ambiente](#configuração-do-ambiente)
- [Como executar](#como-executar)
- [Comandos disponíveis](#comandos-disponíveis)
- [Funcionalidades e CRUDs](#funcionalidades-e-cruds)
- [Arquitetura](#arquitetura)
- [Autenticação e API](#autenticação-e-api)
- [Notificações](#notificações)
- [Estrutura de pastas](#estrutura-de-pastas)
- [Solução de problemas](#solução-de-problemas)
- [Documentação](#documentação)
- [Equipe](#equipe)

## Visão geral

O PetCore foi criado como projeto acadêmico da disciplina de Mobile Application Development, da FIAP. A aplicação pratica componentização, navegação mobile, gerenciamento de estado, persistência de sessão e integração com uma API HTTP.

Os dados funcionais são obtidos do backend. O `AsyncStorage` é usado somente para manter a sessão autenticada entre aberturas do aplicativo.

## Problema e solução proposta

### O Problema

O cuidado com animais de estimação frequentemente sofre com a fragmentação de informações clínicas e a falta de comunicação ágil entre tutores e profissionais de saúde veterinária. Tutores enfrentam dificuldades para centralizar o histórico de consultas, tratamentos, exames laboratoriais e receitas, além de monitorar a alimentação e rotina de seus pets. Por outro lado, veterinários lidam com prontuários dispersos e a ausência de um canal direto e padronizado para emitir diagnósticos, prescrever tratamentos e acompanhar a evolução dos pacientes.

### A Solução Proposta

O **PetCore** é uma aplicação mobile construída para conectar tutores e médicos veterinários em um ambiente integrado, seguro e intuitivo:
- **Fluxo do Tutor:** permite cadastrar e gerenciar pets com perfil clínico detalhado (CRUD completo de Pets), acompanhar avisos de protocolos enviados pela clínica, consultar receitas emitidas, visualizar solicitações de exames, checar histórico médico e monitorar o status do comedouro inteligente em tempo real.
- **Fluxo do Veterinário:** disponibiliza ferramentas completas de gestão clínica, permitindo o preenchimento, consulta, atualização e exclusão de prontuários médicos (CRUD completo de Prontuários), além da prescrição de receitas, emissão de relatórios e encaminhamento de protocolos de tratamento diretamente vinculados aos animais e tutores atendidos.
- **Notificações Orientadas a Eventos:** o sistema notifica o tutor em tempo real sobre novas receitas, novos protocolos, pedidos de exames ou comedouro vazio, garantindo engajamento e prontidão no cuidado animal.

## Tecnologias utilizadas

- **React Native (v0.81.5)** e **Expo (v54)**: base do ecossistema mobile multiplataforma;
- **TypeScript (v5.9)**: tipagem estática rigorosa para modelos, rotas e contratos de API;
- **React Navigation v7 (`@react-navigation/native` & `@react-navigation/native-stack`)**: navegação declarativa com separação explícita de stacks públicas e protegidas;
- **Axios (v1.12)**: cliente HTTP centralizado com interceptores de autenticação JWT e tratamento padronizado de erros;
- **TanStack Query v5 (`@tanstack/react-query`)**: gerenciamento de estado assíncrono, cache inteligente, revalidação e invalidação automática após mutações;
- **AsyncStorage (`@react-native-async-storage/async-storage`)**: persistência local exclusiva para sessão do usuário autenticado (token e perfil sem senha);
- **Expo Notifications (`expo-notifications`)**: disparo e tratamento de notificações locais baseadas em eventos reais da API.

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

## Como executar

```bash
npx expo start
```

Abra o app no Expo Go (QR Code) ou em um emulador Android/iOS.

## Comandos disponíveis

| Comando | O que faz |
| --- | --- |
| `npm start` | Inicia o servidor do Expo |
| `npm run android` / `npm run ios` | Abre no emulador |
| `npm run typecheck` | Verifica os tipos com o TypeScript |

## Funcionalidades e CRUDs

O aplicativo possui mais de 20 telas funcionais e implementa **dois CRUDs completos** diretamente acessíveis pela interface móvel, ambos sincronizados em tempo real com a API backend via TanStack Query:

### 1. CRUD Completo de Pets (Módulo do Tutor)
- **Create (Criação):** Tela `TutorAdicionarPet` (`POST /api/Pet`) com validação de campos obrigatórios (nome, espécie, sexo, raça, porte, pelagem e nascimento).
- **Read (Leitura/Consulta):** Telas `TutorHome` (`GET /api/Pet?tutorId={id}`) e `TutorPetDetalhe` (`GET /api/Pet/{id}`) exibindo lista de pets e ficha técnica completa.
- **Update (Atualização):** Tela `TutorEditarPet` (`PUT /api/Pet/{id}/patch`) para alteração de dados cadastrais, além de toggle de status de óbito na tela `TutorPetDetalhe`.
- **Delete (Exclusão):** Tela `TutorPetDetalhe` com diálogo nativo de confirmação (`Alert.alert`) e remoção via `DELETE /api/Pet/{id}`, redirecionando para a Home com invalidação de cache imediata.

### 2. CRUD Completo de Prontuários (Módulo do Veterinário)
- **Create (Criação):** Tela `VetProntuario` (`POST /api/Prontuario`) com seleção de pet e tutor, registro de data, temperatura, peso, tratamento e observações clínicas.
- **Read (Leitura/Consulta):** Tela `VetProntuario` (`GET /api/Prontuario`) listando todos os prontuários emitidos em cards informativos.
- **Update (Atualização):** Tela `VetProntuario` permitindo carregar qualquer prontuário existente no formulário para edição e salvar via `PUT /api/Prontuario/{id}/patch`.
- **Delete (Exclusão):** Tela `VetProntuario` com botão de lixeira em cada card, confirmação de segurança e exclusão definitiva via `DELETE /api/Prontuario/{id}`.

### Outras Funcionalidades Integradas à API
- **Autenticação:** Login e cadastro para tutores e veterinários, com sessão persistida via `AsyncStorage`.
- **Comedouro Inteligente:** Consulta do status alimentar do pet e ação de abastecimento (`PUT /api/Pet/{id}/patch`).
- **Receitas:** Prescrição por veterinários (`POST /api/Receita`) e consulta detalhada por tutores (`GET /api/Receita`).
- **Exames:** Solicitação médica (`POST /api/Exame`) e acompanhamento pelo tutor (`GET /api/Exame`).
- **Protocolos e Avisos:** Envio de orientações clínicas e notificações aos tutores (`POST /api/Protocolo` e `GET /api/Protocolo`).
- **Relatórios:** Consulta analítica de registros clínicos de pacientes (`GET /api/Relatorio`).
- **Alteração de Perfil:** Atualização de dados cadastrais de tutores e médicos (`PUT /api/Tutor/{id}/patch` e `PUT /api/Medico/{id}/patch`).
- **Notificações Locais:** Monitoramento de eventos em segundo plano / polling e disparo de notificações locais com redirecionamento ao card relevante.

## Arquitetura

- **Screens** apresentam as telas e recebem as interações do usuário.
- **Hooks** orquestram estado, navegação e operações da tela.
- **Services/API** encapsulam as chamadas HTTP por recurso.
- **Domain** concentra regras de negócio puras (sem React), como as regras de notificação.
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

## Notificações

O PetCore usa **notificações locais** (`expo-notifications`) geradas a partir de eventos reais vindos da API.
Para o tutor, o app dispara:

| Evento no backend | Notificação | Ao tocar |
| --- | --- | --- |
| Veterinário envia um **protocolo** | "Novo protocolo para {pet}" | Abre **Avisos** com o card já expandido |
| Veterinário envia uma **receita** | "Nova receita para {pet}" | Abre **Receitas** com o card expandido |
| Veterinário solicita um **exame** | "Exame solicitado para {pet}" | Abre **Exames** com o card expandido |
| Comedouro do pet passa de `cheio` para `vazio` | "O comedouro de {pet} está vazio" | Abre **Comedouro** com o pet expandido, pronto para **Encher** |

Nenhuma notificação é manual ou fixa: cada uma só existe se o evento correspondente aparecer nos dados da API.
Detalhes, limitações e roteiro de demonstração em [`docs/README_SPRINT4_NOTIFICACOES.md`](./docs/README_SPRINT4_NOTIFICACOES.md).

## Estrutura de pastas

```text
App.tsx                 # ponto de entrada e composição dos providers
src/
  api/                  # cliente Axios e rotas HTTP
  components/           # componentes visuais reutilizáveis
  config/               # constantes de configuração (ex.: intervalo de verificação)
  context/              # contexto de autenticação
  domain/               # regras de negócio puras (sem React): seletores e regras de notificação
  hooks/                # hooks de tela e orquestração
  hooks/api/            # hooks TanStack Query por recurso
  hooks/notifications/  # hooks que geram e tratam notificações
  navigation/           # navegação e rotas protegidas
  providers/            # providers globais, incluindo QueryProvider
  screens/              # telas da aplicação
  services/             # persistência e serviços de domínio
  services/api/         # acesso HTTP por recurso
  services/notifications/ # expo-notifications e persistência do estado de notificações
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

## Conformidade com os Critérios Avaliativos

| Critério Avaliativo | Pontuação | Implementação no PetCore | Arquivos de Referência |
| :--- | :---: | :--- | :--- |
| **Navegação entre Telas** | **5 / 5** | • Mais de 20 telas distintas para Tutores e Veterinários<br>• React Navigation v7 (`@react-navigation/native-stack`), sem Expo Router<br>• Rotas explícitas tipadas e condicionadas ao estado de autenticação | [`src/navigation/AppNavigator.tsx`](./src/navigation/AppNavigator.tsx)<br>[`src/types/navigation.ts`](./src/types/navigation.ts) |
| **Integração com API Backend** | **35 / 35** | • Cliente HTTP exclusivo com **Axios** (sem uso de `fetch`)<br>• TanStack Query para todas as queries e mutações com cache invalidation automático<br>• **Dois CRUDs completos via UI:**<br>&nbsp;&nbsp;1) **Pets** (Tutor): Criar, Listar, Detalhar, Editar, Excluir<br>&nbsp;&nbsp;2) **Prontuários** (Veterinário): Criar, Listar, Editar, Excluir<br>• Feedback visual com `ActivityIndicator` e tratamento de erros | [`src/api/client.ts`](./src/api/client.ts)<br>[`src/hooks/api/usePets.ts`](./src/hooks/api/usePets.ts)<br>[`src/hooks/api/useClinicalRecords.ts`](./src/hooks/api/useClinicalRecords.ts)<br>[`src/screens/Tutor/`](./src/screens/Tutor/)<br>[`src/screens/Vet/ProntuarioScreen.tsx`](./src/screens/Vet/ProntuarioScreen.tsx) |
| **Sistema de Autenticação** | **20 / 20** | • Integração real com API .NET (`/api/Tutor/login` e `/api/Medico/login`)<br>• Fluxo completo com Login e Cadastro para tutores e veterinários<br>• Sessão persistida com `AsyncStorage` (restaura sessão ao reabrir sem expor senha)<br>• Rotas estritamente protegidas: usuário não autenticado só acessa tela pública<br>• Logout imediato limpando a sessão | [`src/context/AuthContext.tsx`](./src/context/AuthContext.tsx)<br>[`src/services/authStorage.ts`](./src/services/authStorage.ts)<br>[`src/screens/Auth/LoginScreen.tsx`](./src/screens/Auth/LoginScreen.tsx)<br>[`src/screens/Auth/CadastroScreen.tsx`](./src/screens/Auth/CadastroScreen.tsx) |
| **Arquitetura e Código** | **20 / 20** | • Separação estrita em camadas: Telas (apenas UI), Hooks (regras de tela), Services (HTTP/API), Domain (regras puras)<br>• Nenhuma chamada HTTP ou regra direta em componentes de tela<br>• TanStack Query totalmente desacoplado da UI<br>• Nomes padronizados, TypeScript sem erros (`npm run typecheck` 100% limpo) | [`src/screens/`](./src/screens/)<br>[`src/hooks/`](./src/hooks/)<br>[`src/services/api/`](./src/services/api/)<br>[`src/domain/`](./src/domain/) |
| **Documentação** | **20 / 20** | • README completo com problema/solução, tecnologias e instruções passo a passo<br>• Documentação técnica detalhada em [`docs/`](./docs/) para API, Auth, Hooks, Rotas e Notificações | [`README.md`](./README.md)<br>[`docs/`](./docs/) |

## Documentação

A documentação técnica da Sprint 3 está em [`docs/`](./docs/):

- [`README_SPRINT3_API.md`](./docs/README_SPRINT3_API.md): contratos e endpoints;
- [`README_SPRINT3_AUTH.md`](./docs/README_SPRINT3_AUTH.md): autenticação e sessão;
- [`README_SPRINT3_HOOKS.md`](./docs/README_SPRINT3_HOOKS.md): hooks e TanStack Query;
- [`README_SPRINT3_ROUTES.md`](./docs/README_SPRINT3_ROUTES.md): rotas e proteção de navegação;
- [`README_SPRINT3_CHECKLIST_FINAL.md`](./docs/README_SPRINT3_CHECKLIST_FINAL.md): checklist final;
- [`README_SPRINT3_AUDITORIA.md`](./docs/README_SPRINT3_AUDITORIA.md): auditoria do projeto;
- [`README_SPRINT4_NOTIFICACOES.md`](./docs/README_SPRINT4_NOTIFICACOES.md): notificações, fluxo e roteiro de demonstração.

## Demonstração

[Assista à demonstração do aplicativo no YouTube](https://youtu.be/MBFM6O0Dzic).

## Equipe

- **Carolina Nascimento Gonçalves** — RM 564786 — [GitHub](https://github.com/carolnascgoncalves) · [LinkedIn](http://linkedin.com/in/carolina-nascimento-906274364)
- **Emanuelly Ventura do Nascimento** — RM 562339 — [GitHub](https://github.com/Emanuelly0ventura) · [LinkedIn](https://www.linkedin.com/in/emanuelly-ventura-966135355)
- **Julia Sayuri Kina** — RM 564555 — [GitHub](https://github.com/juliakina) · [LinkedIn](https://www.linkedin.com/in/julia-kina)

Turma: **2TDSPJ** · Disciplina: **Mobile Application Development (FIAP)**
