import { expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RegistrationPage } from '../../src/components/inscricao/RegistrationPage'

it('shows generic recovery confirmation after an expired token', async () => {
  const user = userEvent.setup()
  const client = {
    submit: vi.fn(),
    recover: vi.fn().mockResolvedValue({ accepted: true }),
    read: vi.fn().mockRejectedValue(new Error('ACCESS_EXPIRED')),
    resume: vi.fn(),
  }
  render(<RegistrationPage accessToken="expired-test-token" client={client} />)
  await screen.findByRole('heading', { name: 'Retomar inscrição' })
  await user.type(screen.getByLabelText('CPF'), '52998224725')
  await user.click(
    screen.getByRole('button', { name: 'Solicitar link seguro' }),
  )
  expect(
    await screen.findByText(/Se houver uma inscrição para os dados informados/),
  ).toBeVisible()
  expect(client.recover).toHaveBeenCalledWith('52998224725')
})

it('resumes an expired registration with the token and prevents duplicate requests', async () => {
  const user = userEvent.setup()
  let resolveResume!: (value: {
    status: 'pending'
    paymentUrl: null
    reservationExpiresAt: null
  }) => void
  const client = {
    submit: vi.fn(),
    recover: vi.fn(),
    read: vi
      .fn()
      .mockResolvedValue({
        status: 'expired',
        paymentUrl: null,
        reservationExpiresAt: null,
      }),
    resume: vi.fn().mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveResume = resolve
        }),
    ),
  }
  render(<RegistrationPage accessToken="test-token" client={client} />)
  await screen.findByRole('heading', { name: 'Prazo encerrado' })
  await user.dblClick(screen.getByRole('button', { name: 'Retomar inscrição' }))
  expect(client.resume).toHaveBeenCalledOnce()
  expect(client.resume).toHaveBeenCalledWith('test-token', expect.any(String))
  resolveResume({
    status: 'pending',
    paymentUrl: null,
    reservationExpiresAt: null,
  })
  expect(
    await screen.findByRole('heading', { name: 'Solicitação recebida' }),
  ).toBeVisible()
})
