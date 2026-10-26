import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="section notfound">
      <h1>Page not found</h1>
      <p>That address doesn't exist on this site.</p>
      <Link className="btn btn-primary" to="/">Back to home</Link>
    </section>
  )
}
