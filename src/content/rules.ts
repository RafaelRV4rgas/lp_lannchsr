import type { EventRules } from '../domain/event'

export const rules: Readonly<EventRules> = Object.freeze({
    startsAt: '',
    timeZone: 'America/Cuiaba',
    registrationsOpen: false,
    basePriceCents: 2500,
    studentPriceCents: 1500,
    integrationsReady: false,
})
