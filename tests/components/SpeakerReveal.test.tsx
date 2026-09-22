import { act, render, screen, within } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import { SpeakersSection } from '../../src/components/event/SpeakersSection'
import { speakers, talks } from '../../src/content/speakers'

afterEach(() => vi.unstubAllGlobals())

it('uses the confirmed speaker identities and updated neurointensivism topic', () => {
  expect(speakers).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        id: 'wilson-novais',
        name: 'Dr. Wilson Guimarães Novais',
        crm: expect.stringContaining('CRM-MT 3743'),
      }),
      expect.objectContaining({
        id: 'cleiton-onofre',
        name: 'Dr. Cleiton Onofre de Menezes',
        crm: expect.stringContaining('CRM-MT 10420'),
      }),
      expect.objectContaining({
        id: 'renato-santos',
        name: 'Dr. Renato Santos Carvalho',
        crm: expect.stringContaining('CRM-MT 8054'),
      }),
      expect.objectContaining({
        id: 'marconi-alves',
        name: 'Dr. Marconi Alves Rosa',
        crm: expect.stringContaining('CRM-MT 4132'),
      }),
      expect.objectContaining({
        id: 'joao-victor',
        name: 'Dr. João Victor Oliveira Franco Calado',
        crm: expect.stringContaining('CRM-MT 10382'),
      }),
      expect.objectContaining({
        id: 'luiz-eduardo',
        name: 'Dr. Luiz Eduardo Tenório',
        crm: expect.stringContaining('CRM-MT 8359'),
      }),
    ]),
  )
  expect(talks).toContainEqual(
    expect.objectContaining({
      id: 'neurointensivismo',
      title: 'Neurocirurgia de urgência e emergência — Neurointensivismo',
      speakerIds: ['luiz-felipe'],
    }),
  )
})

it('reveals each speaker once when its card enters the viewport', () => {
  let notify: IntersectionObserverCallback = () => undefined
  const observed: Element[] = []
  const unobserve = vi.fn()

  class TestIntersectionObserver {
    constructor(callback: IntersectionObserverCallback) {
      notify = callback
    }

    observe(target: Element) {
      observed.push(target)
    }

    unobserve(target: Element) {
      unobserve(target)
    }

    disconnect() {}
  }

  vi.stubGlobal('IntersectionObserver', TestIntersectionObserver)
  render(<SpeakersSection speakers={speakers} talks={talks} />)

  const list = screen.getByRole('list', { name: 'Palestrantes do simpósio' })
  const cards = within(list).getAllByRole('listitem')
  expect(list).toHaveClass('is-reveal-ready')
  expect(observed).toHaveLength(12)

  act(() => {
    notify(
      [
        { isIntersecting: true, target: cards[0] } as unknown as IntersectionObserverEntry,
      ],
      {} as IntersectionObserver,
    )
  })

  expect(cards[0]).toHaveClass('is-visible')
  expect(cards[1]).not.toHaveClass('is-visible')
  expect(unobserve).toHaveBeenCalledWith(cards[0])
})
