# Especificação do painel administrativo

**Status: não implementado.** Este documento define a operação futura da
primeira versão manual.

## Responsabilidade

O painel centralizará o acompanhamento da equipe. Ele não enviará cobranças,
confirmará pagamentos por provedor nem enviará mensagens adicionais na
primeira versão.

## Estados

**Inscrição:** `solicitada`, `em_atendimento`, `aguardando_pagamento`,
`confirmada` ou `cancelada`.

**Categoria aplicada:** `geral` ou `estudante`.

**Validação estudantil:** `nao_aplicavel`, `aguardando_carteirinha`,
`aprovada` ou `recusada`.

**Financeiro manual:** `nao_iniciada`, `instrucoes_enviadas`,
`comprovante_informado`, `pagamento_confirmado`, `reembolso_solicitado` ou
`reembolso_concluido`.

**Acesso:** `nao_elegivel`, `pronto_para_envio` ou `enviado`.

## Operações

A equipe poderá localizar solicitações, iniciar atendimento, aprovar ou
recusar a categoria estudante, aplicar a categoria geral, registrar instruções
e comprovante, confirmar pagamento, registrar reembolso e marcar envio do
acesso.

Recusar a categoria estudante não cancela a solicitação. Ela passa a ser
elegível pelo valor geral.

Concluir um reembolso cancela a inscrição, remove a elegibilidade e impede um
novo registro de envio de acesso. Se o acesso já tiver sido enviado, o painel
deve tornar essa condição visível para tratamento humano.

## Permissões e auditoria

O painel exigirá autenticação e autorização. Ações relevantes guardarão data,
responsável, ação e observação quando necessária. Marcar pagamento,
reembolso, cancelamento ou acesso não poderá ocorrer anonimamente.

Mensagens padronizadas e sincronização financeira pertencem ao roadmap, não à
primeira versão do painel.
