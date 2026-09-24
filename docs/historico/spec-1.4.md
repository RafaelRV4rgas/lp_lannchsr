> **Documento histórico:** este arquivo descreve o fluxo automatizado anterior
> e não representa a especificação vigente. Consulte `docs/visao-geral.md`.

# Spec — Simpósio de Neurocirurgia

Versão: 1.4 · Atualizada em: 23/09/2026

Documento de escopo do produto, consolidado a partir das decisões da organização. As dependências ainda não escolhidas estão explicitadas na seção 12; não representam funcionalidades prontas. As salvaguardas técnicas abaixo são propostas para viabilizar as regras aprovadas.

## 1. Evento e objetivo

**Título:** Neurocirurgia é tudo a Mesma Coisa?

**Subtítulo:** Simpósio on-line: as diferentes grandes áreas e subespecialidades da Neurocirurgia.

Apresentar as diferenças entre as grandes áreas e subespecialidades da neurocirurgia: patologias abordadas, procedimentos, consultas, rotinas e experiências de carreira dos especialistas. Ajudar participantes a reconhecer suas áreas de interesse.

**Público:** acadêmicos de medicina, profissionais de saúde, médicos considerando residência e residentes considerando uma subespecialização/fellow.

**Benefícios informados pela organização:** palestras com especialistas de referência, perguntas e respostas, materiais das aulas, sorteios e certificado pela Academia Brasileira de Neurocirurgia. A emissão e o envio dos certificados são responsabilidade da organização, fora deste sistema.

**Presidência:** Carolina Ayumi Kozima.

**Organização:** Liga Acadêmica de Neurologia e Neurocirurgia do Hospital Santa Rosa (LANNcHSR).

**Apoios informados no material recebido:**

- Academia Brasileira de Neurocirurgia (ABNc).
- Sociedade Brasileira de Neurocirurgia (SBN).
- Hospital Santa Rosa (HSR).
- Centro de Estudos Cervantes Caporossi (HSR).
- Medneuro.
- Neurocirurgiões no Ar.
- Dr Giovani Mendes 2200 deputado federal MT (redação recebida; validar apresentação pública e material de marca).
- Liga Brasileira de Neurocirurgia.

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
- A programação apresenta uma grade sem numeração com as 10 subespecialidades abordadas antes dos cards dos palestrantes, conectando os conteúdos aos especialistas responsáveis.
- “SUBESPECIALIDADES ABORDADAS” e “QUEM CONDUZ ESSA JORNADA” usam o padrão visual de rótulo da página: caixa alta, tipografia compacta, maior espaçamento entre letras e cor de destaque. O primeiro é um rótulo textual da grade; o segundo permanece como título `h3` da seção de palestrantes.
- A programação reúne 12 palestrantes em 10 temas. Duas fotos oficiais já foram incorporadas; os demais cards usam imagem genérica temporária. Onze apresentações curtas usam os dados profissionais recebidos e a apresentação de Dr. Luiz Felipe continua demonstrativa.
- Os cards dos palestrantes entram em sequência quando aparecem na tela, respeitando a preferência por movimento reduzido.
- A navegação usa scroll inercial moderado e revela os principais blocos uma única vez ao entrarem na tela, preservando o movimento nativo para quem prefere redução de animações.
- Layout responsivo, formulário legível e navegável por teclado, campos com rótulos e mensagens de erro acessíveis.
- Animação simplificada no celular, estática com preferência por redução de movimento e alternativa estática quando a renderização não for suportada.
- Conteúdo e formulário devem funcionar mesmo sem carregar a animação.

O evento ocorrerá on-line em dois dias, **20 e 21/02/2027**, no fuso **America/Cuiaba**. Os horários continuam pendentes. Enquanto a configuração técnica não contiver data/hora ISO válida, preços válidos, integrações prontas e abertura manual, apresentar “Inscrições em breve”, sem aceitar inscrições ou gerar cobranças. O ambiente de desenvolvimento pode exibir uma prévia não enviável para revisão. Usar apenas nomes e temas confirmados; fotos e apresentações pendentes devem permanecer marcadas como conteúdo temporário até a substituição.

