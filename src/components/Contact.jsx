import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { profile } from '../data.js'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const section = useRef(null)
  useEffect(() => {
    const media = gsap.matchMedia()
    const ctx = gsap.context(() => {
      media.add({ reduce: '(prefers-reduced-motion: reduce)', full: '(prefers-reduced-motion: no-preference)' }, ({ conditions }) => {
        const reduced = conditions.reduce
        const isMobile = window.matchMedia('(max-width: 719px)').matches
        const sideTravel = isMobile ? 30 : 150
        const scrollActions = isMobile ? 'play none none none' : 'play reverse play reverse'

        gsap.fromTo('.contact-content h2',
          { autoAlpha: 0, x: reduced ? 0 : -sideTravel, rotationY: reduced ? 0 : -20, transformOrigin: 'left center' },
          { autoAlpha: 1, x: 0, rotationY: 0, duration: 1.2, delay: .1, ease: 'back.out(1.5)', immediateRender: false,
            scrollTrigger: { trigger: section.current, start: isMobile ? 'top 92%' : 'top 90%', end: 'bottom 18%', toggleActions: scrollActions, once: isMobile } },
        )
        gsap.fromTo('.contact-content > :not(h2)',
          { autoAlpha: 0, x: (index) => reduced ? 0 : (index === 2 ? -sideTravel * .6 : sideTravel * .6), y: reduced ? 0 : 20 },
          { autoAlpha: 1, x: 0, y: 0, duration: 1.1, delay: .2, ease: 'back.out(1.4)', stagger: .12, immediateRender: false,
            scrollTrigger: { trigger: section.current, start: isMobile ? 'top 86%' : 'top 80%', end: 'bottom 18%', toggleActions: scrollActions, once: isMobile } },
        )
      }, section)
    }, section)
    return () => { media.revert(); ctx.revert() }
  }, [])
  return (
    <section id="contact" className="section contact" ref={section}>
      <div className="contact-content">
        <h2>Let's talk.</h2>
        <p className="muted">Have a project or a role in mind? A short message is the best way to start.</p>
        <a className="mail" href={`mailto:${profile.email}`}>{profile.email}</a>
        <p className="contact-links">
          <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        </p>
      </div>
    </section>
  )
}
