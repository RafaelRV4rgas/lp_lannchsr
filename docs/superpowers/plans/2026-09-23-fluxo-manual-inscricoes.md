# Fluxo Manual de Solicitações de Inscrição — Implementation Plan

> Plano executado e preservado como registro. A regra de disponibilidade aqui
> descrita foi substituída em 24/09/2026 por `registrationClosesAt`; consulte a
> documentação canônica em `docs/landing-page/especificacao.md`.

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Atualizar a landing page para representar somente uma solicitação de inscrição seguida de atendimento manual pelo WhatsApp e reorganizar a documentação por responsabilidade.

**Architecture:** O domínio do simpósio concentra somente regras independentes da interface; a landing page mantém apresentação, validação imediata e envio idempotente da solicitação. O fluxo automático de consulta, cobrança, recuperação e retomada é removido do frontend, enquanto backend, painel, operação manual e automações futuras passam a ter documentos canônicos separados.

**Tech Stack:** React 19, TypeScript 6, Vite 8, Vitest 5, Testing Library, oxlint.

**Spec:** `docs/superpowers/specs/2026-09-23-fluxo-manual-inscricoes-design.md`

## Global Constraints

- Esta entrega modifica somente landing page, testes e documentação; não cria backend, painel, banco ou integração real com WhatsApp.
- A versão pública mantém as solicitações fechadas enquanto o backend não existir.
- A prévia de desenvolvimento exibe o formulário, mas nunca envia quando as solicitações estão fechadas.
- A primeira mensagem automática pertence ao backend futuro; nenhum envio real é adicionado nesta branch.
- O frontend não oferece recuperação, acompanhamento, retomada, link, vencimento ou estado de pagamento.
- A carteirinha e o comprovante são tratados manualmente no WhatsApp e nunca enviados pelo formulário.
- Textos públicos usam “solicitação de inscrição” até a confirmação manual.
- Não adicionar dependências.
- Preservar máscaras, validações, acessibilidade, chave de idempotência, prevenção de duplo clique e dados preenchidos após falha.

## Review Focus

- Prévia fechada: preencher dados válidos e clicar em “Solicitar inscrição” não pode chamar `onSubmit`; coberto na Tarefa 3.
- Falha incerta: repetir a mesma submissão depois de timeout deve reutilizar a chave de idempotência; coberto na Tarefa 3.
- Linguagem enganosa: sucesso, FAQ e formulário não podem afirmar pagamento, confirmação ou acesso automáticos; coberto nas Tarefas 3 e 4.
- Resquícios do fluxo antigo: `/inscricao`, fragmento `token`, `paymentUrl`, `resume` e `recover` não podem continuar no bundle; coberto na Tarefa 2.
- Separação documental: backend, painel e modo híbrido devem aparecer como futuros, nunca como implementados; coberto na Tarefa 5.

---

## Mapa de arquivos

### Domínio e conteúdo

- `src/domain/symposium.ts`: regras puras do simpósio, disponibilidade da solicitação e formatação de preço.
- `src/domain/registration.ts`: formato, normalização e validação dos dados solicitados no formulário.
- `src/content/rules.ts`: configuração editorial/operacional atual do simpósio.
- `src/content/event.ts`: conteúdo público e FAQ.

### Landing page

- `src/components/formulario/Formulario.tsx`: jornada do formulário, textos e estados locais.
- `src/services/registration-client.ts`: único transporte futuro para `POST /api/registrations`.
- `src/contracts/api.ts`: contrato mínimo da solicitação e seu aceite genérico.
- `src/main.tsx`: montagem exclusiva da landing page, sem rota de acompanhamento.

### Remoções

- `src/domain/event.ts`: substituído por `src/domain/symposium.ts`.
- `src/components/inscricao/RegistrationPage.tsx`: fluxo de recuperação removido.
- `src/components/inscricao/RegistrationResult.tsx`: fluxo financeiro removido.
- `tests/components/RegistrationPage.test.tsx`: teste do fluxo removido.
- `tests/components/RegistrationResult.test.tsx`: teste do fluxo removido.

### Documentação

