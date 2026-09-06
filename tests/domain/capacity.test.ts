import { describe, expect, it } from 'vitest'
import {
  hasCapacity,
  reservationExpiresAt,
  activeReservationCount,
  RESERVATION_MS,
} from '../../src/domain/capacity'
describe('capacity', () => {
  it('reserves exactly 24 hours or does not reserve', () => {
    expect(RESERVATION_MS).toBe(86400000)
    expect(reservationExpiresAt(1000, true)).toBe(86401000)
    expect(reservationExpiresAt(1000, false)).toBeNull()
  })
  it('counts previous valid reservations until expiration regardless of current setting', () => {
    expect(activeReservationCount([null, 999, 1000, 1001], 1000)).toBe(1)
    expect(hasCapacity(2000, 1999, 1)).toBe(false)
    expect(hasCapacity(2000, 1999, 0)).toBe(true)
    expect(hasCapacity(2000, 2000, 0)).toBe(false)
  })
  it('rejects invalid counters', () => {
    expect(() => hasCapacity(2000, -1, 0)).toThrow()
    expect(() => reservationExpiresAt(NaN, true)).toThrow()
  })
})
