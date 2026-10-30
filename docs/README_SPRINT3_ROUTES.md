# Rotas oficiais do backend .NET

O aplicativo mobile utiliza as rotas documentadas no backend PetCore-.NET.
A base configurada em `EXPO_PUBLIC_API_URL` deve apontar para o host do backend; o prefixo `/api` já faz parte das rotas abaixo.

| Recurso | GET lista | GET detalhe | POST | PUT patch | DELETE |
|---|---|---|---|---|---|
| Clínica | `/api/Clinica` | `/api/Clinica/{id}` | `/api/Clinica` | `/api/Clinica/{id}/patch` | `/api/Clinica/{id}` |
| Endereço | `/api/Endereco` | `/api/Endereco/{id}` | `/api/Endereco` | `/api/Endereco/{id}/patch` | `/api/Endereco/{id}` |
| Exame | `/api/Exame` | `/api/Exame/{id}` | `/api/Exame` | `/api/Exame/{id}/patch` | `/api/Exame/{id}` |
| Histórico | `/api/Historico` | `/api/Historico/{id}` | `/api/Historico` | — | `/api/Historico/{id}` |
| Medicamento | `/api/Medicamento` | `/api/Medicamento/{id}` | `/api/Medicamento` | `/api/Medicamento/{id}/patch` | `/api/Medicamento/{id}` |
| Médico | `/api/Medico` | `/api/Medico/{id}` | `/api/Medico` | `/api/Medico/{id}/patch` | `/api/Medico/{id}` |
| Pet | `/api/Pet` | `/api/Pet/{id}` | `/api/Pet` | `/api/Pet/{id}/patch` | `/api/Pet/{id}` |
| Prontuário | `/api/Prontuario` | `/api/Prontuario/{id}` | `/api/Prontuario` | `/api/Prontuario/{id}/patch` | `/api/Prontuario/{id}` |
| Receita | `/api/Receita` | `/api/Receita/{id}` | `/api/Receita` | — | `/api/Receita/{id}` |
| Relatório | `/api/Relatorio` | `/api/Relatorio/{id}` | `/api/Relatorio` | `/api/Relatorio/{id}/patch` | `/api/Relatorio/{id}` |
| Tutor | `/api/Tutor` | `/api/Tutor/{id}` | `/api/Tutor` | `/api/Tutor/{id}/patch` | `/api/Tutor/{id}` |
| Protocolo | `/api/Protocolo` | `/api/Protocolo/{id}` | `/api/Protocolo` | `/api/Protocolo/{id}/patch` | `/api/Protocolo/{id}` |

## Login

- Tutor e Médico: `POST /api/auth/login`

```json
{
  "email": "usuario@exemplo.com",
  "password": "senha",
  "role": "tutor"
}
```

O aplicativo tenta primeiro o login de Tutor (`role: "tutor"`) e, se não autenticar, tenta Médico (`role: "medico"`). Quando o endpoint retorna o token JWT, ele é persistido e enviado automaticamente nas requisições seguintes.

## Observações

- `/api/Pet/menu` também está disponível no backend e foi mantida no mapa centralizado de rotas.
- O aplicativo não chama endpoints que não constam na documentação oficial.
- Recursos que não possuem `PUT .../patch` documentado não recebem uma operação de atualização no mobile.
