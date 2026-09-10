# Sprint 3 — Proteção de rotas

## O que foi implementado

A navegação agora é controlada pelo estado real de autenticação do `AuthContext`.

- Usuário não autenticado: acesso somente a `Login`, `Cadastro` e `Erro`.
- Tutor autenticado: acesso somente às telas `Tutor*`.
- Veterinário autenticado: acesso somente às telas `Vet*`.
- Enquanto a sessão persistida é restaurada, somente a `Splash` é exibida.
- O login não precisa navegar manualmente: a alteração da sessão faz o navegador trocar o conjunto de rotas.
- O logout limpa a sessão e o navegador retorna automaticamente ao conjunto público.
- Os menus de tutor e veterinário usam `AuthContext.logout()` em vez de manipular o armazenamento ou a navegação diretamente.

## Por que esta abordagem

O React Navigation continua sendo responsável pela navegação. O `AppNavigator` decide quais rotas existem com base na sessão e no perfil autenticado, evitando deixar telas de outro perfil expostas para navegação direta.