## 4. Formulário e identificação

Campos obrigatórios:

| Campo | Regra |
| --- | --- |
| Nome completo | Nome para identificação e uso pela organização |
| CPF | Aplicar máscara `000.000.000-00`, limitar a 11 dígitos, validar os dígitos verificadores e manter um único cadastro por evento |
| Profissão | Incluir opção Estudante |
| Curso | Obrigatório apenas para estudante |
| Semestre | Obrigatório apenas para estudante; lista de 1º a 12º semestre e opção “Outro” |
| Universidade | Obrigatório apenas para estudante |
| E-mail | Validar formato |
| WhatsApp | Aplicar máscara brasileira para telefone fixo ou celular, limitar ao DDD e número e normalizar com código do país |

Solicitar autorização para mensagens de inscrição, cobrança e acesso pelo WhatsApp e registrar a autorização com data e versão do texto. Apresentar aviso de privacidade que explique a utilização dos dados.

O valor especial para estudante vale para qualquer curso e é concedido por autodeclaração, sem upload ou análise de comprovante.

Cada CPF pode ter apenas uma inscrição por evento. Reenvios não criam novo cadastro nem cobranças duplicadas. Inscrição pendente permite retomada; inscrição confirmada informa a situação ao titular. A recuperação deve verificar o acesso a um contato já cadastrado ou usar link seguro, sem expor dados pessoais apenas pela digitação do CPF. Validar o CPF não comprova a identidade de quem preenche.

## 5. Regras comerciais e abertura

- Preço-base atualmente configurado no frontend: **R$ 25,00**; confirmar como valor público final antes da abertura.
- Valor estudantil fixo atualmente configurado no frontend: **R$ 15,00**, para estudantes de qualquer curso por autodeclaração; confirmar como valor público final antes da abertura.
- Calcular valores no servidor. Salvar a categoria e o valor aplicados em cada cobrança, preservando cobranças existentes quando as configurações mudarem.
- Não há limite comercial de inscrições. Eventuais limites da plataforma de transmissão são restrições técnicas e devem ser avaliados na escolha do serviço.
- Definir uma data não abre inscrições automaticamente. A organização precisa acionar a abertura no painel.
- Só permitir abertura com data definida, preço válido e integrações de produção prontas.
- A configuração atual mantém inscrições indisponíveis: `registrationsOpen` e `integrationsReady` estão falsos. O fuso já está definido como `America/Cuiaba`, mas `startsAt` permanece vazio até a definição do horário de início e seu registro no formato ISO exigido pelo domínio.
- Fechamento manual impede novas inscrições e cobranças. A política para cobranças já emitidas deve ser explícita na implementação; não cancelar pagamentos recebidos silenciosamente.

## 6. Validade da cobrança

Não há reserva de vaga. A cobrança pode ter um prazo de validade configurável, conforme os recursos do provedor de pagamento. Esse prazo controla apenas até quando o link pode ser pago.

- Exibir o vencimento ao participante quando o provedor informar uma data.
- Reenvios da mensagem não prorrogam automaticamente a cobrança existente.
- Após o vencimento, a retomada usa a mesma inscrição e pode gerar uma nova cobrança identificada.
- Um pagamento aprovado confirma a inscrição, independentemente da quantidade de participantes já confirmados.
- Pagamentos duplicados ou posteriores ao cancelamento continuam exigindo reconciliação e uma política de estorno.

## 7. Fluxo de inscrição e pagamento

