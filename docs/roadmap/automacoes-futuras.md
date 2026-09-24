# Roadmap de automações futuras

Status: possibilidades futuras, sem data prometida e fora da implementação
atual.

Este roadmap reúne o **modo financeiro híbrido**, o uso futuro de **webhook**
e o envio de **mensagens padronizadas** pelo painel.

## Modo financeiro híbrido

O atendimento e o envio da cobrança poderão continuar manuais, enquanto o
backend passa a guardar o identificador da cobrança. O provedor financeiro se
tornará a fonte confiável dos estados de pagamento, reembolso e contestação.
Webhooks atualizarão esses estados sem decidir regras do simpósio.

Antes dessa etapa será necessário escolher o provedor, validar autenticação,
idempotência, consulta, estorno, eventos tardios e ambientes de teste.

## Mensagens pelo painel

O painel poderá oferecer mensagens padronizadas para cobrança, confirmação,
acesso e atendimento. Cada envio deverá ter autorização, registro, situação e
proteção contra duplicação. A primeira versão continuará automatizando apenas
a mensagem inicial após o formulário.

## Reenvio de CPF confirmado

Um envio futuro com CPF já confirmado poderá gerar mensagem segura para o
WhatsApp original, informando que não é necessária nova cobrança. O novo
contato fornecido não deverá receber informações da inscrição existente.

## Recuperação e autocorreção

Poderá ser criado um link seguro enviado ao contato já cadastrado para permitir
correções ou consulta sem usar o CPF como autenticação. Alterações de contato
exigirão verificação adicional.

## Princípio de evolução

Cada automação substituirá uma etapa manual bem definida. Landing page,
regras do simpósio e estados administrativos não deverão depender de um
provedor específico.
