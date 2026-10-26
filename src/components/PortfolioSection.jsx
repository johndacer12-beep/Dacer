import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Carousel3D from './Carousel3D.jsx'
import { categories } from '../data.js'

gsap.registerPlugin(ScrollTrigger)

export default function PortfolioSection() {
  const navigate = useNavigate()
  const section = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const isMobile = window.matchMedia('(max-width: 719px)').matches
      const sideTravel = isMobile ? 32 : 145
      const scrollActions = isMobile ? 'play none none none' : 'play reverse play reverse'

      gsap.fromTo('.portfolio-section .section-head',
        { autoAlpha: 0, x: reducedMotion ? 0 : -sideTravel, rotationY: reducedMotion ? 0 : -18, transformOrigin: 'left center' },
        { autoAlpha: 1, x: 0, rotationY: 0, duration: 1.2, delay: .1, ease: 'back.out(1.5)', immediateRender: false,
          scrollTrigger: { trigger: section.current, start: isMobile ? 'top 92%' : 'top 90%', end: 'bottom 18%', toggleActions: scrollActions, once: isMobile } },
      )
      gsap.fromTo('.portfolio-section .portfolio-eyebrow',
        { autoAlpha: 0, x: reducedMotion ? 0 : sideTravel * .75 },
        { autoAlpha: 1, x: 0, duration: 1.1, delay: .2, ease: 'back.out(1.4)', immediateRender: false,
          scrollTrigger: { trigger: section.current, start: isMobile ? 'top 88%' : 'top 82%', end: 'bottom 18%', toggleActions: scrollActions, once: isMobile } },
      )
      gsap.fromTo('.portfolio-section .carousel-wrap',
        { autoAlpha: 0, x: reducedMotion ? 0 : sideTravel, rotationY: reducedMotion ? 0 : 10, scale: reducedMotion ? 1 : .95, transformOrigin: 'right center' },
        { autoAlpha: 1, x: 0, rotationY: 0, scale: 1, duration: 1.25, delay: .15, ease: 'back.out(1.5)', immediateRender: false,
          scrollTrigger: { trigger: '.portfolio-section .carousel-wrap', start: isMobile ? 'top 98%' : 'top 96%', end: 'bottom 18%', toggleActions: scrollActions, once: isMobile } },
      )
    }, section)
    return () => ctx.revert()
  }, [])

  return <section id="portfolio" className="section portfolio-section" aria-labelledby="portfolio-title" ref={section}>
    <div className="section-head"><h2 id="portfolio-title">Projects</h2></div>
    <p className="mono portfolio-eyebrow">SELECT A COLLECTION</p>
    <Carousel3D items={categories} label="Project collections" intro autoRotate onOpen={(index) => navigate(`/projects/${categories[index].slug}`)} />
  </section>
}
