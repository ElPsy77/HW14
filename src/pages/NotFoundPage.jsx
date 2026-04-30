import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <section>
      <h2>404 - Page not found</h2>
      <p>The route does not exist.</p>
      <Link to="/">Go to Home</Link>
    </section>
  )
}

export default NotFoundPage
