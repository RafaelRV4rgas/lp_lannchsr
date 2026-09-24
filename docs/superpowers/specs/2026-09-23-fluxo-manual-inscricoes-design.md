# Design — Fluxo manual de solicitações de inscrição

Data: 23/09/2026  
Status: design conversacional aprovado; aguardando revisão da especificação  
Branch: `codex/fluxo-inscricao-manual`

## 1. Objetivo

Reformular o produto para que a landing page receba somente uma solicitação de
inscrição. Depois do formulário, o sistema envia uma primeira mensagem
automática pelo WhatsApp. A equipe da LANNcHSR conduz manualmente todas as
outras etapas: conferência dos dados, validação estudantil, instruções de
pagamento, confirmação, dúvidas, reembolsos e envio do acesso ao evento.

Esta etapa entrega somente a atualização da landing page e da documentação.
Backend, painel administrativo, banco de dados e integração com WhatsApp serão
especificados, mas não implementados agora.

O design também separa as regras do simpósio das responsabilidades da landing
page, do backend, do painel e da operação humana. Essa divisão deve permitir
automatizar etapas no futuro sem reformular o núcleo do produto.

## 2. Escopo desta entrega

### Incluído

- Atualização da jornada e dos textos da landing page.
- Ajuste do formulário para representar uma solicitação de inscrição.
- Remoção, no frontend, do fluxo automático de cobrança, recuperação,
  acompanhamento e retomada.
- Separação entre regras do simpósio e regras da landing page.
- Reorganização da documentação por responsabilidade.
- Especificação conceitual do backend e do painel futuros.
- Registro separado do procedimento operacional manual.
- Registro das automações desejadas em um roadmap futuro.
- Atualização e execução dos testes do frontend.

### Não incluído

- Backend, banco de dados ou painel administrativo.
- Envio real de WhatsApp.
- Criação ou consulta de cobranças.
- Integração com provedor financeiro ou webhooks.
- Upload ou armazenamento de carteirinha e comprovante.
- Confirmação automática de inscrição.
- Envio automático de acesso ao evento.
- Recuperação ou autocorreção de cadastro pelo participante.

Enquanto o backend não existir, as solicitações permanecerão fechadas na
versão pública. O ambiente de desenvolvimento poderá exibir uma prévia não
enviável do formulário.

## 3. Arquitetura e responsabilidades

Será adotado um núcleo de domínio compartilhado, com aplicações separadas por
responsabilidade. Tudo permanecerá no mesmo repositório nesta fase.

### 3.1 Núcleo do simpósio

É a fonte das regras que existem independentemente da interface ou da
tecnologia:

- uma inscrição principal por CPF e evento;
- categorias geral e estudante;
- valor geral e valor estudantil;
- validação manual da categoria estudante;
- pagamento necessário para confirmação;
- reembolso concluído cancela a inscrição;
- somente inscrição confirmada, paga e não reembolsada pode receber acesso;
- regras para abertura e encerramento das solicitações.

O núcleo não renderiza páginas, envia mensagens nem acessa banco de dados.

### 3.2 Landing page

É responsável por:

- conteúdo público do evento;
- exibição das categorias, valores e condições;
- coleta e validação imediata dos dados do formulário;
- consentimento para contato;
- envio futuro da solicitação ao backend;
- mensagens de erro e recebimento no navegador;
- acessibilidade, responsividade e estados visuais.

A landing page não é autoridade sobre pagamento, confirmação, reembolso ou
elegibilidade para acesso.

### 3.3 Backend futuro

Será responsável por:

- validar novamente os dados recebidos;
- localizar ou criar uma inscrição pelo CPF e evento;
- substituir dados de inscrições ainda não confirmadas;
- proteger inscrições confirmadas ou canceladas contra sobrescrita pelo
  formulário;
- persistir consentimento, estados e auditoria administrativa;
- disparar somente a primeira mensagem automática;
- aplicar idempotência e proteção contra abuso;
- autorizar e servir as operações do painel.

