# Plano de implementação — Simpósio de Neurocirurgia

> **Para execução por agentes:** usar `superpowers:executing-plans` para executar as tarefas com checkpoints. Passos usam caixas de seleção para acompanhar o progresso. Este documento planeja o trabalho; não autoriza iniciar a implementação ou contratar serviços.

**Objetivo:** entregar a página imersiva do simpósio, inscrições com cobrança e WhatsApp automáticos e painel administrativo de regras e acompanhamento.

**Arquitetura:** preservar React/TypeScript/Vite. Separar conteúdo editorial, componentes, regras de domínio e contratos de integração. Backend, persistência transacional e processamento assíncrono ficam atrás desses contratos; a escolha de infraestrutura e provedores é uma etapa explícita, anterior aos adaptadores reais.

**Tecnologias:** React, TypeScript, Vite e CSS existentes. Vitest, Testing Library e Playwright são propostas para testes, a instalar durante a execução após verificar compatibilidade. Backend, banco, autenticação, hospedagem, pagamento e WhatsApp não foram escolhidos.

**Spec:** [docs/spec.md](../../spec.md).

## Restrições globais

- Cada CPF pode ter apenas uma inscrição por evento.
- Limite inicial: 2.000 participantes, configurável.
- Desconto estudantil: inicialmente 10%, configurável pelo painel.
- O desconto de estudante vale para qualquer curso e é concedido por autodeclaração, sem upload ou análise de comprovante.
- O painel permite ativar ou desativar a reserva de vaga por **24 horas**.
- Definir uma data não abre inscrições automaticamente. A organização precisa acionar a abertura no painel.
- Só permitir abertura com data definida, preço válido e integrações de produção prontas.
- A página de retorno do pagamento não é prova de pagamento.
- Nunca enviar acesso para inscrições pendentes, expiradas ou sem vaga.
- Conteúdo e formulário devem funcionar mesmo sem carregar a animação.
- Não há CMS, emissão de certificados, transmissão própria ou conta de participante nesta versão.
- Preservar alterações existentes do usuário; revisar `git status` antes de cada tarefa e criar commits somente com arquivos da tarefa.

## Progresso em 06/09/2026

Tarefas **1–5 concluídas no escopo de frontend, contratos e regras puras**. Tarefas 6–11 não iniciadas. Evidências e decisões: [registro da implementação](../../implementacao-etapas-1-5.md). Backend, transações, cobranças e WhatsApp reais continuam pendentes.

## Estado encontrado e estratégia

`src/App.tsx` renderiza `Formulario` e `Footer`; o formulário ainda é um texto e o CSS mantém estilos do template. `package.json` oferece `dev`, `build`, `lint` e `preview`, sem suíte de testes. `compose.yaml` menciona build de uma imagem, mas não constitui uma arquitetura de backend definida.

O trabalho será organizado em três entregas: página e formulário; núcleo de inscrições; integrações e administração. As tarefas abaixo descrevem os contratos e cenários de aceite. A tarefa 6 produz o plano complementar específico da infraestrutura escolhida, sem bloquear as tarefas 1–5 nem fingir que integrações não escolhidas já têm configuração executável.

Não publicar dados fictícios de palestrantes, preço ou data. Fixtures de testes usam apenas dados sintéticos e não são importadas pelo conteúdo público.

## Mapa de arquivos proposto

| Arquivo ou diretório | Responsabilidade |
| --- | --- |
| `src/content/event.ts` | Textos, programação, palestrantes e apoios editados no código |
| `src/domain/event.ts` | Tipos de configuração e regras de abertura/preço |
| `src/domain/registration.ts` | Campos, categoria e validação de inscrição |
| `src/domain/capacity.ts` | Regras puras de reserva e disponibilidade |
| `src/components/hero/Hero.tsx`, `BrainVisual.tsx`, `Hero.css` | Abertura e visual abstrato independente |
| `src/components/event/EventSections.tsx`, `EventSections.css` | Conteúdo público sem formulários |
| `src/components/formulario/Formulario.tsx`, `Formulario.css` | Formulário existente e estados condicionais |
| `src/components/inscricao/RegistrationResult.tsx` | Retorno autenticado por token da solicitação |
| `src/services/registration-client.ts` | Acesso HTTP tipado, sem segredos ou regras de autoridade |
| `src/contracts/api.ts`, `src/contracts/providers.ts` | Contratos compartilhados, sem dependências de servidor |
| `tests/domain/`, `tests/components/`, `tests/e2e/` | Verificação de regras, interação e jornada |
| `docs/decisions/integrations.md` | Escolhas e capacidades verificadas dos fornecedores |
| `docs/superpowers/plans/2026-09-06-backend-adapters.md` | Plano complementar após tarefa 6 |
| `server/` | Limite lógico proposto do backend; subdivisão e entrypoints definidos na tarefa 6 |
| `src/admin/` | Telas administrativas; subdivisão definida após contrato de autenticação |

