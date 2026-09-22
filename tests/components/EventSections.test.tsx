import { render, screen, within } from '@testing-library/react'
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
  expect(
    screen.getByRole('heading', { name: 'QUEM CONDUZ ESSA JORNADA', level: 3 }),
  ).toBeVisible()
})

it('presents ten sub-specialties without numbered cards before the speakers', () => {
  render(<EventSections content={eventContent} />)

  const section = screen.getByRole('region', {
    name: 'Subespecialidades abordadas',
  })
  const label = within(section).getByText('SUBESPECIALIDADES ABORDADAS')
  expect(label).toBeVisible()
  expect(label).toHaveClass('eyebrow')
  expect(label.tagName).toBe('P')
  expect(
    within(section).queryByRole('heading', { name: 'SUBESPECIALIDADES ABORDADAS' }),
  ).not.toBeInTheDocument()
  expect(within(section).getAllByRole('article')).toHaveLength(10)
  expect(
    within(section).getByRole('heading', {
      name: 'Neurocirurgia endovascular',
    }),
  ).toBeVisible()
  expect(within(section).queryByText(/^0[1-9]$|^10$/)).not.toBeInTheDocument()
})

it('uses the confirmed organization and supporting league names', () => {
  expect(eventContent.organization).toBe(
    'Liga Acadêmica de Neurologia e Neurocirurgia do Hospital Santa Rosa',
  )
  expect(eventContent.supporters).toContain('Liga Brasileira de Neurocirurgia')
})

it('highlights the certificate as a fifth benefit', () => {
  render(<EventSections content={eventContent} />)

  const benefits = screen.getByRole('region', {
    name: 'O que você vai encontrar',
  })
  expect(benefits.querySelectorAll('article')).toHaveLength(5)
  expect(
    screen.getByRole('heading', { name: 'Certifique sua participação' }),
  ).toBeVisible()
  expect(screen.getByText(/certificado emitido pela Academia Brasileira de Neurocirurgia/i)).toBeVisible()
  expect(
    screen
      .getByRole('heading', { name: 'Leve a experiência com você' })
      .closest('article'),
  ).not.toHaveTextContent(/certificado/i)
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
