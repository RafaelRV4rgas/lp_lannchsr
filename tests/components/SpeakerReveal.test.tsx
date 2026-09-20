import { act, render, screen, within } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import { SpeakersSection } from '../../src/components/event/SpeakersSection'
import { speakers, talks } from '../../src/content/speakers'

afterEach(() => vi.unstubAllGlobals())

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
