import { speakers, talks } from './speakers'
import {rules} from "./rules.ts";
import {formatPrice} from '../domain/event'

export const eventContent = {
  title: 'Neurocirurgia é tudo a Mesma Coisa?',
  subtitle:
    'Simpósio on-line: As diferentes grandes áreas e subespecialidades da Neurocirurgia.',
  organization: 'Liga de Neurologia e Neurocirurgia do Hospital Santa Rosa',
  president: 'Carolina Ayumi Kozima',
  speakers,
  talks,
  rules,
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
        'O simpósio é voltado a estudantes de medicina, profissionais da saúde, médicos que estão escolhendo uma residência e residentes interessados em conhecer diferentes subespecialidades. Qualquer pessoa interessada em neurocirurgia também pode participar.',
    },
    {
      question: 'Como será realizado o evento?',
      answer:
        'O simpósio será realizado on-line, no dia 21 de fevereiro de 2027. Antes do evento, os participantes com inscrição confirmada receberão o link de acesso e as orientações necessárias.',
    },
    {
      question: 'Como funcionarão a inscrição e o pagamento?',
      answer:
        'Após preencher o formulário, você receberá pelo WhatsApp a confirmação da solicitação e o link para pagamento. Sua inscrição será confirmada assim que o pagamento for aprovado.',
    },
    {
      question: 'Estudantes terão um valor especial?',
      answer:
        `Sim. Estudantes de qualquer curso pagam ${formatPrice(rules.studentPriceCents)}. A condição será informada por autodeclaração no formulário.`,
    },
    {
      question: 'Como receberei o acesso e o certificado?',
      answer:
        'O link de acesso será enviado pelo WhatsApp aos participantes com inscrição confirmada. Após o evento, a organização enviará as orientações para emissão ou recebimento do certificado.',
    },
  ],
}
export type EventContent = typeof eventContent
