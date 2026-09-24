# Simpósio de Neurocirurgia · LANNcHSR

Landing page em React, TypeScript e Vite para o simpósio on-line
**Neurocirurgia é tudo a Mesma Coisa?**, marcado para 20 e 21/02/2027.

## Fluxo do produto

O formulário inicia uma solicitação de inscrição. No fluxo operacional
planejado, o backend registrará os dados e enviará somente a primeira mensagem
pelo WhatsApp. A equipe continuará manualmente a conferência, validação da
carteirinha, pagamento, confirmação, dúvidas, reembolso e envio do acesso.

Backend, painel e WhatsApp real ainda não estão implementados. O formulário
fica disponível até 20/02/2027 às 00:00 no fuso de Cuiabá, mas o envio real
retornará erro enquanto o endpoint do backend não existir.

## Executar

Validado com Node.js 24 e npm:

```bash
npm ci
npm run dev
```

O Vite usa a porta 5173. A build estática é gerada em `dist/`.

## Verificar

```bash
npm test
npm run typecheck
npm run lint
npm run build
```

Os testes cobrem regras de abertura, preços, validação e normalização do
formulário, campos estudantis, acessibilidade, falha de transporte,
idempotência, conteúdo e animações. Eles não comprovam persistência, mensagens
ou pagamentos reais, pois esses serviços ainda não existem.

## Conteúdo e código

- `src/content/event.ts`: textos, benefícios, FAQ, temas e referências aos
  palestrantes.
- `src/content/speakers.ts`: palestrantes e apresentações.
- `src/content/rules.ts`: configuração atual do evento.
- `src/domain/symposium.ts`: regras puras do simpósio e abertura das
  solicitações.
- `src/domain/registration.ts`: dados, máscaras, normalização e validação do
  formulário.
- `src/components/`: apresentação e experiência da landing page.
- `src/contracts/api.ts` e `src/services/registration-client.ts`: fronteira
  mínima para o futuro envio da solicitação.

## Estado e limitações

- Valores atualmente configurados: R$ 25,00 geral e R$ 15,00 estudante; falta
  confirmação final.
- A categoria estudante dependerá da conferência manual da carteirinha pelo
  WhatsApp.
- O formulário não recebe carteirinha nem comprovante.
- Novas solicitações são bloqueadas a partir de 20/02/2027 às 00:00 no fuso
  `America/Cuiaba`.
- Não há consulta, recuperação, cobrança, confirmação ou acesso automáticos.
- Horários, materiais de marca, alguns dados de palestrantes, contato oficial
  e política completa de privacidade continuam pendentes.

## Documentação canônica

- [Visão geral](docs/visao-geral.md)
- [Regras do simpósio](docs/simposio/regras.md)
- [Landing page](docs/landing-page/especificacao.md)
- [Backend futuro](docs/backend/especificacao.md)
- [Painel futuro](docs/painel/especificacao.md)
- [Operação manual](docs/operacao/fluxo-manual.md)
- [Roadmap](docs/roadmap/automacoes-futuras.md)
- [Pendências](docs/pendencias.md)

Os arquivos em `docs/historico/` documentam o fluxo automatizado anterior e
não representam a especificação vigente.