- `docs/visao-geral.md`: mapa canônico do produto e estado real.
- `docs/simposio/regras.md`: decisões do evento e regras comerciais.
- `docs/landing-page/especificacao.md`: comportamento implementado na página.
- `docs/backend/especificacao.md`: comportamento futuro do backend.
- `docs/painel/especificacao.md`: comportamento futuro do painel.
- `docs/operacao/fluxo-manual.md`: roteiro humano da organização.
- `docs/roadmap/automacoes-futuras.md`: modo híbrido e mensagens futuras.
- `docs/pendencias.md`: pendências revisadas para o novo fluxo.
- `docs/historico/*`: documentos antigos com aviso de substituição.
- `README.md`: comandos, estado atual e links canônicos.

---

### Task 1: Separar as regras do simpósio do domínio antigo

**Files:**
- Create: `src/domain/symposium.ts`
- Modify: `src/content/rules.ts`
- Modify: `src/content/event.ts`
- Modify: `src/App.tsx`
- Modify: `src/components/formulario/Formulario.tsx`
- Modify: `src/components/hero/Hero.tsx`
- Modify: `tests/domain/event.test.ts`
- Modify: `tests/components/Formulario.test.tsx`
- Modify: `tests/components/Hero.test.tsx`
- Delete: `src/domain/event.ts`

**Interfaces:**
- Produces: `SymposiumRules`, `calculatePriceCents(base, studentPrice, student)`, `canOpenRequests(rules)`, `requestsAvailable(rules)` e `formatPrice(cents)`.
- Consumes: nenhuma interface nova; preserva os valores atuais de `src/content/rules.ts`.

- [ ] **Step 1: Atualizar o teste de domínio para a nova linguagem**

Renomear `tests/domain/event.test.ts` para `tests/domain/symposium.test.ts` e substituir imports e expectativas centrais:

```ts
import {
  calculatePriceCents,
  canOpenRequests,
  requestsAvailable,
  type SymposiumRules,
} from '../../src/domain/symposium'

const closedRules: SymposiumRules = {
  startsAt: '',
  timeZone: null,
  requestsOpen: false,
  basePriceCents: 2500,
  studentPriceCents: 1500,
  backendReady: false,
}

it('requires event data, prices and backend before requests can open', () => {
  const ready = {
    ...closedRules,
    startsAt: '2027-03-10T13:00:00-04:00',
    timeZone: 'America/Cuiaba',
    backendReady: true,
  }
  expect(canOpenRequests(ready)).toBe(true)
  expect(requestsAvailable(ready)).toBe(false)
  expect(requestsAvailable({ ...ready, requestsOpen: true })).toBe(true)
})
```

Manter os testes de data inválida, fuso inválido, preços inválidos e preço estudantil fixo, trocando apenas os nomes do domínio.

- [ ] **Step 2: Executar o teste e confirmar a falha**

Run: `npm test -- tests/domain/symposium.test.ts`

Expected: FAIL porque `src/domain/symposium.ts` ainda não existe.

- [ ] **Step 3: Criar o domínio do simpósio**

Mover as regras puras de `src/domain/event.ts` para `src/domain/symposium.ts` e usar esta interface:

```ts
export interface SymposiumRules {
  startsAt: string
  timeZone: string | null
  requestsOpen: boolean
  basePriceCents: number | null
  studentPriceCents: number
  backendReady: boolean
}

export function canOpenRequests(rules: SymposiumRules): boolean {
  // Reutilizar a validação atual de data, fuso e preços.
  // Trocar integrationsReady por backendReady.
}

export const requestsAvailable = (rules: SymposiumRules): boolean =>
  rules.requestsOpen && canOpenRequests(rules)
```

Preservar sem alteração comportamental `calculatePriceCents`, a validação de data e `formatPrice`.

- [ ] **Step 4: Atualizar todos os consumidores**

Em `src/content/rules.ts`, usar os novos nomes:

```ts
export const rules: Readonly<SymposiumRules> = Object.freeze({
  startsAt: '',
  timeZone: 'America/Cuiaba',
  requestsOpen: false,
  basePriceCents: 2500,
  studentPriceCents: 1500,
  backendReady: false,
})
```

