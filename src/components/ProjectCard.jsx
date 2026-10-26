export default function ProjectCard({ project, index }) {
  const { title, description, tech, year, shot, repo, demo } = project
  return (
    <article className="card">
      <div className="card-shot">
        {shot
          ? <img src={shot} alt={`Screenshot of ${title}`} loading="lazy" />
          : <span className="card-initial" aria-hidden="true">{title[0]}</span>}
      </div>
      <div className="card-body">
        <p className="mono meta">P.{String(index + 1).padStart(2, '0')} · {year}</p>
        <h3>{title}</h3>
        <p className="muted">{description}</p>
        <ul className="tags" aria-label="Technologies used">
          {tech.map((t) => <li key={t}>{t}</li>)}
        </ul>
        <div className="card-links">
          {repo && <a href={repo} target="_blank" rel="noreferrer">GitHub repo</a>}
          {demo && <a href={demo} target="_blank" rel="noreferrer">Live demo</a>}
        </div>
      </div>
    </article>
  )
}
