import { render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import { Hero } from '../../src/components/hero/Hero'
import { eventContent } from '../../src/content/event'

it('shows the configured event date', () => {
  render(
    <Hero
      title="Evento"
      subtitle="Descrição"
      data="21/02/2027"
      registrationAvailable={false}
    />,
  )

  expect(screen.getByText(/Data do evento: 21\/02\/2027/)).toBeVisible()
  expect(screen.queryByText('Em breve')).not.toBeInTheDocument()
})

it('shows both event days independently from the technical opening date', () => {
  render(
    <Hero
      title={eventContent.title}
      subtitle={eventContent.subtitle}
      data={eventContent.dateLabel}
      registrationAvailable={false}
    />,
  )

  expect(screen.getByText(/Data do evento: 20 e 21\/02\/2027/)).toBeVisible()
  expect(eventContent.rules.startsAt).toBe('')
  expect(eventContent.rules.timeZone).toBe('America/Cuiaba')
})