Trocar imports de `domain/event` por `domain/symposium` e chamadas de
`registrationsAvailable` por `requestsAvailable` em `App.tsx`, `Hero.tsx`,
`Formulario.tsx`, conteúdo e testes. Remover `src/domain/event.ts` quando `rg
"domain/event|EventRules|registrationsAvailable" src tests` não encontrar
consumidores.

- [ ] **Step 5: Executar os testes afetados**

Run: `npm test -- tests/domain/symposium.test.ts tests/components/Formulario.test.tsx tests/components/Hero.test.tsx`

Expected: PASS.

- [ ] **Step 6: Verificar tipos e registrar o commit**

Run: `npm run typecheck`

Expected: PASS.

```bash
git add src/domain/symposium.ts src/content/rules.ts src/content/event.ts src/App.tsx src/components/formulario/Formulario.tsx src/components/hero/Hero.tsx tests/domain/symposium.test.ts tests/components/Formulario.test.tsx tests/components/Hero.test.tsx
git add -u src/domain/event.ts tests/domain/event.test.ts
git commit -m "refactor: separate symposium request rules"
```

---

### Task 2: Remover acompanhamento e reduzir o contrato HTTP

**Files:**
- Modify: `src/contracts/api.ts`
- Modify: `src/services/registration-client.ts`
- Modify: `src/main.tsx`
- Modify: `tests/registration-client.test.ts`
- Delete: `src/components/inscricao/RegistrationPage.tsx`
- Delete: `src/components/inscricao/RegistrationResult.tsx`
- Delete: `tests/components/RegistrationPage.test.tsx`
- Delete: `tests/components/RegistrationResult.test.tsx`

**Interfaces:**
- Consumes: `RegistrationInput` de `src/domain/registration.ts`.
- Produces: `RegistrationClient.submit(input: RegistrationInput, idempotencyKey: string): Promise<{ accepted: true }>`.

- [ ] **Step 1: Substituir os testes do cliente pelo contrato mínimo**

Reescrever `tests/registration-client.test.ts` com estes casos:

```ts
it('submits one registration request with its idempotency key', async () => {
  const transport = vi.fn().mockResolvedValue(
    new Response(JSON.stringify({ accepted: true })),
  )
  const client = createRegistrationClient(transport)
  await expect(client.submit(validInput, 'request-key')).resolves.toEqual({
    accepted: true,
  })
  expect(transport).toHaveBeenCalledWith(
    '/api/registrations',
    expect.objectContaining({
      method: 'POST',
      headers: expect.objectContaining({ 'Idempotency-Key': 'request-key' }),
      body: JSON.stringify(validInput),
    }),
  )
  expect(Object.keys(client)).toEqual(['submit'])
})

it('rejects empty keys, HTTP errors and malformed accepts', async () => {
  // Confirmar que chave vazia não chama fetch; status 500 e
  // `{ accepted: false }` rejeitam a Promise.
})
```

Importar `validInput` de `tests/domain/registration.test.ts` ou definir um
fixture local completo para impedir acoplamento de ordem entre testes.

- [ ] **Step 2: Executar o teste e confirmar a falha**

Run: `npm test -- tests/registration-client.test.ts`

Expected: FAIL porque o cliente ainda expõe `recover`, `read` e `resume` além
de `submit`.

- [ ] **Step 3: Reduzir o contrato público**

Substituir `src/contracts/api.ts` por:

```ts
import type { RegistrationInput } from '../domain/registration'

export interface RegistrationClient {
  submit(
    input: RegistrationInput,
    idempotencyKey: string,
  ): Promise<{ accepted: true }>
}
```

Remover `RegistrationState`, `RegistrationResult`, `safePaymentUrl` e
`parseRegistrationResult`.

Em `src/services/registration-client.ts`, manter somente `submit`, a validação
da chave, `POST /api/registrations`, timeout, `no-store`, `credentials: omit`,
`redirect: error` e a validação estrita de `{ accepted: true }`. Remover
`recover`, `read`, `resume`, bearer token e imports de CPF.

- [ ] **Step 4: Remover a rota e os componentes antigos**

Reduzir `src/main.tsx` para montar sempre `<App />`:

