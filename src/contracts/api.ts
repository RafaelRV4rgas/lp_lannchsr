import type { RegistrationInput } from '../domain/registration'
export type RegistrationState =
  | 'pending'
  | 'confirmed'
  | 'expired'
  | 'paid_without_seat'
export interface RegistrationResult {
  status: RegistrationState
  paymentUrl: string | null
  reservationExpiresAt: string | null
}
export interface RegistrationClient {
  submit(
    input: RegistrationInput,
    idempotencyKey: string,
  ): Promise<{ accepted: true }>
  recover(cpf: string): Promise<{ accepted: true }>
  read(accessToken: string): Promise<RegistrationResult>
  resume(
    accessToken: string,
    idempotencyKey: string,
  ): Promise<RegistrationResult>
}

export function safePaymentUrl(value: string | null): string | null {
  if (!value) return null
  try {
    const url = new URL(value)
    return url.protocol === 'https:' && !url.username && !url.password
      ? url.href
      : null
  } catch {
    return null
  }
}

export function parseRegistrationResult(value: unknown): RegistrationResult {
  if (typeof value !== 'object' || value === null)
    throw new Error('INVALID_RESPONSE')
  const result = value as Record<string, unknown>
  if (
    !['pending', 'confirmed', 'expired', 'paid_without_seat'].includes(
      String(result.status),
    ) ||
    !(result.paymentUrl === null || typeof result.paymentUrl === 'string') ||
    !(
      result.reservationExpiresAt === null ||
      (typeof result.reservationExpiresAt === 'string' &&
        Number.isFinite(Date.parse(result.reservationExpiresAt)))
    )
  )
    throw new Error('INVALID_RESPONSE')
  return {
    status: result.status as RegistrationState,
    paymentUrl: safePaymentUrl(result.paymentUrl),
    reservationExpiresAt: result.reservationExpiresAt,
  }
}