1. Participante preenche o formulário com inscrições abertas.
2. Servidor valida dados, unicidade e preço; registra a inscrição.
3. Servidor cria uma cobrança identificada pela inscrição no provedor de pagamento.
4. Página confirma o recebimento da solicitação e apresenta o link quando disponível, como alternativa ao WhatsApp.
5. Sistema envia WhatsApp com solicitação recebida, valor e link de pagamento. Informar o vencimento quando existir.
6. Participante paga na página do provedor acessada pelo link.
7. Provedor notifica o backend por webhook; backend verifica autenticidade, cobrança, valor e situação do pagamento.
8. Backend confirma a inscrição.
9. Sistema envia confirmação pelo WhatsApp e inclui o acesso ao evento caso já esteja liberado.

A página de retorno do pagamento não é prova de pagamento. A confirmação depende de informação verificada no servidor.

Se a geração da cobrança falhar, preservar a solicitação e permitir retomada sem duplicação. Se a mensagem falhar, preservar cobrança e inscrição, tentar novamente e sinalizar falha persistente à organização.

## 8. WhatsApp e acesso ao evento

Usar a WhatsApp Business Platform oficial, diretamente ou por provedor compatível, com número da organização e modelos aprovados para mensagens iniciadas pelo sistema.

Mensagens previstas:

- Solicitação recebida e link de pagamento.
- Inscrição confirmada após pagamento aprovado.
- Link de acesso liberado, quando não tiver sido enviado na confirmação.

O painel permite cadastrar o link da transmissão e liberá-lo explicitamente:

- Se já liberado no momento da confirmação, incluir na mensagem de confirmação.
- Se liberado depois, enviar automaticamente aos inscritos confirmados que ainda não receberam o acesso.
- Nunca enviar acesso para inscrições pendentes ou expiradas.

Salvar tentativas e identificadores das mensagens; acompanhar status de envio/entrega disponibilizados pelo serviço. A aceitação pela API não significa entrega ao participante. Aplicar retentativas limitadas, evitar duplicação por reprocessamento e disponibilizar reenvio administrativo em caso de falha. A versão inicial prevê um link de transmissão configurado para o evento; acesso individual depende de requisito futuro da plataforma escolhida.

## 9. Painel administrativo

Acesso restrito à organização por autenticação e autorização no servidor.

**Configurações:** dias e horários do evento no fuso oficial, abertura e fechamento de inscrições, preço-base, preço fixo para estudantes, validade da cobrança e cadastro/liberação do link do evento.

**Acompanhamento:** listar e buscar inscrições por nome/CPF, consultar dados do formulário, categoria, valor cobrado, situação do pagamento, confirmação, eventual vencimento da cobrança e status das mensagens. Exibir totais de confirmados e pendentes.

**Operação:** visualizar falhas e pagamentos duplicados ou tardios, reenviar notificações elegíveis e registrar alterações administrativas relevantes. Não permitir marcar pagamento como aprovado sem evidência do provedor como parte do fluxo normal.

## 10. Estrutura técnica proposta

Manter a base existente em React, TypeScript e Vite para a interface. Adicionar backend, armazenamento persistente, processamento assíncrono e integrações. Hospedagem, banco, autenticação e provedores ainda serão selecionados; não há dependência aprovada de fornecedor específico.

Separar responsabilidades:

- **Interface pública:** divulgação, formulário e retorno seguro da inscrição.
- **API de inscrições:** validação, CPF único e cálculo de preço.
- **Integração de pagamentos:** criação/consulta/cancelamento de cobrança e processamento verificado de eventos.
- **Processamento assíncrono:** envio e retentativas de WhatsApp e reconciliação de pagamentos.
- **Administração:** acesso protegido, consultas, configuração e liberação de acesso.

Dados principais: configuração do evento, dias/sessões da programação, inscrição, cobrança/pagamento, consentimento, notificação e histórico administrativo. Como o simpósio ocorre em dois dias, o backend deve armazenar o período ou os dias da programação separadamente; `startsAt` continua sendo o instante de início usado pela regra de abertura, e não deve ser reutilizado como o único campo editorial do evento. Manter estados de pagamento e notificação separados do estado da inscrição; falha no WhatsApp não desfaz pagamento confirmado.

