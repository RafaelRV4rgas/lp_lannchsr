import {
  parseRegistrationResult,
  type RegistrationClient,
} from '../contracts/api'
import { digitsOnly, validCpf } from '../domain/registration'

export function createRegistrationClient(
  transport: typeof fetch = (...args) => fetch(...args),
): RegistrationClient {
  async function request(
    path: string,
    options: RequestInit = {},
  ): Promise<unknown> {
    const response = await transport(path, {
      ...options,
      cache: 'no-store',
      credentials: 'omit',
      redirect: 'error',
      signal: AbortSignal.timeout(15000),
      headers: { 'Content-Type': 'application/json', ...options.headers },
    })
    if (!response.ok)
      throw new Error(
        response.status === 401 || response.status === 403
          ? 'ACCESS_EXPIRED'
          : 'REQUEST_FAILED',
      )
    return response.json()
  }
  function auth(token: string) {
    if (!token.trim()) throw new Error('ACCESS_REQUIRED')
    return { Authorization: `Bearer ${token}` }
  }
  function idempotency(key: string) {
    if (!key.trim()) throw new Error('IDEMPOTENCY_REQUIRED')
    return { 'Idempotency-Key': key }
  }
  function accepted(value: unknown): { accepted: true } {
    if (
      !value ||
      typeof value !== 'object' ||
      !('accepted' in value) ||
      value.accepted !== true
    )
      throw new Error('INVALID_RESPONSE')
    return { accepted: true }
  }
  return {
    async submit(input, key) {
      return accepted(
        await request('/api/registrations', {
          method: 'POST',
          headers: idempotency(key),
          body: JSON.stringify(input),
        }),
      )
    },
    async recover(cpf) {
      if (!validCpf(cpf)) throw new Error('INVALID_CPF')
      return accepted(
        await request('/api/registrations/recovery', {
          method: 'POST',
          body: JSON.stringify({ cpf: digitsOnly(cpf) }),
        }),
      )
    },
    async read(token) {
      return parseRegistrationResult(
        await request('/api/registration', { headers: auth(token) }),
      )
    },
    async resume(token, key) {
      return parseRegistrationResult(
        await request('/api/registration/resume', {
          method: 'POST',
          headers: { ...auth(token), ...idempotency(key) },
        }),
      )
    },
  }
}
export const registrationClient = createRegistrationClient()
