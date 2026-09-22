import { expect, it } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { SpeakersSection } from '../../src/components/event/SpeakersSection'
import { speakers, talks } from '../../src/content/speakers'

it('renders one card per speaker and repeats the topic for shared talks', () => {
  render(<SpeakersSection speakers={speakers} talks={talks} />)
  expect(
    screen.getByRole('heading', {
      name: 'QUEM CONDUZ ESSA JORNADA',
      level: 3,
    }),
  ).toHaveClass('eyebrow')
  const program = screen.getByRole('list', { name: 'Palestrantes do simpósio' })
  expect(within(program).getAllByRole('listitem')).toHaveLength(12)
  const cards = screen.getAllByRole('article')
  expect(cards).toHaveLength(12)
  expect(speakers).toHaveLength(12)
  expect(screen.getAllByText('Neurocirurgia vascular/endovascular')).toHaveLength(2)
  expect(screen.getAllByText('Neurocirurgia de Base de Crânio')).toHaveLength(2)
  for (const speaker of speakers) expect(screen.getByRole('heading', { name: speaker.name })).toBeVisible()
})

it('shows the supplied photos and CRMs while using explicit fallbacks for pending material', () => {
  render(<SpeakersSection speakers={speakers} talks={talks} />)
  for (const crm of [
    'CRM-MT 4964',
    'CRM-MT 10420',
    'CRM-MT 3743',
    'CRM-MT 8054',
    'CRM-MT 4132',
    'CRM-MT 8470',
    'CRM-MT 10382',
    'CRM-MT 6414',
    'CRM-MT 8359',
  ])
    expect(screen.getByText(new RegExp(crm))).toBeVisible()
  expect(screen.getAllByText('CRM a informar')).toHaveLength(3)
  expect(
    screen.getAllByAltText(
      'Retrato genérico demonstrativo, não representa o palestrante',
    ),
  ).toHaveLength(10)
  expect(
    screen.getByRole('img', { name: 'Foto de Dr. Giovani Mendes' }),
  ).toHaveAttribute('src', '/images/palestrantes/giovanni_test.webp')
  expect(
    screen.getByRole('img', { name: 'Foto de Dr. Renato Santos Carvalho' }),
  ).toHaveAttribute('src', '/images/palestrantes/renato_santos.webp')
  expect(screen.getAllByText(/Apresentação demonstrativa:/)).toHaveLength(1)
})

it('provides complete profiles and valid unique references for every talk', () => {
  const assigned = talks.flatMap(talk => talk.speakerIds)
  expect(new Set(assigned).size).toBe(12)
  for (const speaker of speakers) {
    for (const value of [speaker.id, speaker.name, speaker.crm, speaker.bio, speaker.photoUrl]) expect(value.trim()).not.toBe('')
    expect(assigned).toContain(speaker.id)
  }
  for (const id of assigned) expect(speakers.some(speaker => speaker.id === id)).toBe(true)
})
