import type { RegistrationClient } from '../contracts/api'

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
  }
}
export const registrationClient = createRegistrationClient()
