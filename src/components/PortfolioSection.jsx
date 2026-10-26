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
      const sideTravel = window.matchMedia('(max-width: 719px)').matches ? 54 : 145
      gsap.fromTo('.portfolio-section .section-head',
        { autoAlpha: 0, x: reducedMotion ? 0 : -sideTravel, rotationY: reducedMotion ? 0 : -22, transformOrigin: 'left center' },
        { autoAlpha: 1, x: 0, rotationY: 0, duration: 1.25, delay: .12, ease: 'back.out(1.6)', immediateRender: false,
          scrollTrigger: { trigger: section.current, start: 'top 90%', end: 'bottom 18%', toggleActions: 'play reverse play reverse' } },
      )
      gsap.fromTo('.portfolio-section .portfolio-eyebrow',
        { autoAlpha: 0, x: reducedMotion ? 0 : sideTravel * .85 },
        { autoAlpha: 1, x: 0, duration: 1.15, delay: .24, ease: 'back.out(1.5)', immediateRender: false,
          scrollTrigger: { trigger: section.current, start: 'top 82%', end: 'bottom 18%', toggleActions: 'play reverse play reverse' } },
      )
      gsap.fromTo('.portfolio-section .carousel-wrap',
        { autoAlpha: 0, x: reducedMotion ? 0 : sideTravel, rotationY: reducedMotion ? 0 : 12, scale: reducedMotion ? 1 : .94, transformOrigin: 'right center' },
        { autoAlpha: 1, x: 0, rotationY: 0, scale: 1, duration: 1.3, delay: .18, ease: 'back.out(1.6)', immediateRender: false,
          scrollTrigger: { trigger: '.portfolio-section .carousel-wrap', start: 'top 96%', end: 'bottom 18%', toggleActions: 'play reverse play reverse' } },
      )
    }, section)
    return () => ctx.revert()
  }, [])

  return <section id="portfolio" className="section portfolio-section" aria-labelledby="portfolio-title" ref={section}>
    <div className="section-head"><h2 id="portfolio-title">Projects</h2></div>
    <p className="mono portfolio-eyebrow">SELECT A COLLECTION</p>
    <Carousel3D items={categories} label="Project collections" intro onOpen={(index) => navigate(`/projects/${categories[index].slug}`)} />
  </section>
}
