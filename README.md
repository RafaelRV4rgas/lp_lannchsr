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

Os testes cobrem desconto/arredondamento, abertura condicionada, validação e normalização de dados, campos estudantis, falha de envio, cliques repetidos, idempotência da tentativa, retorno/recuperação e reserva/capacidade. Não comprovam transações de banco ou pagamentos reais, ainda inexistentes.

## Editar conteúdo e regras

- `src/content/event.ts`: textos, programação, palestrantes e apoios. Listas de palestrantes/programação começam vazias, sem informações fictícias.
- `src/domain/event.ts`: configuração inicial fechada, desconto de 10%, capacidade de 2.000 e escolha da reserva ainda nula. O backend futuro será a autoridade dessas configurações.
- `src/domain/registration.ts`: dados do participante e validação.
- `src/domain/capacity.ts`: regras puras de reserva de 24 horas e contagem de vagas.
- `src/components/`: apresentação, formulário e acompanhamento.
- `src/contracts/api.ts` e `src/services/registration-client.ts`: fronteira da API; transporte injetável apenas nos testes.

## Estado atual e limitações

Sem data, preço e integrações, a página não coleta inscrições: mostra “Inscrições em breve”. O formulário habilitado é exercitado nos testes de componentes com configuração sintética, sem flag pública para abrir um checkout fictício.

`/inscricao` contém a interface de recuperação. O cliente HTTP está pronto para consumir os endpoints documentados, mas nenhum servidor está implementado. Chamadas sem backend exibem erro; não simulam envio de WhatsApp, reserva ou pagamento.

O token de retorno é recebido no fragmento, removido da URL antes da renderização e mantido apenas em memória. Validade, verificação de contato, unicidade e capacidade transacional serão impostas pelo backend. Não inserir dados pessoais reais nos testes.

O cérebro é uma imagem original de pontos e conexões, com movimento CSS discreto. A versão móvel/tablet é estática e mais leve; a preferência por redução de movimento desativa a animação. Não se trata de um modelo 3D interativo. O logotipo recebido foi mantido; cores e arquivo definitivo da marca ainda dependem da organização.

Nenhuma publicação, integração financeira ou envio real foi realizado nesta etapa.

## Documentação

- [Spec](docs/spec.md)
- [Plano](docs/superpowers/plans/2026-09-06-simposio-neuro.md)
- [Pendências da organização](docs/pendencias.md)
- [Contrato de inscrições](docs/api-inscricoes.md)
- [Registro da implementação](docs/implementacao-etapas-1-5.md)
