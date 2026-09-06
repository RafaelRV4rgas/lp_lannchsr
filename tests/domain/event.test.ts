import { describe, expect, it } from 'vitest'
import {
  calculatePriceCents,
  canOpenRegistrations,
  defaultEventRules,
  registrationsAvailable,
} from '../../src/domain/event'

describe('event rules', () => {
  it('starts closed, without invented date/price or reservation preference', () => {
    expect(defaultEventRules).toMatchObject({
      startsAt: null,
      basePriceCents: null,
      registrationsOpen: false,
      capacity: 2000,
      studentDiscountPercent: 10,
      reservationEnabled: null,
    })
    expect(canOpenRegistrations(defaultEventRules)).toBe(false)
  })
  it('calculates prices in cents and rejects invalid amounts', () => {
    expect(calculatePriceCents(10000, 10, true)).toBe(9000)
    expect(calculatePriceCents(10000, 10, false)).toBe(10000)
    expect(calculatePriceCents(9999, 10, true)).toBe(8999)
    expect(calculatePriceCents(45, 30, true)).toBe(32)
    for (const base of [0, -1, 1.5, NaN, Infinity])
      expect(() => calculatePriceCents(base, 10, true)).toThrow()
    for (const discount of [-1, 100, NaN])
      expect(() => calculatePriceCents(10000, discount, true)).toThrow()
  })
  it('requires valid date, timezone, price, reservation choice and integrations; opening is explicit', () => {
    const ready = {
      ...defaultEventRules,
      startsAt: '2027-03-10T13:00:00-04:00',
      timeZone: 'America/Cuiaba',
      basePriceCents: 10000,
      reservationEnabled: false,
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
      { capacity: 0 },
      { reservationEnabled: null },
    ]) {
      expect(canOpenRegistrations({ ...ready, ...patch })).toBe(false)
    }
  })
})
