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
        const sideTravel = window.matchMedia('(max-width: 719px)').matches ? 54 : 150
        gsap.fromTo('.contact-content h2',
          { autoAlpha: 0, x: reduced ? 0 : -sideTravel, rotationY: reduced ? 0 : -24, transformOrigin: 'left center' },
          { autoAlpha: 1, x: 0, rotationY: 0, duration: 1.25, delay: .12, ease: 'back.out(1.6)', immediateRender: false,
            scrollTrigger: { trigger: section.current, start: 'top 90%', end: 'bottom 18%', toggleActions: 'play reverse play reverse' } },
        )
        gsap.fromTo('.contact-content > :not(h2)',
          { autoAlpha: 0, x: (index) => reduced ? 0 : (index === 2 ? -sideTravel * .8 : sideTravel * .8), y: reduced ? 0 : 22 },
          { autoAlpha: 1, x: 0, y: 0, duration: 1.15, delay: .24, ease: 'back.out(1.5)', stagger: .12, immediateRender: false,
            scrollTrigger: { trigger: section.current, start: 'top 80%', end: 'bottom 18%', toggleActions: 'play reverse play reverse' } },
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
