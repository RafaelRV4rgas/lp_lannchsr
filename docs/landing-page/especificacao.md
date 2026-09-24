# Especificação da landing page

Status: implementada com formulário disponível até a data de fechamento.

## Responsabilidade

A landing page divulga o evento, apresenta temas e palestrantes, explica as
condições e coleta uma solicitação de inscrição. Ela não confirma pagamento,
inscrição, reembolso ou acesso.

## Conteúdo

A página contém abertura, apresentação, público e benefícios, dez
subespecialidades, doze palestrantes, dúvidas frequentes, formulário,
organização e apoios. A interface mantém a direção visual escura com cérebro
abstrato, bordô, cinza e branco, scroll moderado e revelação de conteúdo com
respeito a `prefers-reduced-motion`.

## Jornada do formulário

Antes do envio, a página informa que:

- o formulário inicia uma solicitação;
- a equipe continuará pelo WhatsApp;
- estudantes terão a carteirinha conferida nesse canal;
- a inscrição somente será confirmada depois do atendimento e da conferência
  do pagamento.

Durante o envio, o botão exibe **Enviando solicitação…**, campos ficam
indisponíveis e cliques repetidos não criam outro envio.

Depois do aceite, a página exibe **Solicitação recebida**, informa que a equipe
continuará pelo WhatsApp e reforça que o formulário ainda não confirma a
inscrição. Não exibe link, vencimento ou situação financeira.

## Campos e validações

Todos informam nome completo, CPF, profissão, e-mail, WhatsApp com DDD e
consentimento. Estudantes também informam curso, semestre e universidade.

O frontend aplica máscara e validação de CPF e telefone, valida e-mail,
normaliza os dados e exige os campos condicionais. O backend futuro deverá
repetir todas as validações; o navegador não é autoridade.

Não há upload de carteirinha, comprovante, dados bancários ou documento.

## Consentimento e privacidade

Texto vigente do consentimento:

> Autorizo a LANNcHSR a entrar em contato comigo pelo WhatsApp para conferir
> os dados desta solicitação, orientar o pagamento, confirmar a inscrição e
> enviar informações relacionadas ao simpósio.

Aviso resumido vigente:

> Os dados informados serão utilizados para processar sua solicitação de
> inscrição e realizar o atendimento relacionado ao evento. A condição de
> estudante será conferida manualmente pelo WhatsApp. Não envie carteirinha ou
> comprovante de pagamento por este formulário.

O aviso completo depende das pendências de responsável, contato, retenção e
exclusão de dados.

## Disponibilidade e transporte

O formulário fica disponível antes de `2027-02-20T00:00:00-04:00` e bloqueia
novas solicitações nesse instante ou depois dele. Data ausente ou inválida
também o bloqueia. Não há regra adicional de início, abertura manual ou
prontidão do backend.

O cliente HTTP possui somente `POST /api/registrations`, com chave de
idempotência e resposta genérica `{ "accepted": true }`. Esse endpoint ainda
não existe; portanto, o formulário pode ser preenchido, mas tentativas reais
de envio retornam erro e preservam os dados preenchidos.

Não existem rota de acompanhamento, recuperação por CPF, token no navegador,
retomada de cobrança ou consulta financeira.

## Acessibilidade e aceite

- Campos possuem rótulos, mensagens associadas e foco no primeiro erro.
- A página funciona por teclado e com redução de movimento.
- Dados permanecem preenchidos depois de falha.
- A mesma tentativa reutiliza a chave de idempotência depois de timeout.
- Nenhum texto apresenta a solicitação como inscrição confirmada.
