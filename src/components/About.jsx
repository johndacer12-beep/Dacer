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
        const sideTravel = window.matchMedia('(max-width: 719px)').matches ? 54 : 150
        gsap.fromTo('.about-top h2',
          { autoAlpha: 0, x: reduced ? 0 : -sideTravel, rotationY: reduced ? 0 : -24, transformOrigin: 'left center' },
          { autoAlpha: 1, x: 0, rotationY: 0, duration: 1.25, delay: .12, ease: 'back.out(1.6)', immediateRender: false,
            scrollTrigger: { trigger: section.current, start: 'top 90%', end: 'bottom 18%', toggleActions: 'play reverse play reverse' } },
        )
        gsap.fromTo('.about-top .prose',
          { autoAlpha: 0, x: reduced ? 0 : sideTravel, rotationY: reduced ? 0 : 18, transformOrigin: 'right center' },
          { autoAlpha: 1, x: 0, rotationY: 0, duration: 1.25, delay: .24, ease: 'back.out(1.6)', immediateRender: false,
            scrollTrigger: { trigger: section.current, start: 'top 82%', end: 'bottom 18%', toggleActions: 'play reverse play reverse' } },
        )
        gsap.fromTo('.about-details .expertise li',
          { autoAlpha: 0, x: (index) => reduced ? 0 : (index % 2 === 0 ? -sideTravel * .7 : sideTravel * .7), y: reduced ? 0 : 24, rotationY: (index) => reduced ? 0 : (index % 2 === 0 ? -16 : 16) },
          { autoAlpha: 1, x: 0, y: 0, rotationY: 0, duration: 1.15, delay: .12, ease: 'back.out(1.5)', stagger: .12, immediateRender: false,
            scrollTrigger: { trigger: '.about-details', start: 'top 94%', end: 'bottom 18%', toggleActions: 'play reverse play reverse' } },
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
