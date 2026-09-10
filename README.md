# 🐾 PetCore 🐾
Aplicativo mobile desenvolvido em React Native com Expo para gerenciamento de saúde pet, permitindo cadastro, autenticação local e visualização de informações dos animais.

## 📱 Sobre o projeto
O PetCore foi desenvolvido com foco em aprendizado e prática de desenvolvimento mobile utilizando React Native.

O aplicativo permite que usuários:

- Criem uma conta.
- Façam login.
- Mantenham sessão localmente.
- Visualizem uma lista de pets.
- Naveguem entre telas de forma fluida.
- Armazenem dados localmente no dispositivo.

## 🎯 Objetivo do projeto
Este projeto foi desenvolvido como atividade prática da disciplina de Mobile Application Development - ADS (FIAP), com o objetivo de aplicar conceitos fundamentais do React Native e Expo na construção de um aplicativo funcional.

O projeto atende aos seguintes requisitos propostos:

### Navegação entre telas
- Implementação de navegação utilizando **React Navigation** (Native Stack).
- Estrutura com múltiplas rotas navegáveis, organizadas em fluxo lógico de uso.
- Arquitetura em camadas: Views (`src/screens`) → Hooks de controle (`src/hooks`) → Serviços de dados (`src/services`).

### Estado atual da Sprint 3
A base da Sprint 3 está sendo construída de forma incremental. O primeiro passo é a separação de responsabilidades entre telas, hooks e serviços de dados. A camada de persistência local existente permanece apenas como etapa intermediária até a entrada da API HTTP do backend.

### Formulário com manipulação de estado
- Controle de campos com **useState**.
- Atualização dinâmica dos dados conforme interação do usuário.
- Manipulação de entrada de dados em formulários de cadastro/login.

### Armazenamento local com AsyncStorage
- Persistência local de informações do usuário.
- Recuperação automática dos dados após reinicialização do aplicativo.
- Simulação de manutenção de sessão/autenticação local.

O desenvolvimento deste projeto permitiu praticar conceitos como componentização, gerenciamento de estado, persistência de dados, navegação entre telas e construção de interfaces mobile com React Native.