Estados de inscrição previstos: aguardando pagamento, confirmada e expirada para retomada. Guardar separadamente situações de cobrança como criada, aprovada, expirada, cancelada e estornada, conforme o provedor.

Credenciais ficam exclusivamente no servidor. Aplicar HTTPS, restrição de acesso aos dados, limitação de tentativas e proteção contra abuso do formulário. Evitar CPF completo e tokens em logs. Usar unicidade no banco, transações e chaves de idempotência para inscrições, cobranças, webhooks e notificações. Definir retenção dos dados com a organização antes da produção.

## 11. Critérios de aceite

1. Sem data, não é possível abrir inscrições pela interface nem pela API.
2. Com data e demais pré-requisitos válidos, a organização consegue abrir e fechar inscrições manualmente.
3. Estudante vê campos acadêmicos obrigatórios e paga exatamente o valor estudantil configurado; os demais pagam o preço-base.
4. Duas submissões para o mesmo CPF não criam duas inscrições; recuperação não expõe dados a terceiros.
5. Toda cobrança tem vínculo com a inscrição e valores calculados no servidor.
6. O vencimento da cobrança não é apresentado como reserva de vaga.
7. Uma cobrança expirada pode ser retomada sem criar outra inscrição.
8. Webhooks repetidos não duplicam confirmação ou envio; eventos não autenticados não alteram pagamentos.
9. Falhas temporárias de integração permitem retomada sem perda da inscrição nem cobrança duplicada.
10. Link de acesso só é enviado a confirmados, na confirmação ou após liberação posterior, evitando reenvios automáticos duplicados.
11. Usuários não autorizados não acessam dados ou configurações administrativas.
12. Página e formulário funcionam no celular, por teclado e com animação desativada.
13. Validar antes da produção, no ambiente de testes dos provedores, os fluxos comum e estudantil, cobrança expirada, webhook duplicado, falha de mensagem, pagamento duplicado e liberação posterior de acesso.

## 12. Pendências e condições para lançamento

| Item | Situação / ação necessária |
| --- | --- |
| Datas, horários e fuso do evento | Evento em 20 e 21/02/2027, fuso America/Cuiaba; horários dos dois dias ainda pendentes |
| Preços | Frontend configurado com R$ 25,00 geral e R$ 15,00 estudante; confirmar valores finais antes da abertura |
| Validade da cobrança | Definir prazo conforme os recursos do provedor de pagamento |
| Programação e palestrantes | Nomes e 10 temas recebidos; horários e ordem pendentes; 2 de 12 fotos, 11 de 12 apresentações e 9 de 12 CRMs recebidos |
| Plataforma de transmissão | Ainda não escolhida; cadastrar link antes de liberá-lo aos confirmados |
| Provedor de pagamento | Escolher API com cobrança identificável e webhook; avaliar expiração e estorno |
| Formas de pagamento | Definir meios aceitos e compatibilidade com o vencimento da cobrança |
| WhatsApp | Escolher integração, configurar número/conta, credenciais, modelos e custos |
| Infraestrutura | Escolher backend, banco, hospedagem e autenticação administrativa |
| Marca e conteúdos | Obter logo em qualidade adequada, materiais dos palestrantes e logos/textos finais dos apoios |
| Atendimento e políticas | Definir contato de suporte, cancelamento/estorno, pagamentos duplicados ou tardios e retenção dos dados |

O lembrete para solicitar programação e palestrantes foi executado em 07/09/2026 às 13h, no fuso America/Cuiaba. Os itens ainda pendentes permanecem em `docs/pendencias.md`.

## 13. Referências de integração

- [WhatsApp Cloud API — documentação da Meta](https://www.postman.com/meta/whatsapp-business-platform/documentation/wlk6lh4/whatsapp-cloud-api).
- [Política de mensagens do WhatsApp Business](https://business.whatsapp.com/policy).
- [Preços da WhatsApp Business Platform](https://business.whatsapp.com/products/platform-pricing).

Revalidar requisitos e preços dos provedores quando forem escolhidos e na implementação.
