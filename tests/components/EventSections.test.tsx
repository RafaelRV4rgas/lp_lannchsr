import { render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import { EventSections } from '../../src/components/event/EventSections'
import { eventContent } from '../../src/content/event'

it('connects the discovery introduction to the speakers', () => {
  render(<EventSections content={eventContent} />)

  expect(screen.queryByText('CONHECIMENTO EM PERSPECTIVA')).not.toBeInTheDocument()
  expect(
    screen.getByText(/Ao longo de dez temas, o simpósio percorre diferentes caminhos da neurocirurgia/),
  ).toBeVisible()
  expect(screen.getByRole('heading', { name: 'Quem conduz essa jornada.' })).toBeVisible()
})
