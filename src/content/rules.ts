import type { SymposiumRules } from '../domain/symposium'

export const rules: Readonly<SymposiumRules> = Object.freeze({
  registrationClosesAt: '2027-02-20T00:00:00-04:00',
  timeZone: 'America/Cuiaba',
  basePriceCents: 2500,
  studentPriceCents: 1500,
})
