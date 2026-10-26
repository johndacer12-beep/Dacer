import { useRef } from 'react'

export default function GalleryWall({ items, onOpen, onActiveChange }) {
  const track = useRef(null)
  const drag = useRef(null)
  const didDrag = useRef(false)

  const scroll = (direction) => {
    const distance = track.current?.querySelector('.gallery-card')?.getBoundingClientRect().width || 420
    track.current?.scrollBy({ left: direction * (distance + 28), behavior: 'smooth' })
  }

  const handleWheel = (event) => {
    const trackElement = track.current
    if (!trackElement || Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return
    event.preventDefault()
    trackElement.scrollBy({ left: event.deltaY, behavior: 'auto' })
  }

  const updateActive = () => {
    const element = track.current
    if (!element) return
    const center = element.getBoundingClientRect().left + element.clientWidth / 2
    const cards = [...element.querySelectorAll('.gallery-card')]
    let activeIndex = 0
    let nearestDistance = Infinity
    cards.forEach((card, index) => {
      const rect = card.getBoundingClientRect()
      const distance = Math.abs(rect.left + rect.width / 2 - center)
      if (distance < nearestDistance) { nearestDistance = distance; activeIndex = index }
    })
    onActiveChange?.(activeIndex)
  }

  const startDrag = (event) => {
    if (event.button !== 0) return
    drag.current = { x: event.clientX, scrollLeft: track.current.scrollLeft }
    didDrag.current = false
  }

  const moveDrag = (event) => {
    if (!drag.current) return
    const delta = event.clientX - drag.current.x
    if (Math.abs(delta) > 5 && !didDrag.current) {
      didDrag.current = true
      track.current.setPointerCapture(event.pointerId)
    }
    if (didDrag.current) track.current.scrollLeft = drag.current.scrollLeft - delta
  }

  const endDrag = () => { drag.current = null }

  return (
    <div className="gallery-wall">
      <div className="gallery-wall-heading">
        <span className="mono">DRAG · SCROLL · EXPLORE</span>
        <div className="gallery-wall-arrows">
          <button type="button" className="carousel-arrow" onClick={() => scroll(-1)} aria-label="Scroll gallery left">←</button>
          <button type="button" className="carousel-arrow" onClick={() => scroll(1)} aria-label="Scroll gallery right">→</button>
        </div>
      </div>
      <div className="gallery-track" ref={track} onWheel={handleWheel} onScroll={updateActive} onPointerDown={startDrag} onPointerMove={moveDrag} onPointerUp={endDrag} onPointerCancel={endDrag} onClickCapture={(event) => { if (didDrag.current) { event.preventDefault(); event.stopPropagation(); didDrag.current = false } }} role="region" aria-label="Gallery images, scroll horizontally" tabIndex={0}>
        {items.map((item, index) => item.pdf ? (
          <a className="gallery-card gallery-certificate" href={item.pdf} target="_blank" rel="noreferrer" key={item.title} aria-label={`Open ${item.title} certificate`}>
            <span className="gallery-frame">
              <span className="gallery-certificate-face">
                <span className="mono">CISCO NETWORKING ACADEMY</span>
                <strong>{item.title}</strong>
                <span>Certificate of completion</span>
              </span>
            </span>
            <span className="gallery-frame-caption">
              <span>{item.title}</span>
              <span className="mono">VIEW CERTIFICATE</span>
            </span>
          </a>
        ) : (
          <button className="gallery-card" type="button" key={item.title} onClick={() => { onActiveChange?.(index); onOpen(index) }} aria-label={`Open ${item.title}`}>
            <span className="gallery-frame">
              {item.image ? <img src={item.image} alt={item.title} /> : (
                <span className="gallery-empty" aria-hidden="true">
                  <span className="gallery-empty-index">{String(index + 1).padStart(2, '0')}</span>
                </span>
              )}
              <span className="gallery-frame-index">{String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</span>
            </span>
            <span className="gallery-frame-caption">
              <span>{item.title}</span>
              <span className="mono">OPEN ↗</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
