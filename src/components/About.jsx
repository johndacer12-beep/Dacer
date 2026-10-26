import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { profile, expertise } from '../data.js'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const section = useRef(null)
  useEffect(() => {
    const media = gsap.matchMedia()
    const ctx = gsap.context(() => {
      media.add({ reduce: '(prefers-reduced-motion: reduce)', full: '(prefers-reduced-motion: no-preference)' }, ({ conditions }) => {
        const reduced = conditions.reduce
        const isMobile = window.matchMedia('(max-width: 719px)').matches
        const sideTravel = isMobile ? 30 : 150
        const scrollActions = isMobile ? 'play none none none' : 'play reverse play reverse'

        gsap.fromTo('.about-top h2',
          { autoAlpha: 0, x: reduced ? 0 : -sideTravel, rotationY: reduced ? 0 : -20, transformOrigin: 'left center' },
          { autoAlpha: 1, x: 0, rotationY: 0, duration: 1.2, delay: .1, ease: 'back.out(1.5)', immediateRender: false,
            scrollTrigger: { trigger: section.current, start: isMobile ? 'top 92%' : 'top 90%', end: 'bottom 18%', toggleActions: scrollActions, once: isMobile } },
        )
        gsap.fromTo('.about-top .prose',
          { autoAlpha: 0, x: reduced ? 0 : sideTravel, rotationY: reduced ? 0 : 16, transformOrigin: 'right center' },
          { autoAlpha: 1, x: 0, rotationY: 0, duration: 1.2, delay: .2, ease: 'back.out(1.5)', immediateRender: false,
            scrollTrigger: { trigger: section.current, start: isMobile ? 'top 86%' : 'top 82%', end: 'bottom 18%', toggleActions: scrollActions, once: isMobile } },
        )
        gsap.fromTo('.about-details .expertise li',
          { autoAlpha: 0, x: (index) => reduced ? 0 : (index % 2 === 0 ? -sideTravel * .6 : sideTravel * .6), y: reduced ? 0 : 22, rotationY: (index) => reduced ? 0 : (index % 2 === 0 ? -12 : 12) },
          { autoAlpha: 1, x: 0, y: 0, rotationY: 0, duration: 1.1, delay: .1, ease: 'back.out(1.4)', stagger: .12, immediateRender: false,
            scrollTrigger: { trigger: '.about-details', start: isMobile ? 'top 96%' : 'top 94%', end: 'bottom 18%', toggleActions: scrollActions, once: isMobile } },
        )
      }, section)
    }, section)
    return () => { media.revert(); ctx.revert() }
  }, [])
  return (
    <section id="about" className="section about-section" ref={section}>
      <div className="split about-top">
        <h2>About</h2>
        <div className="prose">
          <p className="lead">{profile.philosophy}</p>
          {profile.bio.map((p, i) => <p key={i}>{p}</p>)}
          <p className="muted">Based in {profile.location}.</p>
        </div>
      </div>
      <div className="split split-grid about-details">
        <p className="count" aria-hidden="true"></p>
        <ul className="expertise">
          {expertise.map((e) => (
            <li key={e.id}>
              <div><h3>{e.title}</h3><p>{e.text}</p></div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