Arquivos existentes a modificar: `src/App.tsx`, `src/App.css`, `src/index.css`, `src/components/footer/Footer.tsx`, `src/components/footer/Footer.css`, `index.html`, `package.json`, `README.md` e lockfile correspondente ao gerenciador encontrado na execução. Não migrar o projeto para outro framework como efeito colateral.

## Tarefa 1 — Conteúdo e estados públicos do evento

**Arquivos:** criar `src/content/event.ts`, `src/domain/event.ts`, `tests/domain/event.test.ts`; modificar `package.json` e lockfile para o runner de testes.

**Interface:** `EventRules` consumido pela página, pelo formulário e pelo servidor; `canOpenRegistrations(rules): boolean`; `calculatePriceCents(basePriceCents, discountPercent, isStudent): number`.

```ts
export interface EventRules {
  startsAt: string | null; // ISO 8601 com offset
  timeZone: string | null;
  registrationsOpen: boolean;
  basePriceCents: number | null;
  studentDiscountPercent: number;
  capacity: number;
  reservationEnabled: boolean;
  integrationsReady: boolean; // determinado no servidor
}
export function calculatePriceCents(base: number, discount: number, student: boolean) {
  if (!Number.isInteger(base) || base <= 0 || !Number.isInteger(discount) || discount < 0 || discount >= 100)
    throw new Error('INVALID_PRICE');
  return student ? Math.round(base * (100 - discount) / 100) : base;
}
```

- [x] Instalar o runner compatível e criar `test` como `vitest run` em `package.json`.
- [x] Escrever os casos antes da função: `expect(calculatePriceCents(10000, 10, true)).toBe(9000)` e `expect(calculatePriceCents(10000, 10, false)).toBe(10000)`; rejeitar preço nulo/negativo e desconto inválido na fronteira da configuração.
- [x] Testar `canOpenRegistrations`: falso sem data válida, fuso, preço ou integrações; verdadeiro com pré-requisitos, sem mudar automaticamente `registrationsOpen`.
- [x] Executar `npm run test -- tests/domain/event.test.ts`, observar falha pelos símbolos ausentes e implementar as regras até passar.
- [x] Criar conteúdo com título, subtítulo e informações da spec; `speakers` e `schedule` começam vazios; data e preço públicos começam ausentes, inscrições fechadas. O estado inicial da reserva permanece escolha obrigatória no checklist de abertura, sem inferir preferência do usuário.
- [x] Rodar `npm run build` e `npm run lint`; revisar diff e registrar somente a tarefa.

**Saída:** dados editoriais centralizados e regras testadas, sem depender de materiais externos.

## Tarefa 2 — Página pública e abertura imersiva

**Arquivos:** criar componentes `hero/` e `event/` do mapa; modificar `src/App.tsx`, `src/App.css`, `src/index.css`, rodapé e `index.html`.

**Interfaces:** `Hero({ title, subtitle, registrationAvailable })`; `BrainVisual()` decorativo; `EventSections({ content })`, com conteúdo inferido de `src/content/event.ts`.

- [x] Substituir CSS do template por tokens de fundo escuro, bordô, cinza e branco, com cores tratadas como aproximações até receber identidade oficial.
- [x] Montar apresentação, público, benefícios, programação, palestrantes, dúvidas e apoios; quando listas estiverem vazias, informar que o conteúdo será divulgado em breve, sem cartões inventados.
- [x] Usar SVG ou canvas com pontos/conexões formando dois hemisférios abstratos. Começar com ilustração estática; adicionar movimento somente depois de validar legibilidade. Carregar o visual sem bloquear conteúdo principal.
- [x] Aplicar redução de movimento e marcar decoração como `aria-hidden`. Em canvas, manter imagem/SVG estático alternativo e interromper animação quando fora da tela.
- [x] Quando inscrição não estiver disponível, mostrar “Inscrições em breve” sem simular sucesso de cadastro.
- [x] Verificar no navegador larguras de 360, 768 e 1440 px: sem rolagem horizontal, título legível, contraste, foco visível, navegação por teclado, redução de movimento e falha de carregamento do visual.
- [x] Executar `npm run build` e `npm run lint`; guardar evidências visuais da revisão e registrar a tarefa.

