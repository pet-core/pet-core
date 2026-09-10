# Checklist Final — Sprint 3

## 1. Navegação — 5 pts
- [x] React Navigation utilizado.
- [x] Expo Router não utilizado.
- [x] Mais de 6 telas distintas.
- [x] Rotas explícitas no `AppNavigator`.
- [x] Rotas condicionadas à sessão e ao perfil.

## 2. HTTP API — 35 pts
- [x] Axios utilizado como cliente HTTP.
- [x] `fetch` não utilizado.
- [x] TanStack Query utilizado para os recursos API.
- [x] Dados das funcionalidades migradas vêm da API.
- [x] Pets possuem listar, criar, editar e excluir pela interface.
- [x] Registros clínicos possuem listar, criar, editar e excluir pela interface.
- [x] Recursos adicionais foram integrados à API conforme seus contratos.
- [x] Estados de carregamento e erro tratados.
- [x] Atualizações invalidam/refazem queries quando necessário.
- [ ] Contratos finais dependem da disponibilidade/compatibilidade do backend real.

## 3. Autenticação — 20 pts
- [x] Login via API.
- [x] Cadastro via API.
- [x] Token persistido para restaurar sessão.
- [x] Senha não é armazenada na sessão local.
- [x] Rotas protegidas por autenticação.
- [x] Separação de rotas para tutor e veterinário.
- [x] Logout implementado.
- [ ] Funcionamento final depende do backend de autenticação real.

## 4. Arquitetura — 20 pts
- [x] Telas concentradas na apresentação.
- [x] Hooks concentram orquestração/estado.
- [x] Serviços concentram acesso à API.
- [x] Cliente Axios centralizado.
- [x] QueryClient centralizado.
- [x] Contratos e modelos separados.
- [x] Sem armazenamento local de dados de negócio.
- [x] AsyncStorage restrito à persistência da sessão.
- [x] Dados mockados legados removidos.

## 5. Documentação — 20 pts
- [x] README principal.
- [x] Documentação da API.
- [x] Documentação de autenticação.
- [x] Documentação das rotas.
- [x] Documentação da arquitetura.
- [x] Documentação das migrações das funcionalidades.
- [x] Auditoria final.
- [x] Este checklist requisito por requisito.

## Pontos que não devem ser simulados

O aplicativo não cria respostas falsas para endpoints que não existem no backend. Funcionalidades que exigem contrato específico de backend permanecem preparadas para integração.

Em particular, seleção de PDF/arquivo sem endpoint de upload não é apresentada como upload real. A aplicação trabalha com a referência disponível no contrato até que o backend forneça armazenamento/upload.

## Validação

A validação estrutural e o histórico Git foram preservados. O `npm run typecheck` deve ser executado no ambiente com as dependências instaladas.

```bash
npm install
npm run typecheck
npm start
```

