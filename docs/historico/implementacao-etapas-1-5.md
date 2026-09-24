> **Documento histórico:** este arquivo descreve o fluxo automatizado anterior
> e não representa a especificação vigente. Consulte `docs/visao-geral.md`.

# Registro da implementação — tarefas 1–5

Criado em 06/09/2026 e atualizado em 23/09/2026. Implementação atualmente mantida na branch de trabalho do projeto.

## Entregas

| Tarefa | Resultado |
| --- | --- |
| 1 — Conteúdo e estados | Conteúdo centralizado; abertura explícita condicionada a data, fuso, preço e integrações; cálculo em centavos com aritmética inteira |
| 2 — Página imersiva | Landing page responsiva, cérebro abstrato, seções editoriais, FAQ funcional, identidade bordô/cinza/branco e logo recebido |
| 3 — Formulário | Campos obrigatórios, CPF, contatos, autodeclaração, campos acadêmicos condicionais, preço estudantil, aviso de finalidade, autorização e estados de envio/erro |
| 4 — Contrato e retorno | Cliente HTTP tipado, validação de resposta, página de retorno/recuperação, token somente em memória e retomada por API futura |
| 5 — Simplificação comercial | Limite e reserva removidos após decisão de operar o evento on-line sem limite comercial; validade da cobrança permanece independente |

## Decisões técnicas desta etapa

- Trabalho na pasta atual em branch separada, preservando o histórico e as alterações anteriores de componentes do usuário. Não foi criado checkout duplicado.
- Não há limite comercial de inscrições nem reserva de vaga; eventual limite da transmissão pertence à escolha técnica da plataforma.
- Arte do cérebro gerada como imagem original e convertida para WebP de 640/1200 pixels. Movimento CSS sutil, pausa fora da tela, versão estática em telas menores e com redução de movimento. Esta entrega não tem um modelo 3D interativo.
- A API de retomada usa bearer recebido pelo fragmento. Não existe ainda troca por sessão, hash persistido ou expiração no servidor; esses controles ficam documentados para o backend. Recarregar perde o token e exige novo acesso.
- A pessoa de apoio cuja redação pública aguarda validação continua registrada na spec e nas pendências; sua apresentação pública não foi inventada.
- O protocolo de recuperação retorna mensagem genérica para impedir exposição de dados pelo CPF. A opção está preparada para o serviço futuro, sem simulação de envio.
- Nenhum commit, push, merge, contratação ou publicação faz parte deste registro. As alterações estão disponíveis para revisão na branch.

## Verificação

- 39 testes automatizados de regras, componentes e cliente HTTP passaram na última verificação completa.
- Verificação de tipos inclui os testes, além dos arquivos da aplicação.
- Build de produção e lint verificados na entrega.
- Inspeção de navegador em 360, 768 e 1440 pixels. Verificado carregamento das imagens e ausência de rolagem horizontal; FAQ abriu corretamente. Layout de tablet foi ajustado para composição vertical da abertura.
- Suporte a redução de movimento implementado em CSS; comportamento estático foi observado no breakpoint móvel/tablet. Não foi alterada a preferência de acessibilidade do sistema do usuário.
- Revisão independente encontrou e corrigiu arredondamento de meio centavo e confirmação de recuperação com token expirado. Regressões foram reproduzidas em testes antes das correções, e a revisão posterior foi aprovada.

## Limites importantes

A API ainda não existe. As datas públicas de 20 e 21/02/2027, o fuso `America/Cuiaba` e valores de trabalho já constam no frontend, mas os horários, a confirmação final dos preços e as integrações continuam pendentes. A configuração mantém `registrationsOpen: false` e `integrationsReady: false`; por isso a versão pública permanece fechada. Não houve processamento real de CPF, pagamento, WhatsApp ou confirmação de inscrição. A prévia local exibe o formulário para revisão, mas mantém o envio bloqueado.

Após as cinco tarefas iniciais, foram incorporados os 10 temas, os 12 palestrantes, duas fotos oficiais, o seletor de semestre e a animação de entrada dos cards. Ainda faltam 10 fotos, a apresentação curta de Dr. Luiz Felipe e 3 CRMs. A próxima etapa estrutural continua sendo a tarefa 6: escolha da infraestrutura e dos provedores, com detalhamento dos adaptadores.
