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
```
App.tsx                      -> entry point, monta o NavigationContainer
src/
  navigation/
    AppNavigator.tsx         -> Stack único com todas as telas do app
  screens/
    Auth/                    -> Login, Cadastro
    Common/                  -> Erro
    Tutor/                   -> telas do perfil tutor
    Vet/                     -> telas do perfil veterinário
    SplashScreen.tsx
  hooks/                     -> lógica de cada tela (state, handlers, side-effects), em .ts
  services/
    storage.ts                -> acesso de baixo nível ao armazenamento local
    authStorage.ts            -> operações de autenticação/sessão da etapa local
    userService.ts            -> consultas de usuários/tutores
    petService.ts             -> operações de pets
    clinicalRecordService.ts  -> operações de registros clínicos
  data/
    mockData.ts                -> dados iniciais da etapa local (serão removidos na integração com API)
  types/
    models.ts                  -> tipos de domínio (Usuario, Pet, Clinica, Protocolo...)
    navigation.ts               -> RootStackParamList (tipagem das rotas)
  components/                 -> Header, Footer, PetCard (.tsx)
```
Cada tela segue o padrão **View + Hook**: o arquivo em `src/screens` cuida apenas
da renderização (JSX/estilos) e o hook correspondente em `src/hooks`
concentra estado, chamadas ao AsyncStorage e regras de navegação. Todo o
projeto é escrito em TypeScript; rode `npm run typecheck` para validar os tipos.

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
