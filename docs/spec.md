# Spec — Simpósio de Neurocirurgia

Versão: 1.0 · Data: 06/09/2026

Documento de escopo do produto, consolidado a partir das decisões da organização. As dependências ainda não escolhidas estão explicitadas na seção 12; não representam funcionalidades prontas. As salvaguardas técnicas abaixo são propostas para viabilizar as regras aprovadas.

## 1. Evento e objetivo

**Título:** Neurocirurgia é tudo a Mesma Coisa?

**Subtítulo:** Simpósio on-line: as diferentes grandes áreas e subespecialidades da Neurocirurgia.

Apresentar as diferenças entre as grandes áreas e subespecialidades da neurocirurgia: patologias abordadas, procedimentos, consultas, rotinas e experiências de carreira dos especialistas. Ajudar participantes a reconhecer suas áreas de interesse.

**Público:** acadêmicos de medicina, profissionais de saúde, médicos considerando residência e residentes considerando uma subespecialização/fellow.

**Benefícios informados pela organização:** palestras com especialistas de referência, perguntas e respostas, materiais das aulas, sorteios e certificado pela Academia Brasileira de Neurocirurgia. A emissão e o envio dos certificados são responsabilidade da organização, fora deste sistema.

**Presidência:** Carolina Ayumi Kozima.

**Organização:** Liga de Neurologia e Neurocirurgia do Hospital Santa Rosa (LANNcHSR).

**Apoios informados no material recebido:**

- Academia Brasileira de Neurocirurgia (ABNc).
- Sociedade Brasileira de Neurocirurgia (SBN).
- Hospital Santa Rosa (HSR).
- Centro de Estudos Cervantes Caporossi (HSR).
- Medneuro.
- Neurocirurgiões no Ar.
- Dr Giovani Mendes 2200 deputado federal MT (redação recebida; validar apresentação pública e material de marca).
- Liga Acadêmica Brasileira de Neurocirurgia (LABN).

## 2. Escopo

Entregar uma landing page pública, fluxo de inscrição e cobrança, notificações automáticas pelo WhatsApp e painel administrativo protegido por login.

O painel permite configurar regras e acompanhar inscritos/pagamentos. Não é um CMS: textos, imagens, programação, palestrantes e apoios são mantidos no código.

Ficam fora desta versão: comprovação de matrícula e análise de documentos, emissão de certificados, realização de sorteios, transmissão própria, hospedagem de aulas, chat próprio, criação de contas para participantes e campanhas de marketing. A divulgação desses benefícios na página não implica sua implementação no sistema.

## 3. Landing page e identidade visual