O backend será a autoridade sobre os dados persistidos e os estados da
inscrição.

### 3.4 Painel administrativo futuro

Será responsável pela operação humana:

- consulta e filtro das solicitações;
- validação ou recusa da categoria estudante;
- aplicação da categoria geral quando a carteirinha for recusada;
- registro do envio das instruções de pagamento;
- registro do comprovante informado e do pagamento confirmado;
- registro de reembolso solicitado e concluído;
- cancelamento decorrente de reembolso;
- controle e registro do envio do acesso;
- histórico das ações administrativas.

### 3.5 Operação manual

O procedimento humano será documentado separadamente. Ele explicará como a
equipe confere carteirinhas, orienta pagamentos, confirma inscrições, trata
reembolsos, responde dúvidas e envia o acesso.

### 3.6 Integrações futuras

Integrações financeiras e mensagens adicionais ficarão isoladas atrás de
interfaces próprias. Uma automação futura deverá substituir uma operação
manual específica sem transferir regras de negócio para o provedor.

## 4. Jornada do participante

### 4.1 Antes do envio

A página apresenta o simpósio, datas, formato, programação, categorias e
valores. Ela informa claramente que o formulário inicia uma solicitação e não
confirma a inscrição.

Texto-base próximo ao envio:

> Ao enviar este formulário, você solicitará sua inscrição. Nossa equipe
> continuará o atendimento pelo WhatsApp para conferir os dados e enviar as
> orientações de pagamento. A inscrição somente será confirmada após essa
> etapa.

O botão será rotulado como **Solicitar inscrição**.

### 4.2 Durante o envio

O botão exibirá **Enviando solicitação…** e ficará indisponível durante a
requisição. Cliques repetidos não deverão criar envios adicionais. Se houver
falha, os dados permanecerão preenchidos para uma nova tentativa.

### 4.3 Depois do envio

A página não exibirá link de cobrança, preço calculado para pagamento ou
estado financeiro. Exibirá:

> Solicitação recebida

> Enviaremos uma mensagem para o WhatsApp informado. Nossa equipe continuará
> o atendimento por lá para conferir seus dados e fornecer as orientações de
> pagamento.

> O envio do formulário ainda não confirma sua inscrição.

### 4.4 Primeira mensagem automática futura

O backend enviará apenas uma mensagem inicial:

> Olá, [nome]. Recebemos sua solicitação de inscrição para o Simpósio
> “Neurocirurgia é tudo a Mesma Coisa?”. Nossa equipe continuará o atendimento
> por este WhatsApp para verificar seus dados e enviar as orientações de
> pagamento. Sua inscrição somente será confirmada após a conclusão desse
> processo.

A mensagem não apresentará a inscrição como pré-aprovada e não enviará
instruções ou link de pagamento.

## 5. Formulário e privacidade

### 5.1 Campos

Para todos:

- nome completo;
- CPF;
- profissão;
- e-mail;
- WhatsApp com DDD;
- autorização para contato relacionado à inscrição.

Para estudantes:

- curso;
- semestre;
- universidade.

Não haverá upload de carteirinha, comprovante de pagamento, dados bancários,
senha ou conta de participante.

### 5.2 Validação estudantil

A equipe solicitará e conferirá a carteirinha manualmente pelo WhatsApp. O
sistema futuro guardará somente resultado, data, responsável e eventual
observação da conferência. A imagem da carteirinha não será copiada para o
backend.

Se a categoria estudante for recusada, a solicitação continuará elegível pela
categoria e pelo valor geral.

### 5.3 Reenvio

- O CPF identifica um cadastro por evento.
- Enquanto a inscrição não estiver confirmada, o envio mais recente substitui
  os dados atuais, inclusive o WhatsApp.
- Não haverá histórico de tentativas, comparação de campos ou revisão de
  alterações pendentes.
- Depois da confirmação ou de cancelamento por reembolso, o formulário não
  altera o cadastro.
