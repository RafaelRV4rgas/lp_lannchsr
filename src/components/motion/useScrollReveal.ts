import { useEffect } from 'react'

export function useScrollReveal(): void {
  useEffect(() => {
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>(
        '[data-scroll-reveal]:not([data-reveal-observed])',
      ),
    )

    if (!targets.length) return

    const reduceMotion =
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false

    if (reduceMotion || !('IntersectionObserver' in window)) {
      targets.forEach((target) => target.classList.add('is-revealed'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const target = entry.target as HTMLElement
          target.classList.add('is-revealed')
          observer.unobserve(target)
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    )

    targets.forEach((target) => {
      target.dataset.revealObserved = 'true'
      observer.observe(target)
    })

    return () => {
      observer.disconnect()
      targets.forEach((target) => {
        delete target.dataset.revealObserved
      })
    }
  }, [])
}
