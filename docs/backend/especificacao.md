# Especificação do backend

**Status: não implementado.** Este documento define a primeira versão futura;
não descreve serviços disponíveis hoje.

## Responsabilidades

- validar os dados recebidos;
- manter uma inscrição por CPF e evento;
- registrar o consentimento e sua versão;
- substituir os dados enquanto a inscrição não estiver confirmada;
- impedir sobrescrita por formulário depois da confirmação ou do cancelamento;
- persistir estados e ações administrativas;
- enviar somente a primeira mensagem pelo WhatsApp;
- servir operações autenticadas do painel.

## Entrada conceitual

`POST /api/registrations` receberá o formulário normalizado e o header
`Idempotency-Key`. A resposta pública será sempre genérica:

```json
{ "accepted": true }
```

O endpoint não retornará existência de CPF, situação, pagamento ou dados
pessoais.

## Reenvio

Se a inscrição ainda não estiver confirmada, o envio mais recente substitui os
dados atuais e o WhatsApp mais recente recebe a mensagem inicial. Não será
mantido histórico das versões pendentes. Se a inscrição estiver confirmada ou
cancelada, o formulário não altera o cadastro.

## Primeira mensagem

Após persistir a solicitação, o backend enviará uma única mensagem inicial que
confirma o recebimento e explica a continuidade manual. Ela não comunicará
aprovação da inscrição e não conterá cobrança.

Uma falha da mensagem não remove a inscrição. O envio deve possuir chave única,
poucas retentativas e situação `aguardando_envio`, `enviada` ou `falha` para
acompanhamento humano.

## Segurança

- Revalidar dados no servidor.
- Impor unicidade por evento e CPF normalizado.
- Aplicar idempotência, limitação de tentativas e autorização no painel.
- Não registrar CPF completo, documentos, tokens ou dados sensíveis em logs.
- Não armazenar carteirinha nem comprovante de pagamento.
- Restringir credenciais e segredos ao servidor.
- Guardar auditoria das ações administrativas relevantes.

Stack, banco, hospedagem e provedor de WhatsApp serão escolhidos no
planejamento específico do backend.
