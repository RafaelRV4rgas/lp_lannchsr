import { expect, it, vi } from 'vitest'
import { createRegistrationClient } from '../src/services/registration-client'
import type { RegistrationInput } from '../src/domain/registration'

const validInput: RegistrationInput = {
  fullName: 'Pessoa de Teste',
  cpf: '52998224725',
  profession: 'Médico',
  email: 'teste@example.com',
  whatsapp: '+5565999991234',
  whatsappConsent: true,
}

it('submits one registration request with its idempotency key', async () => {
  const transport = vi.fn().mockResolvedValue(
    new Response(JSON.stringify({ accepted: true })),
  )
  const client = createRegistrationClient(transport)

  await expect(client.submit(validInput, 'request-key')).resolves.toEqual({
    accepted: true,
  })
  expect(transport).toHaveBeenCalledWith(
    '/api/registrations',
    expect.objectContaining({
      method: 'POST',
      headers: expect.objectContaining({ 'Idempotency-Key': 'request-key' }),
      body: JSON.stringify(validInput),
    }),
  )
  expect(Object.keys(client)).toEqual(['submit'])
})

it('rejects an empty idempotency key without sending a request', async () => {
  const transport = vi.fn()
  const client = createRegistrationClient(transport)

  await expect(client.submit(validInput, '')).rejects.toThrow(
    'IDEMPOTENCY_REQUIRED',
  )
  expect(transport).not.toHaveBeenCalled()
})

it('rejects HTTP errors', async () => {
  const transport = vi.fn().mockResolvedValue(new Response('{}', { status: 500 }))
  const client = createRegistrationClient(transport)

  await expect(client.submit(validInput, 'request-key')).rejects.toThrow(
    'REQUEST_FAILED',
  )
})

it('rejects malformed acceptance responses', async () => {
  const transport = vi.fn().mockResolvedValue(
    new Response(JSON.stringify({ accepted: false })),
  )
  const client = createRegistrationClient(transport)

  await expect(client.submit(validInput, 'request-key')).rejects.toThrow(
    'INVALID_RESPONSE',
  )
})