**Saída:** página revisável antes de data, preço e palestrantes. Usar as skills de construção/publicação aplicáveis somente quando esta tarefa for executada, conciliando suas exigências com a base existente.

## Tarefa 3 — Formulário e validação

**Arquivos:** criar `src/domain/registration.ts`, `tests/domain/registration.test.ts`, `tests/components/Formulario.test.tsx`, `Formulario.css`; modificar `Formulario.tsx`.

**Interface:** `validateRegistration(input: RegistrationInput): Record<string, string>` retorna erros por campo; nenhum erro produz objeto vazio.

```ts
export interface RegistrationInput {
  fullName: string;
  cpf: string;
  profession: string; // valor student identifica autodeclaração
  course?: string;
  semester?: string;
  university?: string;
  email: string;
  whatsapp: string;
  whatsappConsent: boolean;
}
```

- [x] Escrever casos para CPF com dígitos inválidos e sequências repetidas, e-mail malformado, telefone incompleto, consentimento ausente e estudante sem universidade.
- [x] Executar `npm run test -- tests/domain/registration.test.ts` e confirmar falha antes de implementar normalização e validação; usar valores sintéticos.
- [x] Implementar os campos da spec com erros associados por `aria-describedby`, autocomplete e preservação dos dados após erro.
- [x] Instalar Testing Library e ambiente DOM compatíveis; testar seleção de Estudante exibindo curso/semestre/universidade e troca de categoria removendo sua obrigatoriedade.
- [x] Exibir valor a partir das regras somente quando houver preço; a API recalculará o valor e não aceitará o total do cliente como autoridade.
- [x] Manter envio indisponível sem inscrições abertas; impedir cliques repetidos durante envio, sem depender disso para deduplicação no servidor.
- [x] Rodar `npm run test -- tests/domain/registration.test.ts tests/components/Formulario.test.tsx`, build e lint; registrar a tarefa.

**Saída:** formulário funcional em ambiente de desenvolvimento, ainda sem gerar cobranças reais.

## Tarefa 4 — Contrato HTTP e retorno seguro

**Arquivos:** criar `src/contracts/api.ts`, `src/services/registration-client.ts`, `src/components/inscricao/RegistrationResult.tsx`, `tests/components/RegistrationResult.test.tsx`.

**Interfaces propostas:**

```ts
import type { RegistrationInput } from '../domain/registration';
export type RegistrationState = 'pending' | 'confirmed' | 'expired' | 'paid_without_seat';
export interface RegistrationResult {
  status: RegistrationState;
  paymentUrl: string | null;
  reservationExpiresAt: string | null;
}
export interface RegistrationClient {
  submit(input: RegistrationInput, idempotencyKey: string): Promise<{ accepted: true }>;
  read(accessToken: string): Promise<RegistrationResult>;
  resume(accessToken: string, idempotencyKey: string): Promise<RegistrationResult>;
}
```

- [x] Definir `POST /api/registrations`, `POST /api/registrations/recovery`, `GET /api/registration` e `POST /api/registration/resume`; os dois últimos exigem token secreto enviado em header, nunca CPF como autorização.
- [x] Propor verificação de contato por link enviado ao WhatsApp cadastrado, reutilizando o canal existente. Tanto cadastro duplicado quanto recuperação retornam resposta pública genérica; nenhum CPF fornece acesso a dados ou substitui contato existente.
- [x] Documentar emissão, hash persistido, expiração de 30 minutos e troca do token por sessão curta; retirar token da URL após a troca. Tratar estes tempos como escolhas técnicas ajustáveis, sem alterar reserva de 24 horas.
- [x] Criar cliente HTTP e testes com transporte simulado injetado. Não empacotar servidor fictício ou sinalizador de cobrança falsa em produção.
- [x] Testar retorno pendente com link e prazo, link ainda indisponível, confirmado, expirado e pagamento recebido sem vaga; nunca derivar confirmação de query string de retorno do checkout.
- [x] Exibir mensagem genérica de recuperação e canal de suporte quando não houver acesso ao telefone original; alterações de contato dependem de conferência pela organização.
- [x] Rodar `npm run test -- tests/components/RegistrationResult.test.tsx`, build e lint; registrar a tarefa.

