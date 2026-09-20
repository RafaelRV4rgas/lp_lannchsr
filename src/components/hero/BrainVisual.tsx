import { useEffect, useRef, useState } from 'react'

export function BrainVisual() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [failed, setFailed] = useState(false)
  useEffect(() => {
    const target = ref.current
    if (!target || !('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(entry.isIntersecting),
    )
    observer.observe(target)
    return () => observer.disconnect()
  }, [])
  return (
    <div
      ref={ref}
      className={`brain-visual${visible ? ' is-visible' : ''}`}
      aria-hidden="true"
    >
      {!failed && (
        <img
          className="brain-image"
          src="/images/brain-abstract-1200.webp"
          srcSet="/images/brain-abstract-640.webp 640w, /images/brain-abstract-1200.webp 1200w"
          sizes="(max-width: 1000px) 90vw, 60vw"
          width="1254"
          height="1254"
          alt=""
          fetchPriority="high"
          onError={() => setFailed(true)}
        />
      )}
      <div className="brain-orbit" />
      <div className="visual-note">
        <span className="status-dot" /> DIFERENTES ÁREAS. NOVAS CONEXÕES.
      </div>
    </div>
  )
}
