import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProjectCard from './ProjectCard.jsx'
import { projects } from '../data.js'
import { Link } from 'react-router-dom'

gsap.registerPlugin(ScrollTrigger)

export default function Projects() {
  const grid = useRef(null)

  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from(grid.current.children, {
        opacity: 0, y: 40, duration: 0.8, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: grid.current, start: 'top 80%', once: true },
      })
    })
    return () => mm.revert()
  }, [])

  return (
    <section id="projects" className="section">
      <div className="section-head"><h2>Projects</h2></div>
      <div className="grid" ref={grid}>
        {projects.map((p, i) => <ProjectCard key={p.slug} project={p} index={i} />)}
      </div>
      <Link className="projects-view-all" to="/projects">View all projects <span aria-hidden="true">→</span></Link>
    </section>
  )
}
