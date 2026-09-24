import { describe, expect, it } from 'vitest'
import {
  calculatePriceCents,
  requestsAvailable,
  type SymposiumRules,
} from '../../src/domain/symposium'
import { rules } from '../../src/content/rules'

const closedRules: SymposiumRules = {
  registrationClosesAt: '2027-02-20T00:00:00-04:00',
  timeZone: null,
  basePriceCents: 2500,
  studentPriceCents: 1500,
}

describe('symposium rules', () => {
  it('keeps requests open before the configured closing instant', () => {
    expect(rules.registrationClosesAt).toBe('2027-02-20T00:00:00-04:00')
    expect(rules.timeZone).toBe('America/Cuiaba')
    expect(
      requestsAvailable(rules, new Date('2027-02-19T23:59:59-04:00')),
    ).toBe(true)
  })
  it('closes requests exactly at the configured closing instant', () => {
    expect(
      requestsAvailable(closedRules, new Date('2027-02-20T00:00:00-04:00')),
    ).toBe(false)
    expect(
      requestsAvailable(closedRules, new Date('2027-02-20T00:00:01-04:00')),
    ).toBe(false)
  })
  it('fails closed when the configured closing date is invalid', () => {
    for (const registrationClosesAt of [
      '',
      'invalid',
      '2027-02-30T00:00:00-04:00',
    ]) {
      expect(
        requestsAvailable(
          { ...closedRules, registrationClosesAt },
          new Date('2027-02-19T00:00:00-04:00'),
        ),
      ).toBe(false)
    }

    expect(
      requestsAvailable(
        { ...closedRules, registrationClosesAt: undefined } as unknown as SymposiumRules,
        new Date('2027-02-19T00:00:00-04:00'),
      ),
    ).toBe(false)
  })
  it('does not use timezone or prices to gate requests', () => {
    const now = new Date('2027-02-19T00:00:00-04:00')

    expect(
      requestsAvailable(
        {
          ...closedRules,
          timeZone: null,
          basePriceCents: null,
          studentPriceCents: 0,
        },
        now,
      ),
    ).toBe(true)
  })
  it('uses the configured fixed student price and rejects invalid amounts', () => {
    expect(calculatePriceCents(10000, 6000, true)).toBe(6000)
    expect(calculatePriceCents(10000, 6000, false)).toBe(10000)
    for (const base of [0, -1, 1.5, NaN, Infinity])
      expect(() => calculatePriceCents(base, 6000, true)).toThrow()
    for (const studentPrice of [0, -1, 1.5, NaN, Infinity])
      expect(() => calculatePriceCents(10000, studentPrice, true)).toThrow()
  })
})
