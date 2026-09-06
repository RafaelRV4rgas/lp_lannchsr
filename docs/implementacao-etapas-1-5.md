# Registro da implementação — tarefas 1–5

Data: 06/09/2026. Branch: `codex/primeiras-cinco-tarefas`.

## Entregas

| Tarefa | Resultado |
| --- | --- |
| 1 — Conteúdo e estados | Conteúdo centralizado; abertura explícita condicionada a data, fuso, preço, reserva escolhida e integrações; cálculo em centavos com aritmética inteira |
| 2 — Página imersiva | Landing page responsiva, cérebro abstrato, seções editoriais, FAQ funcional, identidade bordô/cinza/branco e logo recebido |
| 3 — Formulário | Campos obrigatórios, CPF, contatos, autodeclaração, campos acadêmicos condicionais, desconto, aviso de finalidade, autorização e estados de envio/erro |
| 4 — Contrato e retorno | Cliente HTTP tipado, validação de resposta, página de retorno/recuperação, token somente em memória e retomada por API futura |
| 5 — Capacidade | Reserva de 24 horas, contagem de compromissos existentes e cálculo puro de disponibilidade |

## Decisões técnicas desta etapa

- Trabalho na pasta atual em branch separada, preservando o histórico e as alterações anteriores de componentes do usuário. Não foi criado checkout duplicado.
- Reserva inicial é `null`, para não inventar a preferência de ativação. Essa ausência também impede abertura.
- Arte do cérebro gerada como imagem original e convertida para WebP de 640/1200 pixels. Movimento CSS sutil, pausa fora da tela, versão estática em telas menores e com redução de movimento. Esta entrega não tem um modelo 3D interativo.
- A API de retomada usa bearer recebido pelo fragmento. Não existe ainda troca por sessão, hash persistido ou expiração no servidor; esses controles ficam documentados para o backend. Recarregar perde o token e exige novo acesso.
- A pessoa de apoio cuja redação pública aguarda validação continua registrada na spec e nas pendências; sua apresentação pública não foi inventada.
- O protocolo de recuperação retorna mensagem genérica para impedir exposição de dados pelo CPF. A opção está preparada para o serviço futuro, sem simulação de envio.
- Nenhum commit, push, merge, contratação ou publicação faz parte deste registro. As alterações estão disponíveis para revisão na branch.

## Verificação

- 23 testes automatizados de regras, componentes e cliente HTTP passaram.
- Verificação de tipos inclui os testes, além dos arquivos da aplicação.
- Build de produção e lint verificados na entrega.
- Inspeção de navegador em 360, 768 e 1440 pixels. Verificado carregamento das imagens e ausência de rolagem horizontal; FAQ abriu corretamente. Layout de tablet foi ajustado para composição vertical da abertura.
- Suporte a redução de movimento implementado em CSS; comportamento estático foi observado no breakpoint móvel/tablet. Não foi alterada a preferência de acessibilidade do sistema do usuário.
- Revisão independente encontrou e corrigiu arredondamento de meio centavo e confirmação de recuperação com token expirado. Regressões foram reproduzidas em testes antes das correções, e a revisão posterior foi aprovada.

## Limites importantes

As funções de capacidade não constituem trava concorrente. A API ainda não existe. Sem data, preço e integrações, a versão pública permanece fechada. Não houve processamento real de CPF, pagamento, reserva, WhatsApp ou confirmação de vaga.

Próxima etapa: tarefa 6, escolha da infraestrutura e dos provedores, com detalhamento dos adaptadores. Materiais de palestrantes e programação podem ser incorporados ao arquivo de conteúdo sem refazer esta estrutura.
