import { render, screen } from '@testing-library/react'
import { expect, it, vi } from 'vitest'
import { StrictMode } from 'react'
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

it('reveals section content once when it enters the viewport', () => {
  const observe = vi.fn()
  const unobserve = vi.fn()
  let notify: IntersectionObserverCallback = () => undefined

  vi.stubGlobal(
    'IntersectionObserver',
    class {
      constructor(callback: IntersectionObserverCallback) {
        notify = callback
      }
      observe = observe
      unobserve = unobserve
      disconnect = vi.fn()
    },
  )

  const { container } = render(<EventSections content={eventContent} />)
  const target = container.querySelector<HTMLElement>('[data-scroll-reveal]')

  expect(target).not.toBeNull()
  expect(observe).toHaveBeenCalledWith(target)
  expect(target).not.toHaveClass('is-revealed')

  notify(
    [{ target, isIntersecting: true } as unknown as IntersectionObserverEntry],
    {} as IntersectionObserver,
  )

  expect(target).toHaveClass('is-revealed')
  expect(unobserve).toHaveBeenCalledWith(target)

  vi.unstubAllGlobals()
})

it('observes reveal targets again after the StrictMode effect cycle', () => {
  const observe = vi.fn()

  vi.stubGlobal(
    'IntersectionObserver',
    class {
      observe = observe
      unobserve = vi.fn()
      disconnect = vi.fn()
    },
  )

  const { container } = render(
    <StrictMode>
      <EventSections content={eventContent} />
    </StrictMode>,
  )
  const target = container.querySelector<HTMLElement>('[data-scroll-reveal]')

  expect(target).not.toBeNull()
  expect(observe.mock.calls.filter(([element]) => element === target)).toHaveLength(2)

  vi.unstubAllGlobals()
})
