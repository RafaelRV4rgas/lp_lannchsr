# Pendências para finalizar o projeto

Atualizado em 15/09/2026. Referências: [spec](./spec.md) e [plano de implementação](./superpowers/plans/2026-09-06-simposio-neuro.md).

Marcar um item somente quando a decisão ou o material estiver registrado. Os campos “Resposta” ficam em aberto para preenchimento pela organização ou pelo responsável técnico. As propostas abaixo não são decisões já aprovadas.

## 1. Dados do evento

| Concluído | Informação necessária | Resposta / material | Necessário para |
| --- | --- | --- | --- |
| [ ] | Data do evento | Em aberto | Abrir inscrições |
| [ ] | Horário de início, término previsto e fuso oficial | Em aberto | Divulgar informações completas e orientar participantes |
| [x] | Temas e palestrantes de cada sessão | 10 temas e 12 palestrantes recebidos; cadastrados em `src/content/speakers.ts` | Estruturar programação |
| [ ] | Horários e ordem das apresentações | Solicitar material | Finalizar programação |
| [ ] | Fotografias dos palestrantes | Recebidas: Dr. Giovani Mendes e Dr. Renato Santos. Faltam 10; a prévia usa uma imagem genérica temporária | Finalizar seção de palestrantes |
| [ ] | Apresentações curtas dos 12 palestrantes | A prévia usa textos demonstrativos identificados | Finalizar seção de palestrantes |
| [ ] | CRMs dos 9 palestrantes restantes | Recebidos CRM-MT 4964 (Giovani Mendes), 8470 (Marcel Yamada) e 6414 (Virgilio Vilá) | Completar identificação profissional |
| [ ] | Plataforma de transmissão | Em aberto | Preparar transmissão e integração operacional |
| [ ] | Link de acesso ao evento | Em aberto | Liberar acesso aos inscritos confirmados |
| [ ] | Contato oficial de atendimento: WhatsApp e/ou e-mail | Em aberto | Orientar participantes e tratar problemas |

O lembrete para solicitar programação e palestrantes foi executado em **07/09/2026 às 13h, no fuso America/Cuiaba**. Os itens ainda não recebidos permanecem registrados acima.

## 2. Preço e regras comerciais

| Concluído | Decisão necessária | Resposta | Necessário para |
| --- | --- | --- | --- |
| [ ] | Preço-base da inscrição em reais | Em aberto | Calcular e gerar cobranças |
| [ ] | Formas de pagamento aceitas | Em aberto | Escolher e configurar o provedor |
| [ ] | Se aceitar cartão: haverá parcelamento? Quantidade de parcelas e eventual custo para participante | Em aberto; dispensar se cartão não for aceito | Informar condições de pagamento |
| [ ] | Qual será a validade da cobrança? | Em aberto; definir conforme os recursos do provedor | Configurar o checkout e pagamentos tardios |
| [ ] | Quem poderá abrir e fechar as inscrições pelo painel? | Em aberto | Habilitar operação administrativa |
| [ ] | Quando fechar inscrições manualmente, cobranças já emitidas continuarão pagáveis até vencer? | Proposta: respeitar a validade já comunicada; confirmar | Evitar ambiguidade para quem já recebeu o link |
| [ ] | Regras de cancelamento e reembolso solicitado pelo participante, com prazos e canal de atendimento | Em aberto | Publicar condições e orientar atendimento |
| [ ] | Se uma pessoa pagar duas cobranças da mesma inscrição: como devolver o pagamento adicional? | Em aberto | Tratar duplicidade financeira |
| [ ] | Se houver cancelamento/estorno de inscrição confirmada, o acesso deixa de ser elegível para envio? | Em aberto | Definir efeitos do reembolso na inscrição |

## 3. Materiais e informações para a página

| Concluído | Material / informação necessária | Resposta / material | Necessário para |
| --- | --- | --- | --- |
| [ ] | Logotipo oficial em arquivo de boa qualidade, preferencialmente vetorial ou PNG com transparência | Foi recebida uma imagem de referência; obter arquivo final | Finalizar aplicação da marca |
| [ ] | Manual de identidade, cores e fontes oficiais, se existir | Em aberto; se não existir, definir tokens a partir da marca | Finalizar identidade visual |
| [ ] | Logos dos apoios e confirmação da lista e grafia para publicação | Lista recebida na spec; arquivos e revisão final pendentes | Finalizar rodapé e apoios |
| [ ] | Forma de apresentação pública do apoio informado como “Dr Giovani Mendes 2200 deputado federal MT” | Confirmar redação final e imagem, se houver | Publicar esse apoio corretamente |
| [ ] | Carga horária do certificado, condições para recebê-lo e prazo/canal de envio | Em aberto; organização emite e envia | Finalizar benefícios e dúvidas frequentes |
| [ ] | Como e quando os participantes receberão os materiais das aulas | Em aberto; distribuição não está implementada no escopo atual | Divulgar o benefício com precisão |
| [ ] | Informações dos sorteios que poderão ser divulgadas, incluindo condições de participação | Em aberto; realização é responsabilidade da organização | Finalizar textos sobre sorteios |
| [ ] | Haverá gravação/replay? Se sim, quem disponibiliza, por quanto tempo e por qual canal? | Em aberto; hospedagem própria está fora do escopo | Finalizar dúvidas frequentes sem prometer recurso inexistente |

## 4. Serviços e configuração técnica