**Saída:** experiência do formulário e acompanhamento verificável com testes locais. A implementação do envio seguro de recuperação entra na tarefa 9 e exige modelo/custo de WhatsApp no levantamento da tarefa 6.

## Tarefa 5 — Regras de capacidade independentes de provedor

**Arquivos:** criar `src/domain/capacity.ts` e `tests/domain/capacity.test.ts`.

**Interfaces:** `reservationExpiresAt(nowMs: number, enabled: boolean): number | null`; `hasCapacity(capacity: number, confirmed: number, activeReservations: number): boolean`.

```ts
export const RESERVATION_MS = 24 * 60 * 60 * 1000;
export const reservationExpiresAt = (nowMs: number, enabled: boolean) =>
  enabled ? nowMs + RESERVATION_MS : null;
export const hasCapacity = (capacity: number, confirmed: number, activeReservations: number) =>
  confirmed + activeReservations < capacity;
```

- [x] Testar prazo exato de 24 horas, ausência de reserva quando desativada e limite 2.000 com 1.999 confirmados e uma reserva válida.
- [x] Testar que reservas concedidas antes de desativar a opção ainda contam até expirar; a nova configuração não apaga compromissos anteriores.
- [x] Executar `npm run test -- tests/domain/capacity.test.ts`, implementar regras e repetir até passar.
- [x] Documentar que a confirmação de quem já tem reserva consome sua própria vaga, sem contar reserva e confirmação duas vezes.
- [x] Registrar explicitamente que estes testes puros não provam segurança concorrente: a prova transacional pertence à tarefa 7.

**Saída:** regras portáveis prontas para uso por backend escolhido.

## Tarefa 6 — Escolhas técnicas e plano dos adaptadores

**Arquivos:** criar `docs/decisions/integrations.md` e `docs/superpowers/plans/2026-09-06-backend-adapters.md`; atualizar somente pendências resolvidas em `docs/spec.md`.

**Entrada:** requisitos anteriores e contas/condições comerciais informadas pela organização. Não exige programação nem fotografias de palestrantes.

- [ ] Comparar até duas opções viáveis por integração em documentação oficial atual: criação identificável/idempotente de cobrança, expiração, autenticação do webhook, consulta, estorno, meios aceitos e tarifas.
- [ ] Registrar na decisão de infraestrutura: runtime, banco transacional, migrations, execução agendada, fila/outbox, autenticação administrativa, segredos e ambientes de teste/produção.
- [ ] Registrar no WhatsApp: número, conta, mecanismo de envio, modelos de cobrança/confirmação/acesso/recuperação, callbacks de entrega, tratamento de timeouts e custos.
- [ ] Definir política operacional de estorno sem vaga, cancelamento e cobranças existentes após fechamento. Proposta: fechamento impede novas cobranças, mas processa as existentes segundo validade e capacidade; decisão final fica registrada antes de produção.
- [ ] Converter tarefas 7–11 em passos específicos do stack: arquivos exatos, migrations, handlers, comandos, fixtures e testes executáveis. Acrescentar os adaptadores concretos aos contratos abaixo, sem reformular o frontend inteiro.
- [ ] Registrar contato de suporte, retenção e política de acesso administrativo. Não colocar credenciais nos documentos.

**Saída:** decisão rastreável e complemento executável. Sem essa decisão, parar apenas a implementação dos adaptadores reais; tarefas 1–5 continuam válidas.

## Tarefa 7 — Persistência, inscrição e concorrência

**Arquivos lógicos:** `server/registrations/`, `server/events/`, migrations e testes de integração definidos no complemento da tarefa 6.

