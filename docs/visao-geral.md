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
| Landing page | Implementada | Conteúdo, formulário, validações e prévia local estão disponíveis. |
| Envio da solicitação | Contrato no frontend | Não existe backend; a versão pública permanece fechada. |
| Backend | Especificado | Persistência e primeira mensagem ainda não foram implementadas. |
| Painel administrativo | Especificado | A operação manual ainda não possui interface própria. |
| WhatsApp | Planejado | Somente a primeira mensagem será automática na versão inicial. |
| Pagamento | Operação manual planejada | Sem criação ou consulta automática de cobrança. |
| Modo financeiro híbrido | Roadmap | Integração com provedor e webhooks ficam para uma etapa futura. |

## Limite atual

As solicitações devem permanecer fechadas até que backend, canal oficial de
WhatsApp, privacidade, atendimento e operação estejam prontos. A prévia exibida
em desenvolvimento não envia dados.

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
