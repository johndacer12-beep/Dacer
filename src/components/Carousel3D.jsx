import { useCallback, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import CategoryCard from './CategoryCard.jsx'
import Placeholder from './Placeholder.jsx'

function MyProjectPanel({ item, index, accent, active, onSelect }) {
  const [imageFailed, setImageFailed] = useState(false)
  return <div className={`carousel-card item-card c3d-panel myproject-panel${active ? ' is-active' : ''}`} onClick={() => { if (!active) onSelect() }}>
    {item.image && !imageFailed
      ? <img className="myproject-cover" src={item.image} alt={`Screenshot of ${item.title}`} loading="lazy" onError={() => setImageFailed(true)} />
      : <Placeholder item={{ ...item, image: null, caption: '' }} index={index} accent={accent} className="myproject-fallback" />}
    <div className="myproject-panel-info">
      <h3>{item.title}</h3>
      <p>{item.caption}</p>
      {item.link && <a className="myproject-prototype-link" href={item.link} target="_blank" rel="noopener noreferrer" aria-label={`Open ${item.title} prototype in Figma (new tab)`} tabIndex={active ? 0 : -1} style={{ pointerEvents: active ? 'auto' : 'none' }}>View prototype ↗</a>}
    </div>
  </div>
}

export default function Carousel3D({ items, accent, onOpen, label = 'carousel', intro = false, lightbox = false, initialIndex = 0, viewportSizing = false, autoRotate = false, myProjectPanels = false }) {
  const [active, setActive] = useState(initialIndex)
  const root = useRef(null)
  const startX = useRef(null)
  const didDrag = useRef(false)
  const reduced = useRef(false)
  const activeRef = useRef(active)
  const rotationIndex = useRef(initialIndex)
  const wheelDelta = useRef(0)
  const lastWheel = useRef(Number.NEGATIVE_INFINITY)
  const animationContext = useRef(null)
  const automaticStep = useRef(false)
  const move = useCallback((next, isAutomatic = false) => {
    const current = activeRef.current
    const normalized = (next + items.length) % items.length
    let delta = next - current
    if (Math.abs(delta) !== 1) {
      delta = normalized - current
      if (delta > items.length / 2) delta -= items.length
      if (delta < -items.length / 2) delta += items.length
    }
    rotationIndex.current += delta
    automaticStep.current = isAutomatic
    setActive(normalized)
  }, [items.length])
  activeRef.current = active
  useEffect(() => {
    const stage = root.current?.querySelector('.carousel-stage')
    if (!stage) return
    const onWheel = (event) => {
      const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY
      if (!delta) return
      event.preventDefault()
      wheelDelta.current += delta
      const now = performance.now()
      if (Math.abs(wheelDelta.current) >= 42) {
        if (now - lastWheel.current >= 520) {
          move(activeRef.current + (wheelDelta.current > 0 ? 1 : -1))
          lastWheel.current = now
        }
        wheelDelta.current = 0
      }
    }
    stage.addEventListener('wheel', onWheel, { passive: false })
    return () => stage.removeEventListener('wheel', onWheel)
  }, [move])

  useEffect(() => {
    const media = gsap.matchMedia()
    const stage = root.current?.querySelector('.carousel-stage')
    const ring = root.current?.querySelector('.carousel-ring')
    const positions = gsap.utils.toArray('.carousel-position', root.current)
    if (!stage || !ring) return
    let firstLayout = true
    const setLayout = () => {
      const stageWidth = stage.clientWidth
      const cardWidth = viewportSizing
        ? stageWidth * (window.matchMedia('(max-width: 899px)').matches ? .78 : .7)
        : root.current?.querySelector('.carousel-card')?.offsetWidth || 360
      if (viewportSizing) stage.style.setProperty('--carousel-panel-width', `${cardWidth}px`)
      const radius = items.length > 2 ? cardWidth / (2 * Math.tan(Math.PI / items.length)) * .72 : cardWidth * .65
      const step = 360 / items.length
      positions.forEach((position, i) => {
        const angle = i * step
        const radians = angle * Math.PI / 180
        gsap.set(position, {
          x: reduced.current ? 0 : Math.sin(radians) * radius,
          z: reduced.current ? 0 : Math.cos(radians) * radius,
          rotationY: reduced.current ? 0 : angle,
        })
      })
      if (firstLayout) {
        gsap.set(ring, { rotationY: reduced.current ? 0 : -rotationIndex.current * step })
        firstLayout = false
      }
      stage.dataset.ready = 'true'
    }
    const ctx = gsap.context(() => {
      media.add({ reduce: '(prefers-reduced-motion: reduce)', full: '(prefers-reduced-motion: no-preference)' }, (context) => {
        reduced.current = context.conditions.reduce
        firstLayout = true
        setLayout()
      }, root)
    }, root)
    const observer = viewportSizing && typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(setLayout)
      : null
    observer?.observe(stage)
    animationContext.current = ctx
    return () => { observer?.disconnect(); media.revert(); ctx.revert(); animationContext.current = null }
  }, [items.length, intro, lightbox, viewportSizing])

  useEffect(() => {
    const ctx = animationContext.current
    const ring = root.current?.querySelector('.carousel-ring')
    const positions = root.current ? gsap.utils.toArray('.carousel-position', root.current) : []
    if (!ctx || !ring) return
    const activeCtx = gsap.context(() => {
      const step = 360 / items.length
      gsap.to(ring, {
        rotationY: reduced.current ? 0 : -rotationIndex.current * step,
        duration: reduced.current ? .22 : automaticStep.current ? 2.25 : 1,
        ease: reduced.current ? 'power1.out' : 'power2.inOut',
        overwrite: true,
      })
      positions.forEach((position, i) => {
        const raw = Math.abs(i - active)
        const distance = Math.min(raw, items.length - raw)
        gsap.to(position, {
          opacity: myProjectPanels && distance > 2 ? 0 : reduced.current ? (distance === 0 ? 1 : .16) : Math.max(.28, 1 - distance * .22),
          scale: reduced.current ? 1 : 1 - distance * .035,
          duration: reduced.current ? .22 : .7,
          ease: 'power2.out',
          overwrite: true,
        })
        if (myProjectPanels) position.style.visibility = distance > 2 ? 'hidden' : 'visible'
        position.style.zIndex = String(items.length - distance)
      })
      automaticStep.current = false
    }, root)
    return () => {
      const rotation = gsap.getProperty(ring, 'rotationY')
      const visualState = positions.map((position) => ({ opacity: gsap.getProperty(position, 'opacity'), scale: gsap.getProperty(position, 'scale') }))
      activeCtx.revert()
      if (root.current) {
        gsap.set(ring, { rotationY: rotation })
        positions.forEach((position, i) => gsap.set(position, visualState[i]))
      }
    }
  }, [active, items.length, myProjectPanels])

  useEffect(() => {
    if (!intro || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = window.setTimeout(() => move(activeRef.current + 1, true), 2350)
    return () => window.clearTimeout(timer)
  }, [active, intro, move])

  useEffect(() => {
    if (!autoRotate || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = window.setInterval(() => move(activeRef.current + 1, true), 6500)
    return () => window.clearInterval(timer)
  }, [autoRotate, move])

  const keyDown = (event) => {
    if (event.key === 'ArrowRight') { event.preventDefault(); move(active + 1) }
    if (event.key === 'ArrowLeft') { event.preventDefault(); move(active - 1) }
  }
  const pointerDown = (event) => { startX.current = event.clientX; didDrag.current = false }
  const pointerUp = (event) => {
    if (startX.current == null) return
    const delta = event.clientX - startX.current
    const dragThreshold = myProjectPanels ? 6 : 35
    if (Math.abs(delta) > dragThreshold) { didDrag.current = true; move(active + (delta < 0 ? 1 : -1)) }
    startX.current = null
  }
  return <div className={`carousel-wrap${intro ? ' carousel-intro' : ''}${lightbox ? ' carousel-lightbox' : ''}${myProjectPanels ? ' carousel-myproject' : ''}`} ref={root}>
    <div className="carousel-stage" role="region" aria-roledescription="carousel" aria-label={label} tabIndex="0" onKeyDown={keyDown} onPointerDown={pointerDown} onPointerUp={pointerUp} onPointerCancel={() => { startX.current = null }} onClickCapture={(event) => { if (didDrag.current) { event.preventDefault(); event.stopPropagation(); didDrag.current = false } }}>
      <div className="carousel-ring">
      {items.map((item, i) => <div className="carousel-position" key={item.slug || item.title}>
        {item.slug ? <CategoryCard category={item} index={i} active={active === i} onClick={() => onOpen?.(i)} /> : myProjectPanels ?
          <MyProjectPanel item={item} index={i} accent={accent} active={active === i} onSelect={() => move(i)} /> : item.pdf ?
          <a className={`carousel-card item-card${active === i ? ' is-active' : ''}`} href={item.pdf} target="_blank" rel="noreferrer" onClick={(event) => { if (active !== i) { event.preventDefault(); move(i) } }} aria-label={`Open ${item.title} certificate`}>
            <Placeholder item={item} index={i} accent={accent} />
            <span className="carousel-card-title">{item.title}</span>
          </a> :
          <button type="button" className={`carousel-card item-card${active === i ? ' is-active' : ''}`} onClick={() => active === i ? onOpen?.(i) : move(i)} aria-label={`Open ${item.title}`}>
            <Placeholder item={item} index={i} accent={accent} />
            <span className="carousel-card-title">{item.title}</span>
          </button>}
      </div>)}
      </div>
    </div>
    <div className="carousel-controls">
      <button type="button" className="carousel-arrow" onClick={() => move(active - 1)} aria-label="Previous item">←</button>
      <div className="carousel-progress" aria-label={`Item ${active + 1} of ${items.length}`}>{items.map((_, i) => <button type="button" key={i} aria-label={`Go to item ${i + 1}`} aria-current={i === active ? 'step' : undefined} onClick={() => move(i)} />)}</div>
      <button type="button" className="carousel-arrow" onClick={() => move(active + 1)} aria-label="Next item">→</button>
    </div>
  </div>
}