- [ ] Criar tabelas equivalentes a evento, inscrição, cobrança, reserva, consentimento, tokens/sessões, eventos recebidos, outbox e auditoria. Impor unicidade `(event_id, cpf_normalizado)`, identificador de cobrança e chave de evento externo.
- [ ] Implementar submissão idempotente com regras executadas no servidor; dados cadastrais não são sobrescritos por submissão duplicada.
- [ ] Serializar a decisão de capacidade no banco, usando lock por evento ou equivalente transacional. Confirmação, consumo de reserva e criação da notificação devem compartilhar transação.
- [ ] Implementar job de expiração idempotente, com horário do servidor; verificar prazo também durante consultas/transações para não depender da pontualidade do job.
- [ ] Testar 20 submissões simultâneas do mesmo CPF produzindo uma inscrição; testar duas confirmações simultâneas para a última vaga produzindo exatamente uma confirmação e uma exceção sem vaga.
- [ ] Testar consumo da última reserva pelo seu titular, migração entre configurações, retomada sem ampliar prazo de tentativa existente e proibição de diminuir capacidade abaixo dos compromissos.
- [ ] Rodar esses cenários em banco real descartável do stack, não em armazenamento em memória; executar comandos do complemento e registrar evidências.

**Saída:** núcleo persistente e concorrente, com pagamentos simulados apenas no ambiente de teste.

## Tarefa 8 — Cobrança, webhook e reconciliação

**Arquivo compartilhado:** `src/contracts/providers.ts`; adaptador e testes concretos no complemento da tarefa 6.

```ts
export interface ChargeRequest {
  registrationId: string;
  amountCents: number;
  currency: 'BRL';
  expiresAt: string | null;
  idempotencyKey: string;
}
export interface ChargeSnapshot {
  providerId: string;
  registrationId: string;
  amountCents: number;
  currency: 'BRL';
  status: 'pending' | 'approved' | 'expired' | 'cancelled' | 'refunded';
  paymentUrl: string | null;
}
export interface PaymentProvider {
  createCharge(input: ChargeRequest): Promise<ChargeSnapshot>;
  getCharge(providerId: string): Promise<ChargeSnapshot>;
  cancelCharge(providerId: string): Promise<void>;
}
```

- [ ] Implementar adaptador real e autenticação do webhook conforme documentação do fornecedor escolhido, incluindo leitura de corpo original quando exigida.
- [ ] Confirmar cobrança no provedor, correlacionar inscrição, valor e moeda, ignorar eventos repetidos ou regressivos e registrar recebimentos sem vaga.
- [ ] Em timeout de criação, consultar/reconciliar a mesma tentativa antes de gerar outra; nunca criar cegamente nova cobrança.
- [ ] Cancelar cobrança expirada quando suportado; reconciliar falhas e avisos tardios, incluindo caso em que duas cobranças antigas/novas sejam pagas para a mesma inscrição. Pagamento adicional não concede outra vaga.
- [ ] Testar assinatura inválida, valor divergente, duplicação, ordem invertida, timeout, pagamento tardio com/sem vaga e pagamento adicional; conferir no sandbox com eventos reais do fornecedor.
- [ ] Implementar processo de estorno aprovado na tarefa 6 e documentar ações humanas restantes no painel.

**Saída:** cobrança e confirmação verificadas de ponta a ponta no sandbox.

## Tarefa 9 — WhatsApp, recuperação e liberação de acesso

**Arquivos lógicos:** `server/notifications/`, `server/access/`, testes de entrega e recuperação definidos no complemento.

- [ ] Implementar outbox persistente com chave única por inscrição, finalidade e versão do acesso. Worker marca envio aceito separadamente de entrega e falha.
- [ ] Integrar modelos de solicitação/link, confirmação, acesso e recuperação. Recuperação sempre utiliza contato persistido e aplica limites por origem e destinatário.
- [ ] Agendar retentativas transitórias com backoff limitado; falhas permanentes e timeouts de resultado incerto aparecem para reconciliação, evitando prometer entrega exatamente uma vez quando o provedor não oferece essa garantia.
- [ ] Ao confirmar, verificar se acesso já foi liberado. Ao liberar, percorrer confirmados sem notificação correspondente; usar a mesma chave de deduplicação para eliminar corrida entre liberação e confirmação.
- [ ] Testar callback repetido, worker reiniciado, entrega falha, token expirado/reutilizado e liberação simultânea ao pagamento. Confirmar que pendentes e pagamentos sem vaga nunca recebem acesso.
- [ ] Testar com números autorizados de sandbox; não disparar mensagens para pessoas reais como teste sem autorização.

