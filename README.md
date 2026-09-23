# Simpósio de Neurocirurgia · LANNcHSR

Landing page em React, TypeScript e Vite para “Neurocirurgia é tudo a Mesma Coisa?”. Implementação das tarefas 1–5 do plano: interface pública, formulário, regras puras e contratos para integração futura.

## Executar

Validado com Node.js 24 e npm. A instalação precisa incluir as dependências opcionais nativas da plataforma.

```bash
npm ci
npm run dev
```

O Vite usa a porta 5173. Para produção estática, o diretório gerado é `dist/`; a hospedagem deve encaminhar `/inscricao` para `index.html`, sem tratar `/api/*` como fallback HTML quando o backend for conectado.

## Verificar

```bash
npm test
npm run typecheck
npm run lint
npm run build
```

Os testes cobrem preço fixo para estudantes, abertura condicionada, validação e normalização de dados, máscaras e limites de CPF/WhatsApp, campos estudantis, falha de envio, cliques repetidos, idempotência da tentativa, retorno/recuperação, validade da cobrança e conteúdo e animação dos cards de palestrantes. Não comprovam transações de banco ou pagamentos reais, ainda inexistentes.

## Editar conteúdo e regras

- `src/content/event.ts`: textos e apoios do evento. `src/content/speakers.ts`: 10 temas e 12 palestrantes informados pela organização; duas fotos oficiais, imagem genérica nos demais cards, apresentações demonstrativas e CRMs pendentes sinalizados.
- `src/domain/event.ts`: configuração inicial fechada, preço fixo para estudantes e pré-requisitos para abertura. O backend futuro será a autoridade dessas configurações.
- `src/domain/registration.ts`: dados do participante e validação.
- `src/components/`: apresentação, formulário e acompanhamento.
- `src/contracts/api.ts` e `src/services/registration-client.ts`: fronteira da API; transporte injetável apenas nos testes.

## Estado atual e limitações

O evento será realizado em 20 e 21/02/2027, no fuso de Cuiabá (`America/Cuiaba`), e o frontend usa R$ 25,00 para o público geral e R$ 15,00 para estudantes. As inscrições continuam fechadas porque faltam os horários, a confirmação final dos valores e as integrações reais; `registrationsOpen` e `integrationsReady` permanecem falsos. No ambiente de desenvolvimento, uma prévia permite revisar o formulário fechado sem habilitar o envio. O semestre do estudante é selecionado em uma lista de 1º a 12º semestre e “Outro”.

`/inscricao` contém a interface de recuperação. O cliente HTTP está pronto para consumir os endpoints documentados, mas nenhum servidor está implementado. Chamadas sem backend exibem erro; não simulam envio de WhatsApp ou pagamento.

O token de retorno é recebido no fragmento, removido da URL antes da renderização e mantido apenas em memória. Validade, verificação de contato e unicidade serão impostas pelo backend. Não inserir dados pessoais reais nos testes.

O cérebro é uma imagem original de pontos e conexões, com movimento CSS discreto. A versão móvel/tablet é estática e mais leve; a preferência por redução de movimento desativa a animação. Não se trata de um modelo 3D interativo. O logotipo recebido foi mantido; cores e arquivo definitivo da marca ainda dependem da organização.

Os cards dos palestrantes entram em sequência quando a seção aparece na tela. Essa animação também respeita a preferência do sistema por movimento reduzido. As fotos de Dr. Giovani Mendes e Dr. Renato Santos já foram incorporadas; os outros 10 cards usam uma imagem genérica temporária. Onze apresentações curtas usam os dados profissionais recebidos e a apresentação de Dr. Luiz Felipe continua demonstrativa. Há 9 CRMs informados e 3 pendentes.

Antes dos palestrantes, a página apresenta uma grade responsiva com as 10 subespecialidades abordadas e uma descrição curta de cada área, sem numeração visual. Os rótulos “SUBESPECIALIDADES ABORDADAS” e “QUEM CONDUZ ESSA JORNADA” seguem o mesmo padrão visual `eyebrow`, em caixa alta.

A navegação utiliza Lenis para scroll inercial moderado. Títulos, textos, benefícios, FAQ, inscrição e rodapé são revelados uma única vez ao entrarem na tela. Os dois comportamentos respeitam `prefers-reduced-motion`.

Nenhuma publicação, integração financeira ou envio real foi realizado nesta etapa.

## Documentação

- [Spec](docs/spec.md)
- [Plano](docs/superpowers/plans/2026-09-06-simposio-neuro.md)
- [Pendências da organização](docs/pendencias.md)
- [Contrato de inscrições](docs/api-inscricoes.md)
- [Registro da implementação](docs/implementacao-etapas-1-5.md)
