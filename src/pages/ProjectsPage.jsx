import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import Carousel3D from '../components/Carousel3D.jsx'
import PortfolioLoader from '../components/PortfolioLoader.jsx'
import { categories } from '../data.js'

export default function ProjectsPage() {
  const navigate = useNavigate()
  const page = useRef(null)
  const [loading, setLoading] = useState(false)
  const checkedTransition = useRef(false)
  const finishLoading = useCallback(() => setLoading(false), [])
  useLayoutEffect(() => {
    if (checkedTransition.current) return
    checkedTransition.current = true
    const shouldShow = window.sessionStorage.getItem('portfolio-loading') === '1'
    window.sessionStorage.removeItem('portfolio-loading')
    if (shouldShow) setLoading(true)
  }, [])
  useEffect(() => {
    const media = gsap.matchMedia()
    const ctx = gsap.context(() => {
      media.add({ reduce: '(prefers-reduced-motion: reduce)', full: '(prefers-reduced-motion: no-preference)' }, ({ conditions }) => {
        if (conditions.reduce) {
          gsap.from('.carousel-stage', { opacity: 0, duration: .3 })
        } else {
          gsap.from('.carousel-stage', {
            opacity: 0, y: 28, rotationX: -5, scale: .97,
            transformOrigin: '50% 50%', duration: .9, delay: .05,
            ease: 'power3.out', clearProps: 'transform',
          })
        }
      }, page)
    }, page)
    return () => { media.revert(); ctx.revert() }
  }, [])
  return <section className="projects-page" aria-labelledby="projects-page-title">
    {loading && <PortfolioLoader onComplete={finishLoading} />}
    <div ref={page}>
      <p className="mono projects-eyebrow">PORTFOLIO / COLLECTIONS</p>
      <h1 id="projects-page-title" className="sr-only">Projects</h1>
      <Carousel3D items={categories} label="Project collections" intro onOpen={(index) => navigate(`/projects/${categories[index].slug}`)} />
    </div>
  </section>
}
