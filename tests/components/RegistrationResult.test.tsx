import { expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { RegistrationResult } from '../../src/components/inscricao/RegistrationResult'
it('shows payment link for a verified pending response', () => {
  render(
    <RegistrationResult
      result={{
        status: 'pending',
        paymentUrl: 'https://pay.example.com/1',
        paymentExpiresAt: '2027-03-10T13:00:00Z',
      }}
    />,
  )
  expect(
    screen.getByRole('link', { name: /pagar inscrição/i }),
  ).toHaveAttribute('href', 'https://pay.example.com/1')
  expect(screen.getByText(/pagamento válido até/i)).toBeInTheDocument()
})
it.each([
  ['confirmed', 'Inscrição confirmada'],
  ['expired', 'Prazo encerrado'],
  ['pending', 'Solicitação recebida'],
] as const)(
  'renders %s without inventing a payment link',
  (status, heading) => {
    render(
      <RegistrationResult
        result={{ status, paymentUrl: null, paymentExpiresAt: null }}
      />,
    )
    expect(screen.getByRole('heading', { name: heading })).toBeInTheDocument()
    expect(
      screen.queryByRole('link', { name: /pagar/i }),
    ).not.toBeInTheDocument()
  },
)
it('does not render unsafe payment URLs', () => {
  render(
    <RegistrationResult
      result={{
        status: 'pending',
        paymentUrl: 'javascript:alert(1)',
        paymentExpiresAt: null,
      }}
    />,
  )
  expect(screen.queryByRole('link')).not.toBeInTheDocument()
})
