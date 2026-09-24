import { speakers, talks } from './speakers'
import {rules} from "./rules.ts";
import {formatPrice} from '../domain/symposium'

export const eventContent = {
  title: 'Neurocirurgia é tudo a Mesma Coisa?',
  subtitle:
    'Simpósio on-line: As diferentes grandes áreas e subespecialidades da Neurocirurgia.',
  dateLabel: '20 e 21/02/2027',
  organization: 'Liga Acadêmica de Neurologia e Neurocirurgia do Hospital Santa Rosa',
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
    'Liga Brasileira de Neurocirurgia',
  ],
  // Public wording of the additional individual supporter awaits confirmation (docs/pendencias.md).
  benefits: [
    {
      number: '01',
      title: 'Explore novos caminhos',
      text: 'Descubra como diferentes subespecialidades transformam conhecimento em decisões, procedimentos e cuidado.',
    },
    {
      number: '02',
      title: 'Enxergue além da residência',
      text: 'Conheça rotinas, desafios e escolhas de carreira pela perspectiva de quem vive a neurocirurgia todos os dias.',
    },
    {
      number: '03',
      title: 'Converse com especialistas',
      text: 'Aproxime-se de profissionais de referência e leve suas perguntas para uma discussão aberta ao final do encontro.',
    },
    {
      number: '04',
      title: 'Leve a experiência com você',
      text: 'Receba materiais das aulas para continuar aprendendo e concorra a prêmios durante o simpósio.',
    },
    {
      number: '05',
      title: 'Certifique sua participação',
      text: 'Conclua o simpósio com um certificado emitido pela Academia Brasileira de Neurocirurgia.',
    },
  ],
  specialties: [
    {
      title: 'Neurocirurgia endovascular',
      text: 'Conheça as abordagens endovasculares e a neurorradiologia intervencionista no cuidado das doenças cerebrovasculares.',
    },
    {
      title: 'Neurocirurgia oncológica',
      text: 'Explore o diagnóstico e o tratamento cirúrgico dos tumores do sistema nervoso e sua atuação multidisciplinar.',
    },
    {
      title: 'Neurocirurgia pediátrica',
      text: 'Entenda os cuidados especializados para malformações, hidrocefalias, tumores e outras condições da infância.',
    },
    {
      title: 'Neurocirurgia de coluna',
      text: 'Descubra a prática dedicada às doenças da coluna vertebral e às diferentes possibilidades de tratamento.',
    },
    {
      title: 'Neurocirurgia funcional',
      text: 'Veja como técnicas de neuromodulação e procedimentos funcionais podem atuar em movimento, dor e epilepsia.',
    },
    {
      title: 'Neurocirurgia de base do crânio',
      text: 'Conheça cirurgias de alta complexidade que integram planejamento, monitorização e trabalho multidisciplinar.',
    },
    {
      title: 'Microneurocirurgia vascular',
      text: 'Acompanhe técnicas microcirúrgicas aplicadas a aneurismas, malformações vasculares e distúrbios da circulação cerebral.',
    },
    {
      title: 'Neurocirurgia de nervos periféricos',
      text: 'Explore o tratamento de compressões, lesões traumáticas e tumores que afetam os nervos periféricos.',
    },
    {
      title: 'Dor crônica',
      text: 'Conheça caminhos cirúrgicos e de neuromodulação voltados ao cuidado de quadros persistentes e refratários.',
    },
    {
      title: 'Urgência, emergência e neurointensivismo',
      text: 'Entenda a tomada de decisão em situações neurológicas críticas que exigem avaliação e intervenção rápidas.',
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
        'O simpósio será realizado on-line nos dias 20 e 21 de fevereiro de 2027. Antes do evento, os participantes com inscrição confirmada receberão o link de acesso e as orientações necessárias.',
    },
    {
      question: 'Como funcionarão a inscrição e o pagamento?',
      answer:
        'O formulário envia uma solicitação de inscrição. Nossa equipe continuará o atendimento pelo WhatsApp para conferir seus dados e enviar manualmente as orientações de pagamento. A confirmação acontece após a conferência do pagamento pela equipe.',
    },
    {
      question: 'Estudantes terão um valor especial?',
      answer:
        `Sim. Estudantes de qualquer curso podem receber o valor de ${formatPrice(rules.studentPriceCents)} após a conferência manual das informações e da carteirinha pelo WhatsApp. Se a condição não for validada, ainda será possível participar pelo valor geral.`,
    },
    {
      question: 'Como receberei o acesso e o certificado?',
      answer:
        'Nossa equipe enviará manualmente pelo WhatsApp o acesso aos participantes com inscrição confirmada. Após o evento, a organização enviará as orientações para emissão ou recebimento do certificado.',
    },
  ],
}
export type EventContent = typeof eventContent
