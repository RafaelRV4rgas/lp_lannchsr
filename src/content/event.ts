import { speakers, talks } from './speakers'

export const eventContent = {
  title: 'Neurocirurgia é tudo a Mesma Coisa?',
  subtitle:
    'Simpósio on-line: as diferentes grandes áreas e subespecialidades da Neurocirurgia.',
  organization: 'Liga de Neurologia e Neurocirurgia do Hospital Santa Rosa',
  president: 'Carolina Ayumi Kozima',
  speakers,
  talks,
  supporters: [
    'Academia Brasileira de Neurocirurgia',
    'Sociedade Brasileira de Neurocirurgia',
    'Hospital Santa Rosa',
    'Centro de Estudos Cervantes Caporossi',
    'Medneuro',
    'Neurocirurgiões no Ar',
    'Liga Acadêmica Brasileira de Neurocirurgia',
  ],
  // Public wording of the additional individual supporter awaits confirmation (docs/pendencias.md).
  benefits: [
    {
      number: '01',
      title: 'Além da teoria',
      text: 'Conheça as patologias, os procedimentos e a rotina de diferentes subespecialidades.',
    },
    {
      number: '02',
      title: 'Carreiras em perspectiva',
      text: 'Ouça as experiências e escolhas de neurocirurgiões em suas áreas de atuação.',
    },
    {
      number: '03',
      title: 'Espaço para perguntar',
      text: 'Participe das discussões e tire suas dúvidas com os especialistas.',
    },
    {
      number: '04',
      title: 'Conhecimento que fica',
      text: 'Materiais das aulas, sorteios e certificado pela Academia Brasileira de Neurocirurgia.',
    },
  ],
  faq: [
    {
      question: 'Para quem é o simpósio?',
      answer:
        'Para estudantes de medicina, profissionais de saúde, médicos considerando a residência e residentes explorando uma subespecialização. Pessoas interessadas no universo da neurocirurgia também são bem-vindas.',
    },
    {
      question: 'Como será realizado o evento?',
      answer:
        'O simpósio será on-line. A data, o horário e a plataforma de transmissão serão divulgados em breve.',
    },
    {
      question: 'Estudantes terão desconto?',
      answer:
        'Sim. Estudantes de qualquer curso terão 10% de desconto por autodeclaração no formulário, sem envio de comprovante de matrícula. O valor da inscrição será divulgado antes da abertura.',
    },
    {
      question: 'Como funcionarão a inscrição e o pagamento?',
      answer:
        'Quando as inscrições abrirem, você poderá preencher o formulário e receber o link de pagamento pelo WhatsApp. A inscrição será confirmada após a aprovação do pagamento.',
    },
    {
      question: 'Como receberei o acesso e o certificado?',
      answer:
        'O link do evento será enviado pelo WhatsApp aos inscritos confirmados, assim que estiver liberado. A emissão e o envio do certificado serão realizados pela organização.',
    },
  ],
}
export type EventContent = typeof eventContent