- A resposta pública será genérica e não revelará cadastro ou pagamento.

O histórico ficará restrito a ações administrativas relevantes.

### 5.4 Consentimento

Texto-base:

> Autorizo a LANNcHSR a entrar em contato comigo pelo WhatsApp para conferir
> os dados desta solicitação, orientar o pagamento, confirmar a inscrição e
> enviar informações relacionadas ao simpósio.

### 5.5 Aviso resumido

Texto-base:

> Os dados informados serão utilizados para processar sua solicitação de
> inscrição e realizar o atendimento relacionado ao evento. A condição de
> estudante será conferida manualmente pelo WhatsApp. Não envie carteirinha ou
> comprovante de pagamento por este formulário.

Antes da abertura pública, a organização deverá definir o responsável pelos
dados, o contato de atendimento, a retenção e o procedimento de exclusão para
que o aviso completo de privacidade seja finalizado.

## 6. Estados futuros

Os estados serão separados por assunto.

### 6.1 Inscrição

- `solicitada`;
- `em_atendimento`;
- `aguardando_pagamento`;
- `confirmada`;
- `cancelada`.

### 6.2 Categoria aplicada

- `geral`;
- `estudante`.

A categoria informada no formulário é uma solicitação. A categoria aplicada
é definida após conferência manual.

### 6.3 Validação estudantil

- `nao_aplicavel`;
- `aguardando_carteirinha`;
- `aprovada`;
- `recusada`.

### 6.4 Situação financeira manual

- `nao_iniciada`;
- `instrucoes_enviadas`;
- `comprovante_informado`;
- `pagamento_confirmado`;
- `reembolso_solicitado`;
- `reembolso_concluido`.

`comprovante_informado` não confirma o pagamento. Na primeira versão do
backend, todas as mudanças financeiras serão realizadas manualmente pela
equipe.

### 6.5 Acesso

- `nao_elegivel`;
- `pronto_para_envio`;
- `enviado`.

Somente uma inscrição confirmada, com pagamento confirmado e sem reembolso
concluído, pode ficar pronta para envio. Ao concluir um reembolso, o sistema
cancela a inscrição, remove sua elegibilidade e bloqueia um novo registro de
envio de acesso. Se o acesso já tiver sido enviado, o painel deverá expor essa
condição para tratamento humano.

### 6.6 Primeira mensagem

- `aguardando_envio`;
- `enviada`;
- `falha`.

O estado da mensagem não confirma nem cancela a inscrição.

## 7. Fluxo e falhas do backend futuro

Ao receber uma nova solicitação, o backend deverá validar os dados e persistir
a inscrição, o consentimento e a intenção de envio da primeira mensagem de
forma consistente. A página responderá apenas com aceite genérico.

Para um CPF ainda não confirmado, o backend atualizará o cadastro com o envio
mais recente e direcionará a mensagem inicial ao WhatsApp mais recente. Para
uma inscrição confirmada ou cancelada, não substituirá os dados nem criará
nova cobrança.

Uma falha de WhatsApp não poderá apagar a inscrição. O painel futuro mostrará
mensagem aguardando envio, enviada ou com falha. A implementação poderá fazer
poucas retentativas da mesma mensagem, usando uma chave única para evitar
duplicação, antes de encaminhar o caso para atendimento manual.

O formulário reutilizará a chave de idempotência ao repetir a mesma tentativa
depois de uma falha. Um timeout não será interpretado como prova de que a
solicitação não foi registrada.

## 8. Fluxo financeiro inicial e futuro

### 8.1 Primeira versão do backend e painel

- A equipe envia manualmente o link ou as instruções de pagamento.
- O participante envia o comprovante pelo WhatsApp.
- A equipe confere e registra manualmente o pagamento.
- A equipe inicia e acompanha reembolsos manualmente.
- O painel registra `reembolso_solicitado` e `reembolso_concluido`.
- Reembolso concluído cancela a inscrição e bloqueia o acesso.

