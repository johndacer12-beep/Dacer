import { useEffect } from 'react'
import Carousel3D from './Carousel3D.jsx'

export default function Lightbox({ items, accent, initialIndex = 0, onClose }) {
  useEffect(() => {
    const onKey = (event) => { if (event.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])
  return <div className="lightbox" role="dialog" aria-modal="true" aria-label="Project image viewer" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
    <button className="round-close lightbox-close" onClick={onClose} aria-label="Close image viewer">×</button>
    <Carousel3D items={items} accent={accent} label="Project images" lightbox initialIndex={initialIndex} />
  </div>
}
