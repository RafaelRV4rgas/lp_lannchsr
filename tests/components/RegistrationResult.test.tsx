import { expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { RegistrationResult } from '../../src/components/inscricao/RegistrationResult'
it('shows payment link for a verified pending response', () => {
  render(
    <RegistrationResult
      result={{
        status: 'pending',
        paymentUrl: 'https://pay.example.com/1',
        reservationExpiresAt: '2027-03-10T13:00:00Z',
      }}
    />,
  )
  expect(
    screen.getByRole('link', { name: /pagar inscrição/i }),
  ).toHaveAttribute('href', 'https://pay.example.com/1')
  expect(screen.getByText(/reservada até/i)).toBeInTheDocument()
})
it.each([
  ['confirmed', 'Inscrição confirmada'],
  ['expired', 'Prazo encerrado'],
  ['paid_without_seat', 'Pagamento em análise'],
  ['pending', 'Solicitação recebida'],
] as const)(
  'renders %s without inventing a payment link',
  (status, heading) => {
    render(
      <RegistrationResult
        result={{ status, paymentUrl: null, reservationExpiresAt: null }}
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
        reservationExpiresAt: null,
      }}
    />,
  )
  expect(screen.queryByRole('link')).not.toBeInTheDocument()
})
