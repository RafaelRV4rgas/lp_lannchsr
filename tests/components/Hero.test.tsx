import { render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import { Hero } from '../../src/components/hero/Hero'

it('shows the configured event date', () => {
  render(
    <Hero
      title="Evento"
      subtitle="Descrição"
      data="21/02/2027"
      registrationAvailable={false}
    />,
  )

  expect(screen.getByText('21/02/2027')).toBeVisible()
  expect(screen.queryByText('Em breve')).not.toBeInTheDocument()
})