O comprovante permanecerá no canal de atendimento e não será copiado para o
backend.

### 8.2 Roadmap híbrido

Em etapa futura:

- o backend guardará o identificador da cobrança;
- o provedor financeiro será a fonte confiável dos estados de pagamento,
  reembolso e contestação;
- webhooks sincronizarão o estado financeiro;
- a equipe poderá continuar enviando cobranças e atendendo manualmente;
- mensagens padronizadas poderão ser enviadas pelo painel;
- as automações serão introduzidas gradualmente.

Esse modo híbrido não pertence à implementação atual.

## 9. Remoção do fluxo automatizado antigo

Serão removidos da landing page:

- recuperação por CPF;
- token de acesso recebido pela URL;
- consulta do estado da inscrição;
- retomada de cobrança;
- link e vencimento de pagamento;
- estados financeiros `pending`, `confirmed` e `expired` no frontend;
- componentes, contratos e testes exclusivos desse fluxo;
- textos que prometem confirmação ou acesso automáticos.

Serão preservados:

- normalização e validação do formulário;
- envio idempotente da solicitação;
- prevenção de cliques repetidos;
- preservação dos dados depois de erro;
- resposta pública genérica;
- acessibilidade.

O Git preserva o código removido. Funcionalidades futuras serão redesenhadas
segundo o novo fluxo, em vez de manter código morto na aplicação.

## 10. Organização da documentação

Os documentos canônicos serão:

```text
docs/
├── visao-geral.md
├── pendencias.md
├── simposio/
│   └── regras.md
├── landing-page/
│   └── especificacao.md
├── backend/
│   └── especificacao.md
├── painel/
│   └── especificacao.md
├── operacao/
│   └── fluxo-manual.md
└── roadmap/
    └── automacoes-futuras.md
```

Documentos substituídos serão movidos para `docs/historico/` e receberão um
aviso explícito de que não são especificações vigentes. O `README.md` apontará
somente para documentos canônicos.

## 11. Critérios de aceite desta entrega

1. A landing page descreve o formulário como solicitação, não como inscrição
   confirmada.
2. A página explica que a equipe continuará manualmente pelo WhatsApp.
3. O texto informa que a confirmação depende das etapas posteriores.
4. Estudantes continuam preenchendo curso, semestre e universidade.
5. A página informa que a carteirinha será conferida pelo WhatsApp e não deve
   ser enviada pelo formulário.
6. O frontend não oferece recuperação, acompanhamento ou retomada de cobrança.
7. O frontend não exibe link, vencimento ou estado de pagamento.
8. A versão pública disponibiliza o formulário até
   `2027-02-20T00:00:00-04:00`; a disponibilidade não depende do backend.
9. A prévia de desenvolvimento não envia dados quando as solicitações estão
   fechadas.
10. Máscaras, validações, acessibilidade, idempotência e prevenção de duplo
    clique continuam cobertas por testes.
11. Nenhum texto promete pagamento, confirmação ou acesso automáticos.
12. A documentação separa regras do simpósio, landing page, backend, painel,
    operação manual e roadmap.
13. Backend e painel são descritos como futuros, não como implementados.
14. O modo financeiro híbrido aparece somente no roadmap.
15. `npm test`, `npm run typecheck`, `npm run lint` e `npm run build` passam.

## 12. Decisões deliberadamente adiadas

As escolhas abaixo pertencem ao planejamento das etapas futuras e não são
necessárias para atualizar a landing page:

- stack do backend e do painel;
- banco de dados e hospedagem;
- provedor e conta de WhatsApp;
- provedor financeiro;
- autenticação administrativa;
- política técnica de retentativas;
- prazos de retenção e exclusão de dados;
- texto jurídico final de privacidade;
- procedimentos financeiros detalhados de reembolso e contestação.

Essas decisões adiadas não autorizam a abertura das solicitações. A página
permanecerá fechada até que o backend, a operação, a privacidade e o canal de
atendimento estejam prontos.
