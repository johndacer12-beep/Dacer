import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { categories } from '../data.js'

export default function PortfolioLoader({ onComplete, label = 'PORTFOLIO' }) {
  const root = useRef(null)
  const ring = useRef(null)
  useEffect(() => {
    const media = gsap.matchMedia()
    const ctx = gsap.context(() => {
      media.add({ reduce: '(prefers-reduced-motion: reduce)', full: '(prefers-reduced-motion: no-preference)' }, ({ conditions }) => {
        if (conditions.reduce) gsap.set(ring.current, { rotationY: 0 })
        else gsap.to(ring.current, { rotationY: 360, duration: 1.05, repeat: -1, ease: 'none' })
      }, root)
    }, root)
    const timer = window.setTimeout(() => {
      gsap.to(root.current, { opacity: 0, duration: .25, ease: 'power1.out', onComplete: () => onComplete?.(label) })
    }, 800)
    return () => { window.clearTimeout(timer); media.revert(); ctx.revert() }
  }, [onComplete])
  return <div className="portfolio-loader" role="status" aria-label={`Loading ${label.toLowerCase()}`} ref={root}>
    <p className="mono">{label}</p>
    <div className="loader-stage" aria-hidden="true"><div className="loader-ring" ref={ring}>
      {categories.map((category, index) => <span key={category.slug} className="loader-tile" style={{ '--loader-accent': category.accent, '--tile-angle': `${index * 90}deg` }} />)}
    </div></div>
    <p className="mono">OPENING {label}</p>
  </div>
}
