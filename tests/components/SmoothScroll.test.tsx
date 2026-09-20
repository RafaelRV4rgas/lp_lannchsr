import { render } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import App from '../../src/App'

afterEach(() => {
  document.documentElement.className = ''
  vi.unstubAllGlobals()
})

it('enables inertial scrolling while the application is mounted', () => {
  vi.stubGlobal(
    'matchMedia',
    vi.fn().mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }),
  )
  vi.stubGlobal(
    'ResizeObserver',
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    },
  )
  vi.stubGlobal('requestAnimationFrame', vi.fn(() => 1))
  vi.stubGlobal('cancelAnimationFrame', vi.fn())

  const view = render(<App />)

  expect(document.documentElement).toHaveClass('lenis')

  view.unmount()
  expect(document.documentElement).not.toHaveClass('lenis')
})
