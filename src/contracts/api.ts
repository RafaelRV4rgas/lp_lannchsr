import type { RegistrationInput } from '../domain/registration'
export type RegistrationState =
  | 'pending'
  | 'confirmed'
  | 'expired'
export interface RegistrationResult {
  status: RegistrationState
  paymentUrl: string | null
  paymentExpiresAt: string | null
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
    !['pending', 'confirmed', 'expired'].includes(String(result.status)) ||
    !(result.paymentUrl === null || typeof result.paymentUrl === 'string') ||
    !(
      result.paymentExpiresAt === null ||
      (typeof result.paymentExpiresAt === 'string' &&
        Number.isFinite(Date.parse(result.paymentExpiresAt)))
    )
  )
    throw new Error('INVALID_RESPONSE')
  return {
    status: result.status as RegistrationState,
    paymentUrl: safePaymentUrl(result.paymentUrl),
    paymentExpiresAt: result.paymentExpiresAt,
  }
}
