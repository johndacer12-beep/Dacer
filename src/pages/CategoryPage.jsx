import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import gsap from 'gsap'
import NotFound from './NotFound.jsx'
import Carousel3D from '../components/Carousel3D.jsx'
import Lightbox from '../components/Lightbox.jsx'
import { categories } from '../data.js'

export default function CategoryPage() {
  const { category: slug } = useParams()
  const category = categories.find((item) => item.slug === slug)
  const [lightbox, setLightbox] = useState(false)
  const content = useRef(null)
  const navigate = useNavigate()
  useEffect(() => {
    if (!category) return
    const media = gsap.matchMedia()
    const ctx = gsap.context(() => {
      media.add({ reduce: '(prefers-reduced-motion: reduce)', full: '(prefers-reduced-motion: no-preference)' }, (context) => {
        const { reduce } = context.conditions
        if (reduce) gsap.from('.category-content', { opacity: 0, duration: .3 })
        else {
          gsap.from('.category-title-line', { yPercent: 110, duration: .9, stagger: .12, ease: 'power3.out' })
          gsap.from('.category-carousel', { x: 100, rotationY: -12, opacity: 0, duration: 1, ease: 'power3.out', delay: .15 })
        }
      })
    }, content)
    return () => { media.revert(); ctx.revert() }
  }, [category])
  useEffect(() => {
    if (!category) return
    const onKey = (event) => { if (event.key === 'Escape' && !lightbox) navigate('/projects') }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [category, lightbox, navigate])
  if (!category) return <NotFound />
  return <section className={`category-page${category.slug === 'myproject' ? ' myproject-category-page' : ''}`} style={{ '--category-accent': category.accent }} ref={content}>
    <button className="round-close" type="button" aria-label="Back to projects" onClick={() => navigate('/projects')}>×</button>
    <div className="category-content">
      <div className="category-copy">
        <div className="category-title-mask"><h1 className="category-title-line">{category.title}</h1></div>
        <p className="category-subtitle">{category.subtitle}</p>
        <p className="category-description">{category.description}</p>
      </div>
      <div className={`category-carousel${category.slug === 'myproject' ? ' myproject-category-carousel' : ''}`}>
        <Carousel3D items={category.items} accent={category.accent} label={`${category.title} items`} onOpen={(index) => setLightbox(index)} viewportSizing autoRotate myProjectPanels={category.slug === 'myproject'} />
      </div>
    </div>
    {lightbox !== false && <Lightbox items={category.items} accent={category.accent} initialIndex={lightbox} onClose={() => setLightbox(false)} />}
  </section>
}