**Saída:** automação verificada, com falhas visíveis e recuperação segura.

## Tarefa 10 — Painel e operação administrativa

**Arquivos lógicos:** `src/admin/` e `server/admin/`, com rotas, auth e testes especificados na tarefa 6.

- [ ] Implementar login pelo mecanismo selecionado e autorização no servidor em todas as rotas administrativas, inclusive buscas e reenvios.
- [ ] Criar formulário de configuração com data/hora/fuso, preço, desconto, capacidade, reserva, abertura/fechamento e link/liberação. Mostrar efeito de alterações antes de salvar; validar os mesmos limites na API.
- [ ] Criar listagem paginada, busca por nome/CPF, detalhes, totais, mensagens com falha e exceções de pagamento. Nunca incluir link de transmissão no endpoint público do evento.
- [ ] Adicionar reenvio elegível, auditoria e acompanhamento do tratamento de pagamento sem vaga. Não adicionar CMS nem botão de aprovação financeira sem evidência.
- [ ] Testar chamadas diretas não autorizadas, configuração sem data, redução indevida de capacidade, alteração de preço sem mudar cobrança existente e tentativa de enviar acesso a pendente.
- [ ] Revisar teclado, estados vazios, mensagens de erro e ausência de dados sensíveis em logs/URLs.

**Saída:** organização consegue configurar e operar o evento sem alterar conteúdo editorial.

## Tarefa 11 — Materiais, validação final e lançamento

**Arquivos:** atualizar `src/content/event.ts`, assets oficiais, `README.md`; criar `tests/e2e/registration.spec.ts` e `docs/operations.md`; configurações de deploy específicas no complemento.

- [ ] Incorporar programação, palestrantes, logos oficiais, data, valor e políticas recebidas. Atualizar somente decisões afetadas na spec e neste plano; não substituir por exemplos de teste.
- [ ] Verificar primeiro `npm run lint`, `npm run build` e `npm run test`. Rodar E2E via script `test:e2e` definido no complemento.
- [ ] Validar no navegador e sandbox: profissional, estudante, duplicação de CPF, reserva ativa/inativa, expiração, última vaga, retomada segura, pagamento sem vaga, envio falho e acesso liberado antes/depois da confirmação.
- [ ] Verificar abertura condicionada à data e às integrações; preservar inscrições fechadas enquanto faltar algum pré-requisito operacional.
- [ ] Configurar HTTPS, segredos, migrations, worker, agendamento, logs sem CPF/tokens, backup e procedimento de restauração; ensaiar restauração em ambiente separado.
- [ ] Registrar em `docs/operations.md` como consultar falhas, reenviar mensagens, tratar pagamento sem vaga, fechar inscrições e reverter implantação sem apagar inscrições/pagamentos.
- [ ] Apresentar ambiente revisável antes do lançamento público; seguir autorização de publicação vigente. A implementação só fica concluída após verificações, não apenas com build aprovado.

**Saída:** sistema pronto para abertura quando os requisitos comerciais e operacionais estiverem preenchidos.

## Ordem e atualização

Executar 1 → 2 → 3 → 4 → 5. A escolha de fornecedores da tarefa 6 pode ocorrer durante esse período. Depois, executar 7 → 8 → 9 → 10 → 11; prototipação visual do painel pode ocorrer antes, mas autenticação e operação reais dependem do backend.

Não há necessidade de receber materiais para começar as primeiras cinco tarefas. A falta de fornecedores bloqueia adaptadores de produção; a falta de preço/data bloqueia abertura; a falta do link bloqueia sua liberação, mas não obriga adiar a estrutura da página.

## Conferência de cobertura

| Seção da spec | Tarefas |
| --- | --- |
| Evento, conteúdo, escopo e identidade | 1, 2, 11 |
| Formulário, desconto e CPF único | 1, 3, 4, 7 |
| Abertura, preço, capacidade e reserva | 1, 5, 7, 10 |
| Pagamento e exceções | 6, 7, 8 |
| WhatsApp e acesso | 4, 6, 9 |
| Painel | 6, 10 |
| Segurança, dados e operação | 4, 6–11 |
| Critérios de aceite e pendências | 6, 11 |

Este plano não afirma que testes ou integrações já foram executados. Os testes descritos são entregáveis da implementação futura.
