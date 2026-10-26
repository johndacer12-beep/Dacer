import { useState } from 'react'

const patterns = [
  'radial-gradient(circle at 72% 24%, var(--accent), transparent 32%), linear-gradient(145deg, #242424, #090909)',
  'repeating-linear-gradient(135deg, transparent 0 13px, color-mix(in srgb, var(--accent) 35%, transparent) 14px 15px), linear-gradient(145deg, #202020, #090909)',
  'radial-gradient(circle at 30% 70%, color-mix(in srgb, var(--accent) 70%, transparent) 0 1px, transparent 2px) 0 0/18px 18px, linear-gradient(145deg, #222, #090909)',
  'linear-gradient(90deg, transparent 49%, color-mix(in srgb, var(--accent) 55%, transparent) 50%, transparent 51%), linear-gradient(0deg, transparent 49%, color-mix(in srgb, var(--accent) 35%, transparent) 50%, transparent 51%), linear-gradient(145deg, #242424, #090909)',
  'radial-gradient(ellipse at 80% 85%, color-mix(in srgb, var(--accent) 70%, transparent), transparent 36%), linear-gradient(145deg, #242424, #090909)',
  'repeating-radial-gradient(circle at 50% 50%, transparent 0 17px, color-mix(in srgb, var(--accent) 32%, transparent) 18px 19px), linear-gradient(145deg, #242424, #090909)',
]

export default function Placeholder({ item, index = 0, accent, className = '' }) {
  const [failed, setFailed] = useState(false)
  const style = { '--accent': accent, '--visual-pattern': patterns[index % patterns.length], objectPosition: item.imagePosition }
  if (item.image && !failed) return <img className={`generated-image ${className}`} style={style} src={item.image} alt={item.imageAlt || item.title} loading="lazy" onError={() => setFailed(true)} />
  return <div className={`placeholder ${className}`} style={style} aria-label={`${item.title} visual`}>
    <span className="placeholder-number">{String(index + 1).padStart(2, '0')}</span>
    <span className="placeholder-title">{item.title}</span>
    <span className="placeholder-caption">{item.caption}</span>
  </div>
}