```tsx
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

Excluir os dois componentes em `src/components/inscricao/` e seus dois testes.

- [ ] **Step 5: Provar que o fluxo antigo saiu do frontend**

Run:

```bash
rg -n "RegistrationPage|RegistrationResult|paymentUrl|paymentExpiresAt|accessToken|\.recover\(|\.resume\(|\.read\(" src tests
```

Expected: nenhum resultado.

Run: `npm test -- tests/registration-client.test.ts`

Expected: PASS.

- [ ] **Step 6: Verificar tipos e registrar o commit**

Run: `npm run typecheck`

Expected: PASS.

```bash
git add src/contracts/api.ts src/services/registration-client.ts src/main.tsx tests/registration-client.test.ts
git add -u src/components/inscricao/RegistrationPage.tsx src/components/inscricao/RegistrationResult.tsx tests/components/RegistrationPage.test.tsx tests/components/RegistrationResult.test.tsx
git commit -m "refactor: remove automated registration follow-up"
```

---

### Task 3: Atualizar a jornada e os textos do formulário

**Files:**
- Modify: `src/components/formulario/Formulario.tsx`
- Modify: `src/components/formulario/Formulario.css`
- Modify: `tests/components/Formulario.test.tsx`

**Interfaces:**
- Consumes: `SymposiumRules`, `requestsAvailable`, `RegistrationInput` e `RegistrationClient.submit`.
- Produces: formulário acessível com estados `idle | sending | accepted | error` e linguagem de solicitação manual.

- [ ] **Step 1: Adicionar testes para a nova mensagem de sucesso**

No caso de envio bem-sucedido, exigir:

```ts
expect(screen.getByRole('status')).toHaveTextContent('Solicitação recebida')
expect(screen.getByRole('status')).toHaveTextContent(
  /continuará o atendimento.*WhatsApp/i,
)
expect(screen.getByRole('status')).toHaveTextContent(
  /ainda não confirma sua inscrição/i,
)
expect(screen.queryByText(/link de pagamento/i)).not.toBeInTheDocument()
```

Adicionar um teste que selecione estudante e exija a orientação sobre
carteirinha:

```ts
expect(
  screen.getByText(/carteirinha será conferida.*WhatsApp/i),
).toBeVisible()
expect(screen.queryByLabelText(/carteirinha|comprovante/i)).not.toBeInTheDocument()
```

- [ ] **Step 2: Adicionar testes para consentimento, privacidade e prévia**

Exigir o texto aprovado no checkbox:

```ts
expect(screen.getByRole('checkbox')).toHaveAccessibleName(
  /conferir os dados.*orientar o pagamento.*confirmar a inscrição/i,
)
```

Exigir o aviso visível:

```ts
expect(screen.getByText(/não envie carteirinha ou comprovante/i)).toBeVisible()
```

No teste de prévia fechada, preencher todos os campos válidos, clicar e
confirmar `expect(onSubmit).not.toHaveBeenCalled()`.

- [ ] **Step 3: Executar os novos testes e confirmar a falha**

Run: `npm test -- tests/components/Formulario.test.tsx`

Expected: FAIL nos textos e no aviso ainda ausente.

- [ ] **Step 4: Implementar a cópia aprovada**

No formulário aberto, inserir antes dos campos:

```tsx
<p className="form-process-note">
  Ao enviar este formulário, você solicitará sua inscrição. Nossa equipe
  continuará o atendimento pelo WhatsApp para conferir os dados e enviar as
  orientações de pagamento. A inscrição somente será confirmada após essa
  etapa.
</p>
```

Quando `student` for verdadeiro, exibir junto aos campos acadêmicos:

```tsx
<p className="student-verification-note">
  A carteirinha será conferida posteriormente pelo WhatsApp. Não envie o
  documento por este formulário.
</p>
```

Restaurar o aviso de privacidade como elemento visível:

```tsx
<p className="form-privacy">
  Os dados informados serão utilizados para processar sua solicitação de
  inscrição e realizar o atendimento relacionado ao evento. A condição de
  estudante será conferida manualmente pelo WhatsApp. Não envie carteirinha ou
  comprovante de pagamento por este formulário.
