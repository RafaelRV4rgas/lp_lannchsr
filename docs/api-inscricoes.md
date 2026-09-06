# Contrato de inscrições — tarefas 1–5

Implementado nesta etapa: tipos, cliente HTTP, validação das respostas e interfaces de solicitação/retorno/recuperação. **Nenhum endpoint está implementado ainda.** A persistência, autorização, deduplicação real, cobrança e mensagens pertencem às tarefas posteriores.

## Endpoints previstos

| Método e endereço | Entrada / autorização | Resposta |
| --- | --- | --- |
| `POST /api/registrations` | `RegistrationInput` normalizado; `Idempotency-Key` | `{ "accepted": true }` genérico |
| `POST /api/registrations/recovery` | CPF normalizado no corpo | `{ "accepted": true }` genérico, haja ou não cadastro |
| `GET /api/registration` | `Authorization: Bearer <token>` | `RegistrationResult` |
| `POST /api/registration/resume` | Bearer e `Idempotency-Key` | `RegistrationResult` |

`RegistrationResult`: `status` em `pending`, `confirmed`, `expired`, `paid_without_seat`; `paymentUrl` HTTPS ou nulo; `reservationExpiresAt` ISO com offset ou nulo. Os tipos estão em `src/contracts/api.ts`.

O cliente não envia preço nem status do pagamento. Recalcular e verificar ambos no backend. Sempre impor CPF único por evento, autenticação do token e capacidade em transações. Impedir alterações de contato por nova submissão para o mesmo CPF. Responder com erros genéricos sem revelar cadastro ou dados pessoais.

## Acesso e retomada

- A rota `/inscricao` mostra recuperação genérica; não consulta cadastro por CPF.
- O backend futuro deve enviar um link `/inscricao#token=<segredo>` ao contato verificado. O fragmento não é enviado ao servidor HTTP. O frontend o remove antes de montar a página e guarda o segredo somente em memória; não usa localStorage/sessionStorage.
- Nunca interpretar `?status=approved`, parâmetros de checkout ou retorno do navegador como confirmação. O estado vem exclusivamente de resposta validada da API autenticada.
- Proposta de validade do token: 30 minutos; emitir aleatoriamente, armazenar apenas hash e impor limite de tentativas no servidor. A implementação atual usa bearer diretamente; se a infraestrutura escolhida exigir troca por sessão, acrescentar endpoint e testes no plano de adaptadores. Não afirmar que validade ou autenticação já são impostas pelo frontend.
- Recarregar a página remove o acesso em memória e exige novo link. Essa limitação deliberada evita guardar credenciais no navegador.
- Em falha de consulta, permitir atualizar ou solicitar novo link. Em falha de recuperação, não afirmar que uma mensagem foi enviada.
- Reutilizar chave de idempotência após falha na mesma tentativa; alterar dados cria outra chave. A unicidade real é responsabilidade do servidor. Timeouts não comprovam que a solicitação não chegou.
- Respostas são lidas com `no-store`, sem redirects nem credenciais de cookies; timeout de 15 segundos. O backend e a hospedagem também precisam proibir cache desses endpoints.
- CPF e dados de contato não devem aparecer em URL ou logs. Tokens só seguem no header dos endpoints da mesma origem. Links de pagamento exigem HTTPS sem credenciais embutidas; o backend deverá restringir os destinos ao provedor escolhido.

## Limites desta entrega

Não existe cadastro confirmado, sessão real, cobrança, envio de WhatsApp, reserva persistida ou trava concorrente nesta versão. Testes usam transporte injetado e dados sintéticos; não há modo de pagamento fictício no bundle público. As inscrições ficam fechadas até definição de data, preço, estado da reserva e backend pronto.

A política completa de privacidade e a verificação do canal de contato continuam condicionadas às decisões em `docs/pendencias.md`. O formulário contém aviso factual de finalidade e autorização de WhatsApp para compor o fluxo quando estiver habilitado.
