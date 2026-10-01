# Sprint 4 — Notificações

## Escolha: notificação local orientada a eventos da API

O backend .NET do PetCore não possui serviço de push (nenhum endpoint para registrar token de dispositivo nem
envio via FCM/APNs). Por isso usamos **notificações locais** do `expo-notifications`, disparadas quando o app
detecta um evento novo nos dados da API. Isso atende ao requisito "exibida automaticamente durante o uso do app".

## Cenário realista

O veterinário atende o pet e envia algo ao tutor pelo app. O tutor é avisado na hora, mesmo que esteja em outra
tela, e ao tocar cai exatamente no item relevante.

| Evento gerador (real) | Quem gera | Notificação | Destino ao tocar |
| --- | --- | --- | --- |
| `POST /api/Protocolo` | Veterinário, tela **Protocolos** | Novo protocolo para {pet} | `TutorAvisos` (card aberto) |
| `POST /api/Receita` | Veterinário, tela **Receitas** | Nova receita para {pet} | `TutorReceitas` (card aberto) |
| `POST /api/Exame` | Veterinário, tela **Exames** | Exame solicitado para {pet} | `TutorExames` (card aberto) |
| `Pet.comedouroStatus`: `cheio` → `vazio` | Comedouro/backend | O comedouro de {pet} está vazio | `TutorComedouro` (pet aberto) |

O toque tem impacto real no uso: no caso do comedouro o usuário chega com o pet aberto e pode tocar em **Encher**
(`PUT /api/Pet/{id}/patch`); no caso clínico o conteúdo do veterinário já aparece expandido.

## Fluxo

```text
Veterinário envia registro ──► API .NET
                                  │
   (a cada 15 s, app em foco) TanStack Query refetchInterval
                                  ▼
            useTutorNotifications  (hooks/notifications)
                                  ▼
        avaliarNotificacoes  (domain/notifications, função pura)
          compara com o estado salvo em AsyncStorage
                                  ▼
        dispararNotificacaoLocal (services/notifications)
                                  ▼
   Usuário toca ──► useNotificationNavigation ──► resolverDestino ──► tela + item
```

## Organização do código

| Camada | Arquivo | Responsabilidade |
| --- | --- | --- |
| Domínio | `domain/notifications/notificationRules.ts` | Decide **o que** notificar (puro, testável) |
| Domínio | `domain/tutorRecords.ts` | Seletores de registros do tutor (compartilhados com as telas) |
| Serviço | `services/notifications/notificationService.ts` | Permissão, canais Android, disparo |
| Serviço | `services/notifications/notificationStateStorage.ts` | Persiste o que já foi notificado |
| Hook | `hooks/notifications/useTutorNotifications.ts` | Orquestra consulta → regra → disparo |
| Hook | `hooks/notifications/useNotificationNavigation.ts` | Trata o toque (foreground, background e app fechado) |
| Navegação | `navigation/notificationRoutes.ts` | Valida o payload e mapeia tipo → tela |
| Provider | `providers/NotificationsProvider.tsx` | Liga os hooks acima à sessão |

As telas não conhecem `expo-notifications`: apenas recebem um parâmetro de rota opcional (`registroId` / `petId`).

## Regras para não gerar ruído

- **Linha de base:** na primeira vez que um tutor é observado o app só registra o que já existe, sem notificar
  todo o histórico.
- **Sem repetição:** ids já notificados ficam salvos por usuário; reabrir o app não repete notificações, mas
  eventos que ocorreram com o app fechado são notificados na próxima abertura.
- **Comedouro:** notifica apenas na transição `cheio → vazio`, uma vez por esvaziamento.
- **Conta correta:** o payload carrega o `usuarioId`; tocar em notificação de outra conta é ignorado.

## Limitações (conhecidas)

- Com o app **totalmente fechado ou suspenso pelo sistema** não há verificação; a notificação surge quando o app
  volta ao primeiro plano. Notificação com app fechado exige **push**, que depende de o backend enviar mensagens
  (Expo Push/FCM) — evolução futura.
- No **Expo Go**, notificações locais funcionam; push remoto no Android não.
- Na **web** o recurso é desativado.

## Roteiro para o vídeo de demonstração

Use dois dispositivos/emuladores (ou um celular e um emulador): **A = tutor**, **B = veterinário**.

1. **A:** faça login como tutor e aceite a permissão de notificações. Deixe em qualquer tela (ex.: Home).
2. **B:** faça login como veterinário → **Protocolos** → escolha tutor, pet e protocolo → **Enviar**.
   *Mostre na tela de B o evento gerador.*
3. **A:** em até ~15 s aparece o banner "Novo protocolo para {pet}" (foreground). Mostre também com o app em
   segundo plano ao voltar para ele.
4. **A:** toque na notificação → abre **Avisos** com o protocolo expandido.
5. Repita com **Receita** ou **Exame** (opcional).
6. **Comedouro:** com o comedouro de um pet `cheio`, altere-o para `vazio` direto na API (Swagger/Postman, `PUT /api/Pet/{id}/patch` com
   `comedouroStatus: "vazio"`); em até ~15 s A recebe "O comedouro de {pet} está vazio". Toque → **Comedouro** com o pet
   aberto → **Encher**.
7. Feche o app de A, envie outro protocolo por B, reabra A: a notificação chega ao abrir.

Para apresentar mais rápido, reduza `INTERVALO_VERIFICACAO_EVENTOS_MS` em `src/config/notifications.ts`.
