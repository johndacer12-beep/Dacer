import { useCallback, useLayoutEffect, useState } from 'react'
import gsap from 'gsap'
import Hero from '../components/Hero.jsx'
import About from '../components/About.jsx'
import PortfolioSection from '../components/PortfolioSection.jsx'
import Contact from '../components/Contact.jsx'
import PortfolioLoader from '../components/PortfolioLoader.jsx'

export default function Home() {
  const [loadingTarget, setLoadingTarget] = useState('')
  const finishLoading = useCallback((label) => {
    setLoadingTarget('')
    const sectionId = label?.toLowerCase() === 'home' ? 'top' : label?.toLowerCase()
    const section = sectionId && document.getElementById(sectionId)
    if (!section) return

    gsap.fromTo(section,
      { clipPath: 'inset(0 0 0 100%)', y: 24 },
      { clipPath: 'inset(0 0 0 0%)', y: 0, duration: 1.2, delay: .15, ease: 'power3.inOut', clearProps: 'clipPath,transform' },
    )
  }, [])
  useLayoutEffect(() => {
    const showSectionLoader = (event) => {
      if (event.detail?.target) setLoadingTarget(event.detail.target)
    }
    window.addEventListener('site:navigation-loading', showSectionLoader)
    const pendingTarget = window.sessionStorage.getItem('section-loading')
    window.sessionStorage.removeItem('section-loading')
    if (pendingTarget) setLoadingTarget(pendingTarget)
    return () => window.removeEventListener('site:navigation-loading', showSectionLoader)
  }, [])
  return (
    <>
      {loadingTarget && <PortfolioLoader label={loadingTarget} onComplete={finishLoading} />}
      <Hero />
      <About />
      <PortfolioSection />
      <Contact />
    </>
  )
}
