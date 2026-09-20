import { expect, it, vi } from 'vitest'
import { createRegistrationClient } from '../src/services/registration-client'
it('uses a header token and rejects malformed server responses', async () => {
  const transport = vi.fn().mockResolvedValue(
    new Response(
      JSON.stringify({
        status: 'confirmed',
        paymentUrl: null,
        paymentExpiresAt: null,
      }),
    ),
  )
  const client = createRegistrationClient(transport)
  await client.read('secret')
  expect(transport).toHaveBeenCalledWith(
    '/api/registration',
    expect.objectContaining({
      headers: expect.objectContaining({ Authorization: 'Bearer secret' }),
      cache: 'no-store',
    }),
  )
  transport.mockResolvedValue(
    new Response(JSON.stringify({ status: 'made-up' })),
  )
  await expect(client.read('secret')).rejects.toThrow()
})
it('rejects errors and never sends empty access tokens', async () => {
  const transport = vi
    .fn()
    .mockResolvedValue(new Response('{}', { status: 500 }))
  const client = createRegistrationClient(transport)
  await expect(client.read('')).rejects.toThrow()
  expect(transport).not.toHaveBeenCalled()
  await expect(client.read('secret')).rejects.toThrow()
})
