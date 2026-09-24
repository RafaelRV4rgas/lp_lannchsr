import type { SymposiumRules } from '../domain/symposium'

export const rules: Readonly<SymposiumRules> = Object.freeze({
    startsAt: '',
    timeZone: 'America/Cuiaba',
    requestsOpen: false,
    basePriceCents: 2500,
    studentPriceCents: 1500,
    backendReady: false,
})
