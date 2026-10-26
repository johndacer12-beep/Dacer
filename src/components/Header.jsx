import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { profile } from '../data.js'

const links = [['top', 'Home'], ['about', 'About'], ['portfolio', 'Projects'], ['contact', 'Contact']]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('top')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    )
    links.forEach(([id]) => { const el = document.getElementById(id); if (el) io.observe(el) })
    return () => { window.removeEventListener('scroll', onScroll); io.disconnect() }
  }, [])

  return (
    <header className={`header${scrolled ? ' is-scrolled' : ''}`}>
      <Link to="/" className="brand">{profile.name}</Link>
      <nav aria-label="Primary">
        {links.map(([id, label]) => (
          <a key={id} href={`/#${id}`} className={active === id && window.location.pathname === '/' ? 'active' : ''} onClick={() => {
            if (window.location.pathname !== '/') window.sessionStorage.setItem('section-loading', label.toUpperCase())
            else window.sessionStorage.removeItem('section-loading')
            window.dispatchEvent(new CustomEvent('site:navigation-loading', { detail: { target: label.toUpperCase() } }))
          }}>{label}</a>
        ))}
      </nav>
    </header>
  )
}