Direção aprovada: **imersiva, com cérebro abstrato formado por pontos e conexões**. Referência conceitual: [What's a Brain?](https://whatisabrain.com/).

- Abertura com fundo escuro, cérebro abstrato animado e movimento sutil.
- Bordô, cinza e branco como base, conforme o logotipo fornecido. Valores exatos das cores e tipografia dependem dos arquivos oficiais disponíveis.
- Título, subtítulo, informações do evento e chamada de inscrição com prioridade sobre a animação.
- Seções de apresentação, público e benefícios, programação, palestrantes, inscrição, dúvidas frequentes, organização e apoios.
- Layout responsivo, formulário legível e navegável por teclado, campos com rótulos e mensagens de erro acessíveis.
- Animação simplificada no celular, estática com preferência por redução de movimento e alternativa estática quando a renderização não for suportada.
- Conteúdo e formulário devem funcionar mesmo sem carregar a animação.

Sem data definida, apresentar “Data e horário em breve” e “Inscrições em breve”, sem aceitar inscrições ou gerar cobranças. Não inventar programação ou nomes de palestrantes enquanto o material não estiver disponível.

## 4. Formulário e identificação

Campos obrigatórios:

| Campo | Regra |
| --- | --- |
| Nome completo | Nome para identificação e uso pela organização |
| CPF | Normalizar e validar formato/dígitos; único por evento |
| Profissão | Incluir opção Estudante |
| Curso | Obrigatório apenas para estudante |
| Semestre | Obrigatório apenas para estudante |
| Universidade | Obrigatório apenas para estudante |
| E-mail | Validar formato |
| WhatsApp | Solicitar DDD e normalizar com código do país |

Solicitar autorização para mensagens de inscrição, cobrança e acesso pelo WhatsApp e registrar a autorização com data e versão do texto. Apresentar aviso de privacidade que explique a utilização dos dados.

O desconto de estudante vale para qualquer curso e é concedido por autodeclaração, sem upload ou análise de comprovante.

Cada CPF pode ter apenas uma inscrição por evento. Reenvios não criam novo cadastro nem cobranças duplicadas. Inscrição pendente permite retomada; inscrição confirmada informa a situação ao titular. A recuperação deve verificar o acesso a um contato já cadastrado ou usar link seguro, sem expor dados pessoais apenas pela digitação do CPF. Validar o CPF não comprova a identidade de quem preenche.

## 5. Regras comerciais e abertura

- Preço-base: configurável; valor ainda não definido.
- Desconto estudantil: inicialmente 10%, configurável pelo painel.
- Valor estudantil: preço-base × 0,90 quando o desconto for 10%, arredondado para centavos.
- Calcular valores no servidor. Salvar preço, desconto e total aplicados em cada cobrança, preservando cobranças existentes quando as configurações mudarem.
- Limite inicial: 2.000 participantes, configurável.
- Definir uma data não abre inscrições automaticamente. A organização precisa acionar a abertura no painel.
- Só permitir abertura com data definida, preço válido e integrações de produção prontas.
- Fechamento manual impede novas inscrições e cobranças. A política para cobranças já emitidas deve ser explícita na implementação; não cancelar pagamentos recebidos silenciosamente.

## 6. Capacidade e reserva opcional

O painel permite ativar ou desativar a reserva de vaga por **24 horas**. O estado inicial dessa opção deve ser escolhido pela organização antes da abertura.

### Reserva ativa

- Uma inscrição aceita reserva vaga por 24 horas a partir de seu registro no servidor.
- Capacidade ocupada = inscrições confirmadas + reservas ainda válidas.
- Informar o prazo ao participante. Reenvios e novas tentativas de mensagem não prorrogam a reserva.
- Ao expirar sem pagamento, liberar a vaga e encerrar/inutilizar a cobrança conforme os recursos do provedor.
- Retomada utiliza a mesma inscrição e exige nova verificação de disponibilidade, com nova cobrança quando necessário.

### Reserva desativada

- Inscrições pendentes não ocupam vagas.
- Apenas inscrições com pagamento aprovado e vaga atribuída contam para o limite.
- A confirmação precisa verificar a capacidade de forma atômica para que pagamentos concorrentes não confirmem mais participantes que o limite.

### Pagamentos tardios e concorrência

Uma verificação antes de abrir o checkout não garante, sozinha, que dois pagamentos não ocorram para a última vaga. O provedor escolhido deve ser avaliado quanto a expiração, cancelamento e controle de cobranças.

Se um pagamento for aprovado após a expiração, confirmar somente se houver disponibilidade. Se o dinheiro for recebido sem vaga disponível, registrar **pagamento recebido sem vaga**, alertar a organização e não enviar confirmação nem acesso. O procedimento de estorno, seu prazo e sua automação dependem do provedor e devem ser definidos antes da abertura. O sistema nunca deve ocultar o recebimento ou exceder 2.000 confirmações com o limite padrão.

Alterações de capacidade não podem reduzir o limite abaixo de vagas já comprometidas. Como regra técnica proposta, alterações na opção de reserva se aplicam às novas solicitações, preservando os prazos já comunicados para as existentes.

## 7. Fluxo de inscrição e pagamento

1. Participante preenche o formulário com inscrições abertas.
2. Servidor valida dados, unicidade, preço e disponibilidade; registra a inscrição e eventual reserva.
3. Servidor cria uma cobrança identificada pela inscrição no provedor de pagamento.
4. Página confirma o recebimento da solicitação e apresenta o link quando disponível, como alternativa ao WhatsApp.
5. Sistema envia WhatsApp com solicitação recebida, valor e link de pagamento. Informar prazo quando houver reserva.
6. Participante paga na página do provedor acessada pelo link.
7. Provedor notifica o backend por webhook; backend verifica autenticidade, cobrança, valor e situação do pagamento.
8. Backend atribui vaga dentro do limite e confirma a inscrição.
9. Sistema envia confirmação pelo WhatsApp e inclui o acesso ao evento caso já esteja liberado.

A página de retorno do pagamento não é prova de pagamento. A confirmação depende de informação verificada no servidor.

Se a geração da cobrança falhar, preservar a solicitação e permitir retomada sem duplicação. Se a mensagem falhar, preservar cobrança e inscrição, tentar novamente e sinalizar falha persistente à organização.

## 8. WhatsApp e acesso ao evento

Usar a WhatsApp Business Platform oficial, diretamente ou por provedor compatível, com número da organização e modelos aprovados para mensagens iniciadas pelo sistema.

Mensagens previstas:

- Solicitação recebida e link de pagamento.
- Inscrição confirmada após pagamento aprovado e atribuição de vaga.
- Link de acesso liberado, quando não tiver sido enviado na confirmação.

O painel permite cadastrar o link da transmissão e liberá-lo explicitamente:

- Se já liberado no momento da confirmação, incluir na mensagem de confirmação.
- Se liberado depois, enviar automaticamente aos inscritos confirmados que ainda não receberam o acesso.
- Nunca enviar acesso para inscrições pendentes, expiradas ou sem vaga.

Salvar tentativas e identificadores das mensagens; acompanhar status de envio/entrega disponibilizados pelo serviço. A aceitação pela API não significa entrega ao participante. Aplicar retentativas limitadas, evitar duplicação por reprocessamento e disponibilizar reenvio administrativo em caso de falha. A versão inicial prevê um link de transmissão configurado para o evento; acesso individual depende de requisito futuro da plataforma escolhida.

## 9. Painel administrativo

Acesso restrito à organização por autenticação e autorização no servidor.

**Configurações:** data/horário/fuso, abertura e fechamento de inscrições, preço-base, percentual de desconto, limite de participantes, opção de reserva por 24 horas e cadastro/liberação do link do evento.

**Acompanhamento:** listar e buscar inscrições por nome/CPF, consultar dados do formulário, categoria, valor cobrado, situação do pagamento, confirmação, eventual prazo de reserva e status das mensagens. Exibir totais de confirmados, pendentes, reservas ativas e capacidade disponível.

**Operação:** visualizar falhas e pagamentos recebidos sem vaga, reenviar notificações elegíveis e registrar alterações administrativas relevantes. Não permitir marcar pagamento como aprovado sem evidência do provedor como parte do fluxo normal.

## 10. Estrutura técnica proposta

Manter a base existente em React, TypeScript e Vite para a interface. Adicionar backend, armazenamento persistente, processamento assíncrono e integrações. Hospedagem, banco, autenticação e provedores ainda serão selecionados; não há dependência aprovada de fornecedor específico.

Separar responsabilidades:

- **Interface pública:** divulgação, formulário e retorno seguro da inscrição.
- **API de inscrições:** validação, CPF único, cálculo de preço e capacidade.
- **Integração de pagamentos:** criação/consulta/cancelamento de cobrança e processamento verificado de eventos.
- **Processamento assíncrono:** envio e retentativas de WhatsApp, expiração de reservas e reconciliação de pagamentos.
- **Administração:** acesso protegido, consultas, configuração e liberação de acesso.

Dados principais: configuração do evento, inscrição, cobrança/pagamento, reserva, consentimento, notificação e histórico administrativo. Manter estados de pagamento e notificação separados do estado da inscrição; falha no WhatsApp não desfaz pagamento confirmado.

Estados de inscrição previstos: aguardando pagamento, confirmada e expirada para retomada. Exceção operacional: pagamento recebido sem vaga. Guardar separadamente situações de cobrança como criada, aprovada, expirada, cancelada e estornada, conforme o provedor.

Credenciais ficam exclusivamente no servidor. Aplicar HTTPS, restrição de acesso aos dados, limitação de tentativas e proteção contra abuso do formulário. Evitar CPF completo e tokens em logs. Usar unicidade no banco, transações e chaves de idempotência para inscrições, cobranças, webhooks e notificações. Definir retenção dos dados com a organização antes da produção.

## 11. Critérios de aceite

1. Sem data, não é possível abrir inscrições pela interface nem pela API.
2. Com data e demais pré-requisitos válidos, a organização consegue abrir e fechar inscrições manualmente.
3. Estudante vê campos acadêmicos obrigatórios e recebe exatamente o desconto configurado; os demais pagam o preço-base.
4. Duas submissões para o mesmo CPF não criam duas inscrições; recuperação não expõe dados a terceiros.
5. Toda cobrança tem vínculo com a inscrição e valores calculados no servidor.
6. Reserva ativa ocupa vaga por 24 horas; a expiração libera capacidade sem excluir o histórico.
7. Com reserva desativada, solicitações pendentes não reduzem capacidade.
8. Requisições e pagamentos concorrentes não excedem o limite de inscrições confirmadas; recebimentos sem vaga ficam visíveis para tratamento.
9. Webhooks repetidos não duplicam confirmação ou envio; eventos não autenticados não alteram pagamentos.
10. Falhas temporárias de integração permitem retomada sem perda da inscrição nem cobrança duplicada.
11. Link de acesso só é enviado a confirmados, na confirmação ou após liberação posterior, evitando reenvios automáticos duplicados.
12. Usuários não autorizados não acessam dados ou configurações administrativas.
13. Página e formulário funcionam no celular, por teclado e com animação desativada.
14. Validar antes da produção, no ambiente de testes dos provedores, os fluxos comum e estudantil, cobrança expirada, webhook duplicado, falha de mensagem, última vaga concorrente e liberação posterior de acesso.

## 12. Pendências e condições para lançamento

| Item | Situação / ação necessária |
| --- | --- |
| Data, horário e fuso do evento | Organização definirá; data é requisito para abrir inscrições |
| Preço-base | Organização definirá antes da abertura |
| Reserva de 24 horas | Funcionalidade aprovada; escolher se começa ativa ou desativada |
| Programação e palestrantes | Já definidos pela organização; material ainda não recebido |
| Plataforma de transmissão | Ainda não escolhida; cadastrar link antes de liberá-lo aos confirmados |
| Provedor de pagamento | Escolher API com cobrança identificável e webhook; avaliar expiração e estorno |
| Formas de pagamento | Definir meios aceitos e compatibilidade com os prazos de reserva |
| WhatsApp | Escolher integração, configurar número/conta, credenciais, modelos e custos |
| Infraestrutura | Escolher backend, banco, hospedagem e autenticação administrativa |
| Marca e conteúdos | Obter logo em qualidade adequada, materiais dos palestrantes e logos/textos finais dos apoios |
| Atendimento e políticas | Definir contato de suporte, cancelamento/estorno, tratamento de pagamento sem vaga e retenção dos dados |

O lembrete para solicitar programação e palestrantes foi agendado para 07/09/2026 às 13h, no fuso America/Cuiaba.

## 13. Referências de integração

- [WhatsApp Cloud API — documentação da Meta](https://www.postman.com/meta/whatsapp-business-platform/documentation/wlk6lh4/whatsapp-cloud-api).
- [Política de mensagens do WhatsApp Business](https://business.whatsapp.com/policy).
- [Preços da WhatsApp Business Platform](https://business.whatsapp.com/products/platform-pricing).

Revalidar requisitos e preços dos provedores quando forem escolhidos e na implementação.
