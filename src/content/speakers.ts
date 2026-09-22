export interface Speaker {
    id: string
    name: string
    crm: string
    bio: string
    photoUrl: string
}

export interface Talk {
    id: string
    title: string
    speakerIds: string[]
}

// Names, topics and known professional registrations were supplied by the organization.
// Replace the marked mock fields with approved materials before final publication.
function createSpeaker(id: string, name: string, crm: string | null, imgUrl: string | null, bio: string | null): Speaker {
    return {
        id,
        name,
        crm: crm ?? 'CRM a informar',
        photoUrl: imgUrl ?? '/images/speaker-placeholder.webp',
        bio: bio ?? 'Apresentação demonstrativa: este espaço reunirá a trajetória profissional, a formação e as áreas de atuação do palestrante.',
    }
}

export const speakers: Speaker[] = [
    createSpeaker('giovani-mendes', 'Dr. Giovani Mendes', 'CRM-MT 4964 · RQE 1634', '/images/palestrantes/giovanni_test.webp', 'Neurocirurgião pediátrico e vascular, com residência no Hospital da Baleia.'),
    createSpeaker('cleiton-onofre', 'Dr. Cleiton Onofre de Menezes', 'CRM-MT 10420 · RQE 8178', null, 'Neurocirurgião do Hospital Santa Rosa, com fellowship em Neurorradiologia Intervencionista. Neurossonologista e orientador da LANNcHSR.'),
    createSpeaker('wilson-novais', 'Dr. Wilson Guimarães Novais', 'CRM-MT 3743 · RQE 863/94', null, 'Neurocirurgião endovascular e especialista em neurorradiologia intervencionista. Fundador do SOS AVC e integrante do Neurocirurgiões no Ar.'),
    createSpeaker('renato-santos', 'Dr. Renato Santos Carvalho', 'CRM-MT 8054 · RQE 5805', '/images/palestrantes/renato_santos.webp', 'Neurocirurgião oncológico no Hospital Santa Rosa, integrante da SNOLA e professor universitário no UNIVAG.'),
    createSpeaker('marconi-alves', 'Dr. Marconi Alves Rosa', 'CRM-MT 4132 · RQE 1282', null, 'Neurocirurgião de nervos periféricos e especialista em dinâmica de fluidos, com fellowship na Mayo Clinic.'),
    createSpeaker('atahualpa-strapasson', 'Dr. Atahualpa Caue Paim Strapasson', null, null, 'Neurocirurgião funcional e especialista em radiocirurgia. Professor universitário da UFMT.'),
    createSpeaker('marcel-yamada', 'Dr. Marcel Yamada', 'CRM-MT 8470', null, 'Neurocirurgião de coluna e especialista em dor crônica, com formação na USP Ribeirão Preto.'),
    createSpeaker('luciano-franca', 'Dr. Luciano França', null, null, 'Neurocirurgião especializado em base do crânio e integrante da Medneuro.'),
    createSpeaker('joao-victor', 'Dr. João Victor Oliveira Franco Calado', 'CRM-MT 10382 · RQE 8706', null, 'Neurocirurgião com residência no Hospital Santa Rosa e fellowship em neurocirurgia da base do crânio.'),
    createSpeaker('virgilio-vila', 'Dr. Virgílio Vilá', 'CRM-MT 6414 · RQE 4872', null, 'Neurocirurgião pediátrico com formação na UNIFESP e pela Sociedade Latino-Americana de Neurocirurgia Pediátrica, membro da ISPN.'),
    createSpeaker('luiz-eduardo', 'Dr. Luiz Eduardo Tenório', 'CRM-MT 8359 · RQE 7512', null, 'Neurocirurgião da coluna vertebral no Hospital Santa Rosa.'),
    createSpeaker('luiz-felipe', 'Dr. Luiz Felipe', null, null, null),
]

export const talks: Talk[] = [
    {id: 'microneurocirurgia-vascular', title: 'Microneurocirurgia vascular', speakerIds: ['giovani-mendes']},
    {
        id: 'vascular-endovascular',
        title: 'Neurocirurgia vascular/endovascular',
        speakerIds: ['cleiton-onofre', 'wilson-novais']
    },
    {id: 'oncologica', title: 'Neurocirurgia oncológica', speakerIds: ['renato-santos']},
    {id: 'nervos-perifericos', title: 'Neurocirurgia de Nervos Periféricos', speakerIds: ['marconi-alves']},
    {id: 'funcional', title: 'Neurocirurgia Funcional', speakerIds: ['atahualpa-strapasson']},
    {id: 'dor-cronica', title: 'Dor crônica', speakerIds: ['marcel-yamada']},
    {id: 'base-cranio', title: 'Neurocirurgia de Base de Crânio', speakerIds: ['luciano-franca', 'joao-victor']},
    {id: 'pediatrica', title: 'Neurocirurgia pediátrica', speakerIds: ['virgilio-vila']},
    {id: 'coluna', title: 'Neurocirurgia de Coluna', speakerIds: ['luiz-eduardo']},
    {id: 'neurointensivismo', title: 'Neurocirurgia de urgência e emergência — Neurointensivismo', speakerIds: ['luiz-felipe']},
]
