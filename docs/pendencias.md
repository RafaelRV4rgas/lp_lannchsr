# Pendências para abertura e evolução

Atualizado em 24/09/2026. Consulte a [visão geral](./visao-geral.md) e as
[regras do simpósio](./simposio/regras.md).

## 1. Evento e conteúdo

| Concluído | Informação necessária | Situação |
| --- | --- | --- |
| [x] | Datas | 20 e 21/02/2027 |
| [x] | Fuso oficial | America/Cuiaba |
| [ ] | Horário de início e término de cada dia | Em aberto |
| [ ] | Ordem e horários das apresentações | Em aberto |
| [ ] | Plataforma e link da transmissão | Em aberto |
| [ ] | Contato oficial de atendimento | Em aberto |
| [ ] | Fotografias pendentes | Duas recebidas; faltam dez |
| [ ] | Apresentação curta de Dr. Luiz Felipe | Texto demonstrativo |
| [ ] | CRMs pendentes | Dr. Atahualpa Strapasson, Dr. Luciano França e Dr. Luiz Felipe |

## 2. Valores e operação manual

| Decisão necessária | Situação |
| --- | --- |
| Confirmar R$ 25,00 para público geral | Em aberto |
| Confirmar R$ 15,00 para estudante | Em aberto |
| Definir meio, conta e instruções de pagamento | Em aberto |
| Definir como a equipe confirma o recebimento | Inicialmente manual, com comprovante no WhatsApp; detalhar procedimento |
| Definir cancelamento e prazo de reembolso | Em aberto |
| Definir quem executa e quem confirma o reembolso | Em aberto |
| Definir tratamento de pagamento duplicado ou tardio | Em aberto |
| Definir responsáveis por atendimento, confirmação e acesso | Em aberto |

A integração financeira não bloqueia a conclusão visual da landing page. Ela
pertence ao roadmap híbrido. Backend, painel e canal real, porém, são
necessários antes de abrir solicitações ao público.

## 3. Validação estudantil

- Definir critérios mínimos de validade da carteirinha.
- Definir como lidar com documento ilegível ou vencido.
- Orientar a equipe a não copiar a imagem para o sistema.
- Definir a mensagem usada quando a categoria estudante for recusada e o valor
  geral for oferecido.

## 4. Privacidade e atendimento

| Decisão necessária | Situação |
| --- | --- |
| Identificação do responsável pelos dados | Em aberto |
| Canal para dúvidas, correção e exclusão | Em aberto |
| Prazo de retenção dos dados | Em aberto |
| Texto completo do aviso de privacidade | Em aberto |
| Procedimento para troca de WhatsApp após confirmação | Em aberto |
| Pessoas autorizadas a operar o painel futuro | Em aberto |

O consentimento resumido da landing page não substitui essas definições.

## 5. Materiais públicos

- Logotipo oficial em boa qualidade.
- Manual de identidade, se existir.
- Logos e grafia final dos apoios.
- Apresentação pública do apoio “Dr Giovani Mendes 2200 deputado federal MT”.
- Regras de certificado, materiais, sorteios e eventual replay.

## 6. Implementação futura obrigatória antes da abertura

- Backend persistente e endpoint de solicitação.
- Primeira mensagem automática pelo WhatsApp oficial.
- Painel protegido para operação manual.
- Estados e auditoria administrativa.
- Tratamento de falha da primeira mensagem.
- Ambientes, segredos, backup e monitoramento.

Esses itens ainda não existem. Não marcar `backendReady` nem `requestsOpen`
como verdadeiros antes da implementação e da validação operacional.

## 7. Roadmap não bloqueante da primeira versão manual

- Modo financeiro híbrido e webhooks.
- Mensagens padronizadas pelo painel.
- Recuperação segura e autocorreção.
- Tratamento automatizado de novo envio para CPF confirmado.

Esses itens estão detalhados em
[automações futuras](./roadmap/automacoes-futuras.md) e não devem ser descritos
como funcionalidades atuais.
