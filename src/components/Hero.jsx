import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { profile } from '../data.js'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const imageTiles = Array.from({ length: 64 }, (_, index) => ({
    x: index % 8,
    y: Math.floor(index / 8),
  }))
  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
      tl.from('.hero-fade', { opacity: 0, y: 20, duration: 0.8, stagger: 0.12 })

      gsap.fromTo('.hero h1 .char',
        { xPercent: (index) => index % 2 === 0 ? -35 : 35, rotationY: (index) => index % 2 === 0 ? -12 : 12 },
        { xPercent: 0, rotationY: 0, duration: 1.35, delay: .12, ease: 'back.out(1.5)', stagger: .035, immediateRender: false,
          scrollTrigger: { trigger: '.hero h1', start: 'top 92%', end: 'bottom top', toggleActions: 'play reverse play reverse' } },
      )

      gsap.fromTo('.hero .tagline',
        { autoAlpha: 0, x: -48, y: 18 },
        { autoAlpha: 1, x: 0, y: 0, duration: 1.2, delay: .15, ease: 'back.out(1.4)', immediateRender: false,
          scrollTrigger: { trigger: '.hero .tagline', start: 'top 94%', end: 'bottom top', toggleActions: 'play reverse play reverse' } },
      )
      gsap.fromTo('.hero .gradient-bar',
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 1.4, delay: .3, ease: 'power3.out', immediateRender: false,
          scrollTrigger: { trigger: '.hero .gradient-bar', start: 'top 94%', end: 'bottom top', toggleActions: 'play reverse play reverse' } },
      )
    })
    return () => mm.revert()
  }, [])

  return (
    <section id="top" className="hero">
      <div className="hero-top">
        <div className="portrait hero-fade" role="img" aria-label={`Portrait of ${profile.name}`}>
          <div className="portrait-tiles" aria-hidden="true">
            {imageTiles.map(({ x, y }, index) => (
              <span
                className="portrait-tile"
                key={index}
                style={{ backgroundPosition: `${(x * 100) / 7}% ${(y * 100) / 7}%` }}
              />
            ))}
          </div>
        </div>
        <div className="hero-copy">
          <div className="cta hero-fade">
            <a className="btn btn-solid" href="#portfolio">View my work <span aria-hidden="true">→</span></a>
            <a className="btn" href="#contact">Contact me</a>
          </div>
          <p className="intro hero-fade"><strong>{profile.role}.</strong> {profile.intro}</p>
        </div>
        <p className="role-label hero-fade">{profile.role.toLowerCase()}</p>
      </div>
      <h1 aria-label={profile.name}>
        {profile.name.split(' ').map((word, w) => (
          <span className="word" key={w} aria-hidden="true">
            {[...word].map((c, i) => <span className="mask" key={i}><span className="char">{c}</span></span>)}
          </span>
        ))}
      </h1>
      <p className="tagline">{profile.tagline}</p>
      <div className="gradient-bar" aria-hidden="true" />
    </section>
  )
}
