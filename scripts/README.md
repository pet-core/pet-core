# Script de migração — Expo Router → React Navigation

Este script foi usado para gerar a estrutura atual de `src/screens` e `src/hooks`
a partir do `app/` antigo (baseado em expo-router). Ele:

1. Lê cada tela em `app/**/*.jsx`.
2. Separa automaticamente lógica (state, `useEffect`, handlers) de
   renderização (JSX), usando `lib/splitComponent.js`.
3. Converte `router.push/replace/back` e `useLocalSearchParams` para
   as APIs equivalentes do React Navigation, usando o mapa de rotas em
   `lib/routeManifest.js`.
4. Gera um hook (`src/hooks/useX.js`) com a lógica e uma tela
   (`src/screens/Grupo/XScreen.jsx`) com a renderização, dividindo os
   imports originais entre os dois arquivos conforme o uso de cada um.

## Uso

```bash
node scripts/migrate.js <pasta-do-projeto-antigo> <pasta-de-saida>
```

O script é idempotente: pode ser rodado de novo a qualquer momento a partir
do projeto original em expo-router, ele sempre regenera a saída do zero.

Arquivos que não seguem o padrão "state/handlers + return JSX" (Header,
Splash, Erro, navegação, entry point, package.json, app.json) foram
ajustados manualmente após a geração automática — o script cobre as 20
telas de conteúdo (Login, Cadastro, Tutor/* e Vet/*).