</p>
```

Usar o consentimento aprovado na especificação. Alterar o botão em envio para
`Enviando solicitação…`. Alterar o rodapé para `O envio do formulário ainda
não confirma sua inscrição.`

No estado aceito, usar:

```tsx
<div className="registration-card" role="status">
  <h3>Solicitação recebida</h3>
  <p>
    Enviaremos uma mensagem para o WhatsApp informado. Nossa equipe continuará
    o atendimento por lá para conferir seus dados e fornecer as orientações de
    pagamento.
  </p>
  <p>O envio do formulário ainda não confirma sua inscrição.</p>
</div>
```

- [ ] **Step 5: Ajustar apenas o CSS necessário**

Em `Formulario.css`, reutilizar os tokens atuais e adicionar regras para
`.form-process-note`, `.student-verification-note` e `.form-privacy` somente
se forem necessárias para hierarquia e espaçamento. Não alterar layout global,
cores ou tipografia fora do formulário.

- [ ] **Step 6: Executar testes de formulário e domínio**

Run: `npm test -- tests/components/Formulario.test.tsx tests/domain/registration.test.ts tests/domain/symposium.test.ts`

Expected: PASS.

- [ ] **Step 7: Registrar o commit**

```bash
git add src/components/formulario/Formulario.tsx src/components/formulario/Formulario.css tests/components/Formulario.test.tsx
git commit -m "feat: describe manual registration request flow"
```

---

### Task 4: Alinhar FAQ e conteúdo público ao atendimento manual

**Files:**
- Modify: `src/content/event.ts`
- Modify: `tests/components/EventSections.test.tsx`

**Interfaces:**
- Consumes: preços do núcleo do simpósio por `formatPrice`.
- Produces: FAQ que descreve conferência, pagamento, confirmação e acesso manuais sem prometer automação.

- [ ] **Step 1: Escrever testes de conteúdo para o novo fluxo**

Adicionar a `tests/components/EventSections.test.tsx`:

```ts
it('describes manual follow-up without promising automated payment or access', () => {
  render(<EventSections content={eventContent} />)
  expect(screen.getByText(/equipe continuará o atendimento pelo WhatsApp/i)).toBeVisible()
  expect(screen.getByText(/carteirinha.*WhatsApp/i)).toBeVisible()
  expect(screen.getByText(/confirmação.*após.*pagamento/i)).toBeVisible()
  expect(screen.queryByText(/sistema enviará|automaticamente/i)).not.toBeInTheDocument()
})
```

Usar expressões alinhadas ao texto final; não depender de pontuação exata.

- [ ] **Step 2: Executar o teste e confirmar a falha**

Run: `npm test -- tests/components/EventSections.test.tsx`

Expected: FAIL porque a FAQ ainda afirma envio automático e autodeclaração sem comprovante.

- [ ] **Step 3: Atualizar as respostas da FAQ**

Usar estas ideias sem ampliar o escopo:

- **Como funcionarão a inscrição e o pagamento?** O formulário envia uma
  solicitação; a equipe continua pelo WhatsApp, confere os dados e envia
  manualmente as orientações de pagamento; confirmação ocorre depois da
  conferência do pagamento.
- **Estudantes terão valor especial?** Estudantes de qualquer curso podem
  receber o valor estudantil após conferência manual das informações e da
  carteirinha pelo WhatsApp; se a condição não for validada, permanece possível
  participar pelo valor geral.
- **Como receberei o acesso e o certificado?** A equipe enviará manualmente o
  acesso aos participantes confirmados; certificados continuam sob
  responsabilidade da organização.

Remover frases que afirmem “o sistema envia”, “autodeclaração sem comprovante”
ou confirmação automática.

- [ ] **Step 4: Executar testes de conteúdo**

Run: `npm test -- tests/components/EventSections.test.tsx`

Expected: PASS.

- [ ] **Step 5: Registrar o commit**

```bash
git add src/content/event.ts tests/components/EventSections.test.tsx
git commit -m "content: align faq with manual enrollment process"
```

---

### Task 5: Criar a documentação canônica e arquivar o fluxo anterior

**Files:**
- Create: `docs/visao-geral.md`
- Create: `docs/simposio/regras.md`
- Create: `docs/landing-page/especificacao.md`
- Create: `docs/backend/especificacao.md`
- Create: `docs/painel/especificacao.md`
- Create: `docs/operacao/fluxo-manual.md`
- Create: `docs/roadmap/automacoes-futuras.md`
- Create by move: `docs/historico/spec-1.4.md`
- Create by move: `docs/historico/api-inscricoes-automatizada.md`
- Create by move: `docs/historico/implementacao-etapas-1-5.md`
- Modify: `docs/pendencias.md`
- Modify: `docs/superpowers/plans/2026-09-06-simposio-neuro.md`
- Modify: `README.md`
- Delete by move: `docs/spec.md`
- Delete by move: `docs/api-inscricoes.md`
- Delete by move: `docs/implementacao-etapas-1-5.md`

**Interfaces:**
- Consumes: design aprovado em `docs/superpowers/specs/2026-09-23-fluxo-manual-inscricoes-design.md`.
- Produces: sete documentos canônicos, README navegável e três documentos históricos claramente marcados.

- [ ] **Step 1: Mover os documentos substituídos para o histórico**

Criar `docs/historico/` e mover:

```bash
mv docs/spec.md docs/historico/spec-1.4.md
mv docs/api-inscricoes.md docs/historico/api-inscricoes-automatizada.md
mv docs/implementacao-etapas-1-5.md docs/historico/implementacao-etapas-1-5.md
```

Adicionar no topo de cada arquivo:

```md
> **Documento histórico:** este arquivo descreve o fluxo automatizado anterior
> e não representa a especificação vigente. Consulte `docs/visao-geral.md`.
```

Adicionar aviso equivalente ao plano antigo
`docs/superpowers/plans/2026-09-06-simposio-neuro.md`, sem movê-lo.

- [ ] **Step 2: Escrever a visão geral e as regras do simpósio**

`docs/visao-geral.md` deve conter:

- objetivo do produto;
- diagrama textual landing → backend futuro → primeira mensagem → atendimento
  manual;
- tabela “implementado / especificado / roadmap”;
- links para todos os documentos canônicos;
- aviso de que solicitações permanecem fechadas.

`docs/simposio/regras.md` deve registrar somente fatos e regras do evento:

- nome, organização, presidência, datas, formato e público;
- categorias e valores atualmente configurados, ainda sujeitos à confirmação;
- carteirinha obrigatória para valor estudantil;
- uma inscrição por CPF/evento;
- pagamento manualmente conferido;
- reembolso concluído cancela inscrição;
- acesso somente para confirmados e não reembolsados.

Não incluir endpoints, componentes React ou escolha de provedor.

- [ ] **Step 3: Escrever a especificação canônica da landing page**

`docs/landing-page/especificacao.md` deve reproduzir, sem contradizer o código:

- seções públicas existentes;
- jornada antes/durante/depois do envio;
- campos e validações;
- consentimento e aviso resumido aprovados;
- prévia local não enviável;
- ausência de consulta, cobrança ou acompanhamento;
- acessibilidade e critérios de aceite específicos da página.

Marcar claramente o cliente HTTP como fronteira pronta para um backend ainda
inexistente.

- [ ] **Step 4: Escrever backend, painel e operação manual**

`docs/backend/especificacao.md` deve começar com **Status: não implementado** e
descrever cadastro por CPF/evento, sobrescrita apenas enquanto não confirmado,
idempotência, primeira mensagem, falhas, segurança e endpoints conceituais.

`docs/painel/especificacao.md` deve começar com **Status: não implementado** e
descrever os estados aprovados, transições, validação estudantil, pagamento,
reembolso, cancelamento, acesso, permissões e auditoria.

`docs/operacao/fluxo-manual.md` deve descrever passos humanos, sem prometer
recursos do painel inexistente:

1. receber a solicitação;
2. continuar o contato;
3. conferir carteirinha quando aplicável;
4. definir categoria e valor;
5. enviar instruções;
6. conferir comprovante;
7. confirmar;
8. tratar reembolso;
9. enviar acesso.

- [ ] **Step 5: Escrever o roadmap sem transformar ideias em escopo atual**

`docs/roadmap/automacoes-futuras.md` deve marcar todos os itens como futuros e
registrar:

- modo financeiro híbrido;
- identificador de cobrança persistido;
- provedor como fonte confiável de pagamento, reembolso e contestação;
- webhooks;
- mensagens padronizadas pelo painel;
- mensagem para CPF confirmado reenviado;
- recuperação segura e autocorreção;
- automação gradual, sem data prometida.

- [ ] **Step 6: Revisar pendências e README**

Em `docs/pendencias.md`:

- retirar a escolha imediata de provedor financeiro como bloqueio da landing;
- manter preços finais, contato oficial, privacidade e horários como pendências;
- adicionar procedimento operacional de reembolso manual;
- substituir “autodeclaração sem comprovante” por conferência de carteirinha;
- separar bloqueios de abertura dos itens do roadmap híbrido;
- afirmar que backend, painel e WhatsApp real ainda não existem.

No `README.md`:

- resumir o novo fluxo;
- manter comandos de execução e verificação;
- atualizar “Estado atual e limitações”;
- listar apenas documentos canônicos;
- indicar que os arquivos em `docs/historico/` não são vigentes.

- [ ] **Step 7: Verificar coerência documental**

Run:

```bash
rg -n "autodeclaração|link de pagamento enviado automaticamente|confirmação automática|acesso enviado pelo sistema" README.md docs --glob '!docs/historico/**' --glob '!docs/superpowers/specs/**' --glob '!docs/superpowers/plans/2026-09-23-fluxo-manual-inscricoes.md'
```

Expected: nenhum resultado que descreva essas expressões como fluxo vigente.

Run:

```bash
rg -n "Status: não implementado" docs/backend/especificacao.md docs/painel/especificacao.md
rg -n "modo financeiro híbrido|webhook|mensagens padronizadas" docs/roadmap/automacoes-futuras.md
```

Expected: backend e painel possuem o aviso; o roadmap contém os três temas.

- [ ] **Step 8: Registrar o commit**

```bash
git add README.md docs
git commit -m "docs: separate symposium product responsibilities"
```

---

### Task 6: Verificação integral e limpeza final

**Files:**
- Modify only if verification exposes an issue: files already listed in Tasks 1–5.

**Interfaces:**
- Consumes: todos os resultados das tarefas anteriores.
- Produces: branch verificável, sem código morto ou promessas conflitantes.

- [ ] **Step 1: Executar a suíte completa**

Run: `npm test`

Expected: todos os testes passam, sem testes de `RegistrationPage` ou
`RegistrationResult`.

- [ ] **Step 2: Executar verificações estáticas e build**

Run: `npm run typecheck`

Expected: PASS.

Run: `npm run lint`

Expected: PASS.

Run: `npm run build`

Expected: PASS e geração de `dist/`.

- [ ] **Step 3: Buscar resíduos funcionais do fluxo removido**

Run:

```bash
rg -n "RegistrationPage|RegistrationResult|paymentUrl|paymentExpiresAt|accessToken|Retomar inscrição|Pagar inscrição|Solicitar link seguro" src tests
```

Expected: nenhum resultado.

Run:

```bash
rg -n "pré-aprovada|autodeclaração|confirmação será enviada|link de pagamento" src README.md docs --glob '!docs/historico/**' --glob '!docs/superpowers/specs/**' --glob '!docs/superpowers/plans/**'
```

Expected: nenhum texto público ou documento canônico descreve o fluxo antigo.
Referências explícitas no roadmap a funcionalidades futuras são aceitáveis se
estiverem marcadas como futuras.

- [ ] **Step 4: Revisar o diff e a situação do repositório**

Run: `git diff --check`

Expected: nenhuma mensagem.

Run: `git status --short`

Expected: somente alterações deliberadas ainda não commitadas, ou saída vazia
se todas as tarefas já foram registradas.

- [ ] **Step 5: Corrigir somente falhas encontradas e registrar, se necessário**

Se qualquer comando anterior falhar, corrigir a menor causa possível, repetir
o comando que falhou e depois repetir toda a sequência da Tarefa 6.

Se houver correções adicionais:

```bash
git add <arquivos-corrigidos>
git commit -m "fix: complete manual registration flow migration"
```

- [ ] **Step 6: Fazer revisão final da branch**

Comparar a branch com `ajustes-gerais`:

```bash
git diff --stat ajustes-gerais...HEAD
git log --oneline ajustes-gerais..HEAD
```

Confirmar que a branch contém apenas a especificação, a migração da landing
page, os testes e a reorganização documental aprovados.
