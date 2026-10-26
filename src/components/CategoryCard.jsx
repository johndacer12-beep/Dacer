import Placeholder from './Placeholder.jsx'

export default function CategoryCard({ category, active, onClick, index }) {
  return <button type="button" className={`carousel-card category-card${active ? ' is-active' : ''}`} onClick={onClick} aria-label={`Open ${category.title}`} aria-current={active ? 'true' : undefined}>
    <Placeholder item={{ title: category.title, caption: category.subtitle, image: null }} index={index} accent={category.accent} />
    <span className="carousel-card-title">{category.title}</span>
  </button>
}
