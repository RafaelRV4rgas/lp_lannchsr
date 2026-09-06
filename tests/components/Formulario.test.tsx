import { expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Formulario } from '../../src/components/formulario/Formulario'
import { defaultEventRules } from '../../src/domain/event'

const openRules = {
  ...defaultEventRules,
  startsAt: '2027-03-10T13:00:00-04:00',
  timeZone: 'America/Cuiaba',
  basePriceCents: 10000,
  reservationEnabled: false,
  integrationsReady: true,
  registrationsOpen: true,
}
it('keeps registration closed without a date', () => {
  render(<Formulario rules={defaultEventRules} />)
  expect(
    screen.getByRole('button', { name: /inscrições em breve/i }),
  ).toBeDisabled()
  expect(screen.queryByLabelText(/CPF/i)).not.toBeInTheDocument()
})
it('shows required academic fields and discounted price for students', async () => {
  const user = userEvent.setup()
  render(<Formulario rules={openRules} />)
  await user.selectOptions(screen.getByLabelText('Profissão'), 'student')
  expect(screen.getByLabelText('Curso')).toBeRequired()
  expect(screen.getByLabelText('Universidade')).toBeRequired()
  expect(screen.getByText(/90,00/)).toBeInTheDocument()
  await user.selectOptions(screen.getByLabelText('Profissão'), 'Médico')
  expect(screen.queryByLabelText('Curso')).not.toBeInTheDocument()
})
it('validates fields without sending and retains data when transport fails', async () => {
  const user = userEvent.setup()
  const onSubmit = vi.fn().mockRejectedValue(new Error('network'))
  render(<Formulario rules={openRules} onSubmit={onSubmit} />)
  await user.click(screen.getByRole('button', { name: 'Solicitar inscrição' }))
  expect(onSubmit).not.toHaveBeenCalled()
  await user.type(screen.getByLabelText('Nome completo'), 'Pessoa de Teste')
  await user.type(screen.getByLabelText('CPF'), '52998224725')
  await user.selectOptions(screen.getByLabelText('Profissão'), 'Médico')
  await user.type(screen.getByLabelText('E-mail'), 'teste@example.com')
  await user.type(screen.getByLabelText('WhatsApp com DDD'), '65999991234')
  await user.click(screen.getByRole('checkbox'))
  await user.click(screen.getByRole('button', { name: 'Solicitar inscrição' }))
  expect(onSubmit).toHaveBeenCalledOnce()
  expect(screen.getByLabelText('Nome completo')).toHaveValue('Pessoa de Teste')
  expect(screen.getByRole('alert')).toHaveTextContent(/não foi possível/i)
})

it('blocks duplicate submissions while pending and reuses the key after failure', async () => {
  const user = userEvent.setup()
  let rejectRequest!: (reason: Error) => void
  const onSubmit = vi
    .fn()
    .mockImplementationOnce(
      () =>
        new Promise((_resolve, reject) => {
          rejectRequest = reject
        }),
    )
    .mockResolvedValue({ accepted: true })
  render(<Formulario rules={openRules} onSubmit={onSubmit} />)
  await user.type(screen.getByLabelText('Nome completo'), 'Pessoa de Teste')
  await user.type(screen.getByLabelText('CPF'), '52998224725')
  await user.selectOptions(screen.getByLabelText('Profissão'), 'Médico')
  await user.type(screen.getByLabelText('E-mail'), 'teste@example.com')
  await user.type(screen.getByLabelText('WhatsApp com DDD'), '65999991234')
  await user.click(screen.getByRole('checkbox'))
  await user.dblClick(
    screen.getByRole('button', { name: 'Solicitar inscrição' }),
  )
  expect(onSubmit).toHaveBeenCalledOnce()
  expect(screen.getByRole('button', { name: 'Enviando…' })).toBeDisabled()
  expect(screen.getByLabelText('CPF')).toBeDisabled()
  rejectRequest(new Error('timeout'))
  await screen.findByRole('alert')
  await user.click(screen.getByRole('button', { name: 'Solicitar inscrição' }))
  expect(onSubmit).toHaveBeenCalledTimes(2)
  expect(onSubmit.mock.calls[1][1]).toBe(onSubmit.mock.calls[0][1])
  expect(screen.getByRole('status')).toHaveTextContent('Solicitação recebida')
})
