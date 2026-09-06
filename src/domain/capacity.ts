export const RESERVATION_MS = 24 * 60 * 60 * 1000
export function reservationExpiresAt(
  nowMs: number,
  enabled: boolean,
): number | null {
  if (
    !Number.isSafeInteger(nowMs) ||
    nowMs < 0 ||
    !Number.isSafeInteger(nowMs + RESERVATION_MS)
  )
    throw new Error('INVALID_TIME')
  return enabled ? nowMs + RESERVATION_MS : null
}
export function hasCapacity(
  capacity: number,
  confirmed: number,
  activeReservations: number,
): boolean {
  if (
    ![capacity, confirmed, activeReservations].every(
      (value) => Number.isSafeInteger(value) && value >= 0,
    ) ||
    capacity === 0
  )
    throw new Error('INVALID_CAPACITY')
  return confirmed + activeReservations < capacity
}
// Count existing commitments regardless of the current reservation setting.
export function activeReservationCount(
  expirations: readonly (number | null)[],
  nowMs: number,
): number {
  if (!Number.isFinite(nowMs)) throw new Error('INVALID_TIME')
  return expirations.filter(
    (expiry) => expiry !== null && Number.isFinite(expiry) && expiry > nowMs,
  ).length
}