Responsável: desenvolvimento em conjunto com quem administra as contas da organização. Não inserir senhas, tokens, chaves ou documentos sensíveis neste arquivo.

| Concluído | Escolha / configuração necessária | Resposta | Necessário para |
| --- | --- | --- | --- |
| [ ] | Provedor de pagamento e conta recebedora da organização | Em aberto | Implementar cobrança real |
| [ ] | Validar API de cobrança, identificador por inscrição, webhook autenticado, consulta, expiração/cancelamento e estorno | Em aberto; registrar capacidades e limitações do escolhido | Implementar automação com segurança |
| [ ] | Confirmar taxas, custos e compatibilidade dos meios de pagamento com a validade da cobrança | Em aberto | Fechar operação financeira |
| [ ] | WhatsApp Business Platform direto pela Meta ou por provedor | Em aberto | Implementar envio automático |
| [ ] | Número oficial e responsável pela conta empresarial do WhatsApp | Em aberto | Configurar o remetente |
| [ ] | Modelos aprovados de solicitação/cobrança, confirmação, acesso e recuperação segura de inscrição | Em aberto | Enviar mensagens iniciadas pelo sistema |
| [ ] | Orçamento e configuração de cobrança dos serviços de WhatsApp | Em aberto | Manter envio em produção |
| [ ] | Backend, banco de dados, hospedagem, autenticação administrativa e mecanismo de tarefas assíncronas/agendadas | Em aberto | Detalhar adaptadores e implantação |
| [ ] | Domínio/endereço público e responsável pelo DNS | Em aberto | Publicar o endereço definitivo |
| [ ] | Contas administrativas: nomes/e-mails das pessoas autorizadas e responsável por conceder/revogar acesso | Em aberto | Entregar o painel à organização |
| [ ] | Ambientes de teste e produção, armazenamento de segredos, backup e monitoramento | Em aberto | Validar integrações e operar o sistema |

As escolhas técnicas devem ser registradas também em `docs/decisions/integrations.md` quando essa etapa do plano for executada.

## 5. Dados pessoais e atendimento operacional

| Concluído | Decisão / texto necessário | Resposta | Necessário para |
| --- | --- | --- | --- |
| [ ] | Identificação e contato da organização responsável pelos dados | Em aberto | Preparar aviso de privacidade |
| [ ] | Prazo de retenção e procedimento de exclusão dos dados de inscrição | Em aberto | Configurar armazenamento e operação |
| [ ] | Texto do aviso de privacidade e autorização de mensagens relacionadas ao evento | Em aberto | Finalizar formulário |
| [ ] | Procedimento para corrigir cadastro ou trocar WhatsApp quando o titular perdeu acesso ao número | Em aberto; exigir conferência pela organização | Recuperar inscrição sem expor dados pelo CPF |
| [ ] | Responsável por acompanhar falhas de mensagem, cobranças e pagamentos duplicados ou tardios | Em aberto | Evitar solicitações sem tratamento |
| [ ] | Confirmar recuperação da inscrição por link seguro enviado ao WhatsApp cadastrado | Proposta do plano; confirmar | Finalizar a jornada de retomada e modelo de mensagem |

## 6. Regras já definidas — não precisam ser rediscutidas

- Evento on-line: **Neurocirurgia é tudo a Mesma Coisa?**
- Presidência: Carolina Ayumi Kozima; organização: LANNcHSR.
- Direção visual imersiva, com cérebro abstrato de pontos e conexões, movimento sutil e base em bordô, cinza e branco.
- Inscrições só podem abrir com data definida; definir a data não as abre automaticamente.
- Não há limite comercial de inscrições nem reserva de vaga. Eventual limite da plataforma de transmissão será tratado como restrição técnica do serviço escolhido.
- A validade do link de pagamento será definida separadamente conforme o provedor.
- Estudantes de qualquer curso recebem **10% de desconto por autodeclaração**, sem comprovante.
- Uma inscrição por CPF por evento.
- Formulário: nome completo, CPF, profissão, e-mail e WhatsApp; para estudante, curso, semestre e universidade.
- Solicitação e link de pagamento enviados automaticamente pelo WhatsApp.
- Pagamento ocorre na página do provedor acessada pelo link.
- Inscrição confirmada após pagamento verificado.
- Acesso ao evento enviado pelo sistema aos confirmados: junto da confirmação quando já liberado ou após liberação posterior pela organização.
- Painel protegido com regras, consulta de inscritos e acompanhamento de pagamentos; conteúdos editoriais continuam no código.
- Certificados emitidos e enviados pela organização.

## 7. O que podemos fazer enquanto faltam respostas

**Pode avançar agora:** estrutura visual da página, componentes, formulário, validações, contratos de API e testes de regras, mantendo inscrições fechadas e sem inventar conteúdo.

**Depende dos serviços escolhidos:** adaptadores reais de pagamento, WhatsApp, persistência, autenticação e implantação.

**Antes de abrir inscrições pagas:** preencher data/horário, preço, meios de pagamento e validade da cobrança; concluir regras operacionais, contas e integrações testadas, atendimento, privacidade e acessos administrativos. Materiais editoriais devem ser revisados para que a oferta pública seja fiel ao evento.

**Pode ser concluído depois da abertura, mas antes de enviar acesso:** cadastro e liberação do link de transmissão. Enquanto não estiver liberado, confirmar pagamento sem prometer que o link já foi enviado.
