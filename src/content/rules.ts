import type { EventRules } from '../domain/event'

export const rules: Readonly<EventRules> = Object.freeze({
    startsAt: '21/02/2027',
    timeZone: null,
    registrationsOpen: false,
    basePriceCents: 2500,
    studentPriceCents: 1500,
    integrationsReady: false,
})
