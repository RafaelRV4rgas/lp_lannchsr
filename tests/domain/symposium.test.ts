import { describe, expect, it } from 'vitest'
import {
  calculatePriceCents,
  canOpenRequests,
  requestsAvailable,
  type SymposiumRules,
} from '../../src/domain/symposium'
import { rules } from '../../src/content/rules'

const closedRules: SymposiumRules = {
  startsAt: '',
  timeZone: null,
  requestsOpen: false,
  basePriceCents: 2500,
  studentPriceCents: 1500,
  backendReady: false,
}

describe('symposium rules', () => {
  it('keeps requests closed until the two-day event receives a start time', () => {
    expect(rules.startsAt).toBe('')
    expect(rules.timeZone).toBe('America/Cuiaba')
    expect(canOpenRequests(rules)).toBe(false)
  })
  it('starts closed with an invalid date, even with a configured price', () => {
    expect(closedRules).toMatchObject({
      startsAt: '',
      requestsOpen: false,
      studentPriceCents: 1500,
    })
    expect(closedRules).not.toHaveProperty('capacity')
    expect(closedRules).not.toHaveProperty('reservationEnabled')
    expect(canOpenRequests(closedRules)).toBe(false)
  })
  it('uses the configured fixed student price and rejects invalid amounts', () => {
    expect(calculatePriceCents(10000, 6000, true)).toBe(6000)
    expect(calculatePriceCents(10000, 6000, false)).toBe(10000)
    for (const base of [0, -1, 1.5, NaN, Infinity])
      expect(() => calculatePriceCents(base, 6000, true)).toThrow()
    for (const studentPrice of [0, -1, 1.5, NaN, Infinity])
      expect(() => calculatePriceCents(10000, studentPrice, true)).toThrow()
  })
  it('requires event data, prices and backend before requests can open', () => {
    const ready = {
      ...closedRules,
      startsAt: '2027-03-10T13:00:00-04:00',
      timeZone: 'America/Cuiaba',
      basePriceCents: 10000,
      backendReady: true,
    }
    expect(canOpenRequests(ready)).toBe(true)
    expect(requestsAvailable(ready)).toBe(false)
    expect(requestsAvailable({ ...ready, requestsOpen: true })).toBe(
      true,
    )
    for (const patch of [
      { startsAt: 'invalid' },
      { startsAt: '2027-02-30T13:00:00-04:00' },
      { timeZone: 'invalid' },
      { basePriceCents: null },
      { backendReady: false },
    ]) {
      expect(canOpenRequests({ ...ready, ...patch })).toBe(false)
    }
  })
})
