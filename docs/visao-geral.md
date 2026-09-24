# Visão geral do produto

Atualizado em 24/09/2026.

## Objetivo

O produto divulga o simpósio on-line **Neurocirurgia é tudo a Mesma Coisa?**
e inicia o atendimento de pessoas interessadas. A landing page coleta uma
solicitação de inscrição; ela não confirma inscrição, pagamento ou acesso.

O fluxo planejado é:

```text
Landing page
  → backend registra a solicitação
  → backend envia a primeira mensagem pelo WhatsApp
  → equipe confere dados e carteirinha, quando aplicável
  → equipe orienta e confere o pagamento
  → equipe confirma a inscrição
  → equipe envia o acesso ao evento
```

Depois da primeira mensagem automática, todo o atendimento será manual na
primeira versão operacional.

## Estado do produto

| Área | Estado | Observação |
| --- | --- | --- |
| Landing page | Implementada | Conteúdo, formulário e validações estão disponíveis até a data de fechamento. |
| Envio da solicitação | Contrato no frontend | Não existe backend; tentativas de envio ainda retornam erro. |
| Backend | Especificado | Persistência e primeira mensagem ainda não foram implementadas. |
| Painel administrativo | Especificado | A operação manual ainda não possui interface própria. |
| WhatsApp | Planejado | Somente a primeira mensagem será automática na versão inicial. |
| Pagamento | Operação manual planejada | Sem criação ou consulta automática de cobrança. |
| Modo financeiro híbrido | Roadmap | Integração com provedor e webhooks ficam para uma etapa futura. |

## Disponibilidade do formulário

O formulário fica disponível enquanto o instante atual for anterior a
`2027-02-20T00:00:00-04:00`. Ao chegar a esse instante, no início do primeiro
dia do evento em Cuiabá, novas solicitações são bloqueadas. Essa é a única
regra de disponibilidade; não existem travas manuais de abertura ou de backend.

## Documentação canônica

- [Regras do simpósio](./simposio/regras.md)
- [Especificação da landing page](./landing-page/especificacao.md)
- [Especificação futura do backend](./backend/especificacao.md)
- [Especificação futura do painel](./painel/especificacao.md)
- [Fluxo operacional manual](./operacao/fluxo-manual.md)
- [Automações futuras](./roadmap/automacoes-futuras.md)
- [Pendências](./pendencias.md)

Arquivos em `docs/historico/` preservam decisões do fluxo automatizado
anterior, mas não são especificações vigentes.