## 👩‍💻 Equipe
Carolina Nascimento Gonçalves
- RM: 564786
- 2TDSPJ
- [Github](https://github.com/carolnascgoncalves) 
- [Linkedin](http://linkedin.com/in/carolina-nascimento-906274364)

Emanuelly Ventura do Nascimento
- RM: 562339
- 2TDSPJ
- [Github](https://github.com/Emanuelly0ventura) 
- [Linkedin](https://www.linkedin.com/in/emanuelly-ventura-966135355) 

Julia Sayuri Kina
- RM: 564555
- 2TDSPJ
- [Github](https://github.com/juliakina) 
- [Linkedin](https://www.linkedin.com/in/julia-kina) 

## 🚀 Tecnologias utilizadas
Este projeto foi desenvolvido com:
- React Native
- Expo
- React Navigation (Native Stack)
- TypeScript
- AsyncStorage
- React Native Safe Area Context
- Expo Vector Icons

## ⚙️ Funcionalidades
### Autenticação local
Cadastro e login com persistência utilizando AsyncStorage.

### Sessão persistente
Usuário permanece autenticado mesmo após fechar o aplicativo.

### Navegação
Gerenciamento de rotas utilizando React Navigation (Native Stack), em uma pilha única com todas as telas do app.

### Listagem de pets
Visualização de dados dos pets cadastrados.

## 🗂 Estrutura de pastas
```text
App.tsx                      -> entry point e composição dos providers
src/
  api/                       -> cliente Axios e rotas HTTP
  context/                   -> sessão/autenticação da aplicação
  navigation/                -> React Navigation e rotas protegidas por perfil
  screens/                   -> apresentação e interação das telas
  hooks/                     -> estado e regras de apresentação/orquestração
  hooks/api/                 -> hooks TanStack Query dos recursos da API
  services/api/              -> acesso HTTP por recurso
  services/authStorage.ts    -> persistência exclusiva da sessão autenticada
  types/                     -> contratos de domínio, API e navegação
  providers/                 -> configuração global do TanStack Query
  components/                -> componentes visuais reutilizáveis
```

A arquitetura separa **UI, lógica de tela, dados e infraestrutura**. As telas não fazem
requisições HTTP diretamente: os hooks orquestram o estado e os serviços em
`src/services/api` encapsulam o acesso ao backend. Axios é o único cliente HTTP e
TanStack Query gerencia consultas, mutações, cache, invalidação e estados de carregamento.

O `AsyncStorage` é utilizado somente para manter a sessão autenticada entre aberturas
do aplicativo. Dados funcionais de pets, usuários, prontuários, exames, receitas,
protocolos, avisos e relatórios são obtidos pela API. Não há dados de `mockData` em uso.

## 🔐 Autenticação e navegação

- `GET /api/Tutor/login` e `GET /api/Medico/login` realizam o login real.
- `POST /api/Tutor` e `POST /api/Medico` realizam o cadastro real.
- O token é enviado automaticamente como `Authorization: Bearer ...` pelo cliente Axios.
- A sessão é restaurada ao iniciar o aplicativo.
- Rotas públicas ficam disponíveis somente sem sessão.
- Rotas de tutor e veterinário são expostas conforme `tipoPerfil`.
- Logout remove a sessão persistida e retorna ao fluxo público.

## 🌐 API

Configure a URL do backend em `.env`:

```env
EXPO_PUBLIC_API_URL=https://seu-backend.exemplo.com
```

Os contratos e endpoints esperados estão documentados em `docs/README_SPRINT3_API.md`.

### Documentação

A documentação específica do Sprint 3 está centralizada em [`docs/`](./docs/), mantendo a raiz do projeto mais limpa.

Principais documentos:

- [`CHECKLIST_FINAL`](./docs/README_SPRINT3_CHECKLIST_FINAL.md) — conferência dos requisitos do Sprint 3.
- [`AUDITORIA`](./docs/README_SPRINT3_AUDITORIA.md) — auditoria de arquitetura, navegação e autenticação.
- [`API`](./docs/README_SPRINT3_API.md) — contratos e endpoints esperados.
- [`AUTH`](./docs/README_SPRINT3_AUTH.md) — autenticação e sessão.
- [`HOOKS`](./docs/README_SPRINT3_HOOKS.md) — integração com TanStack Query.
- [`ROUTES`](./docs/README_SPRINT3_ROUTES.md) — rotas e proteção de navegação.

Quando o backend definitivo estiver disponível, seus contratos devem substituir os
contratos esquemáticos sem reintroduzir dados simulados na interface.

## 🛠 Dependências principais
- npx expo install @react-navigation/native @react-navigation/native-stack
- npx expo install react-native-gesture-handler
- npx expo install @react-native-async-storage/async-storage
- npx expo install react-native-safe-area-context
- npx expo install @expo/vector-icons

## 🔗 Demonstração
Confira a demonstração completa do aplicativo no YouTube!  
➡️[Clique aqui para assistir!](https://youtu.be/1PPfa7IKF1M)
> Neste vídeo é possível visualizar o fluxo completo da aplicação, incluindo cadastro, login, persistência de sessão e navegação entre telas.

## 📬 Contato
Caso tenha dúvidas, sugestões ou interesse em conhecer mais sobre o projeto, ficamos à disposição para conversar. Você pode entrar em contato com qualquer uma da nossa equipe:
- [Carolina Nascimento Gonçalves](http://linkedin.com/in/carolina-nascimento-906274364)
- [Emanuelly Ventura do Nascimento](https://www.linkedin.com/in/emanuelly-ventura-966135355) 
- [Julia Sayuri Kina](https://www.linkedin.com/in/julia-kina)
## Infraestrutura HTTP e cache

A aplicação possui um cliente Axios centralizado em `src/api/client.ts` e o TanStack Query configurado em `src/providers/QueryProvider.tsx`.

A URL do backend será informada quando os endpoints estiverem disponíveis:

```bash
EXPO_PUBLIC_API_URL=https://sua-api.example.com
```

As telas não devem criar instâncias de Axios nem realizar chamadas HTTP diretamente. As requisições futuras serão encapsuladas nos serviços e consumidas por hooks do TanStack Query.
