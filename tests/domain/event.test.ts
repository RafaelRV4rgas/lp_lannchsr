import { describe, expect, it } from 'vitest'
import {
  calculatePriceCents,
  canOpenRegistrations,
  registrationsAvailable,
  type EventRules,
} from '../../src/domain/event'

const closedRules: EventRules = {
  startsAt: '',
  timeZone: null,
  registrationsOpen: false,
  basePriceCents: 2500,
  studentPriceCents: 1500,
  integrationsReady: false,
}

describe('event rules', () => {
  it('starts closed with an invalid date, even with a configured price', () => {
    expect(closedRules).toMatchObject({
      startsAt: '',
      registrationsOpen: false,
      studentPriceCents: 1500,
    })
    expect(closedRules).not.toHaveProperty('capacity')
    expect(closedRules).not.toHaveProperty('reservationEnabled')
    expect(canOpenRegistrations(closedRules)).toBe(false)
  })
  it('uses the configured fixed student price and rejects invalid amounts', () => {
    expect(calculatePriceCents(10000, 6000, true)).toBe(6000)
    expect(calculatePriceCents(10000, 6000, false)).toBe(10000)
    for (const base of [0, -1, 1.5, NaN, Infinity])
      expect(() => calculatePriceCents(base, 6000, true)).toThrow()
    for (const studentPrice of [0, -1, 1.5, NaN, Infinity])
      expect(() => calculatePriceCents(10000, studentPrice, true)).toThrow()
  })
  it('requires valid date, timezone, price and integrations; opening is explicit', () => {
    const ready = {
      ...closedRules,
      startsAt: '2027-03-10T13:00:00-04:00',
      timeZone: 'America/Cuiaba',
      basePriceCents: 10000,
      integrationsReady: true,
    }
    expect(canOpenRegistrations(ready)).toBe(true)
    expect(registrationsAvailable(ready)).toBe(false)
    expect(registrationsAvailable({ ...ready, registrationsOpen: true })).toBe(
      true,
    )
    for (const patch of [
      { startsAt: 'invalid' },
      { startsAt: '2027-02-30T13:00:00-04:00' },
      { timeZone: 'invalid' },
      { basePriceCents: null },
      { integrationsReady: false },
    ]) {
      expect(canOpenRegistrations({ ...ready, ...patch })).toBe(false)
    }
  })
})
