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

// Names, topics and the three known registrations were supplied by the organization.
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
    createSpeaker('giovani-mendes', 'Dr. Giovani Mendes', 'CRM-MT 4964', '/images/palestrantes/giovanni_test.webp', 'Apresentação demonstrativa: este espaço reunirá a trajetória profissional, a formação e as áreas de atuação do palestrante.'),
    createSpeaker('cleiton-onofre', 'Dr. Cleiton Onofre', null, null, null),
    createSpeaker('wilson-novais', 'Dr. Wilson Novais', null, null, null),
    createSpeaker('renato-santos', 'Dr. Renato Santos', null, '/images/palestrantes/renato_santos.webp', null),
    createSpeaker('marconi-alves', 'Dr. Marconi Alves', null, null, null),
    createSpeaker('atahualpa-strapasson', 'Dr. Atahualpa Strapasson', null, null, null),
    createSpeaker('marcel-yamada', 'Dr. Marcel Yamada', 'CRM-MT 8470', null, null),
    createSpeaker('luciano-franca', 'Dr. Luciano França', null, null, null),
    createSpeaker('joao-victor', 'Dr. João Victor', null, null, null),
    createSpeaker('virgilio-vila', 'Dr. Virgilio Vilá', 'CRM-MT 6414', null, null),
    createSpeaker('luiz-eduardo', 'Dr. Luiz Eduardo', null, null, null),
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
    {id: 'neurointensivismo', title: 'Neurointensivismo', speakerIds: ['luiz-felipe']},
]
