import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { profile } from '../data.js'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const portraitRef = useRef(null)
  const imageTiles = Array.from({ length: 64 }, (_, index) => ({
    x: index % 8,
    y: Math.floor(index / 8),
  }))

  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const isMobile = window.matchMedia('(max-width: 719px)').matches
      const scrollActions = isMobile ? 'play none none none' : 'play reverse play reverse'

      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
      tl.from('.hero-fade', { opacity: 0, y: 24, duration: 0.85, stagger: 0.12 })

      // Staggered 3D entrance wave for all 64 portrait tiles
      tl.fromTo('.portrait-tile',
        { scale: 0.8, opacity: 0, z: -30, rotationY: -25 },
        { scale: 1, opacity: 1, z: 0, rotationY: 0, duration: 0.85, ease: 'back.out(1.6)', stagger: { grid: [8, 8], from: 'center', amount: 0.6 } },
        0.15
      )

      // Character level 3D entrance for name
      gsap.fromTo('.hero h1 .char',
        { xPercent: (index) => index % 2 === 0 ? -35 : 35, rotationY: (index) => index % 2 === 0 ? -12 : 12, opacity: 0 },
        { xPercent: 0, rotationY: 0, opacity: 1, duration: 1.25, delay: .1, ease: 'back.out(1.5)', stagger: .035, immediateRender: false,
          scrollTrigger: { trigger: '.hero h1', start: isMobile ? 'top 96%' : 'top 92%', end: 'bottom top', toggleActions: scrollActions, once: isMobile } },
      )

      gsap.fromTo('.hero .tagline',
        { autoAlpha: 0, x: isMobile ? -24 : -48, y: 16 },
        { autoAlpha: 1, x: 0, y: 0, duration: 1.15, delay: .12, ease: 'back.out(1.4)', immediateRender: false,
          scrollTrigger: { trigger: '.hero .tagline', start: isMobile ? 'top 98%' : 'top 94%', end: 'bottom top', toggleActions: scrollActions, once: isMobile } },
      )

      gsap.fromTo('.hero .gradient-bar',
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 1.3, delay: .25, ease: 'power3.out', immediateRender: false,
          scrollTrigger: { trigger: '.hero .gradient-bar', start: isMobile ? 'top 98%' : 'top 94%', end: 'bottom top', toggleActions: scrollActions, once: isMobile } },
      )

      // Ambient mobile wave every 6 seconds to keep mobile visually dynamic
      let waveInterval
      if (isMobile) {
        waveInterval = window.setInterval(() => {
          gsap.fromTo('.portrait-tile',
            { z: 0, scale: 1 },
            { z: 16, scale: 1.08, filter: 'brightness(1.22)', duration: 0.45, ease: 'sine.inOut', yoyo: true, repeat: 1,
              stagger: { grid: [8, 8], from: 'edges', amount: 0.5 } }
          )
        }, 6000)
      }

      return () => {
        if (waveInterval) window.clearInterval(waveInterval)
      }
    })
    return () => mm.revert()
  }, [])

  // Interactive touch ripple when finger slides over portrait
  const handleTouchMove = (e) => {
    const touch = e.touches[0]
    if (!touch) return
    const el = document.elementFromPoint(touch.clientX, touch.clientY)
    if (el && el.classList.contains('portrait-tile')) {
      gsap.to(el, { z: 22, scale: 1.12, filter: 'brightness(1.25)', duration: 0.15, overwrite: 'auto' })
      gsap.to(el, { z: 0, scale: 1, filter: 'brightness(1)', duration: 0.5, delay: 0.2, overwrite: 'auto' })
    }
  }

  return (
    <section id="top" className="hero">
      <div className="hero-top">
        <div className="portrait hero-fade" role="img" aria-label={`Portrait of ${profile.name}`} ref={portraitRef}>
          <div className="portrait-tiles" aria-hidden="true" onTouchMove={handleTouchMove}>
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
