import { useEffect, useState } from 'react'
import Loader from '../components/Loader'

function HomePage() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true)
        const res = await fetch('https://dummyjson.com/products/categories')

        if (!res.ok) {
          throw new Error('Failed to load categories')
        }

        const data = await res.json()
        setCategories(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  return (
    <section>
      <h2>Home</h2>
      <p>This project uses React Router + API requests with fetch.</p>

      {loading && <Loader />}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <>
          <h3>Product categories from server:</h3>
          <ul className="category-list">
            {categories.slice(0, 8).map((category) => {
              const name = typeof category === 'string' ? category : category.name
              return <li key={name}>{name}</li>
            })}
          </ul>
        </>
      )}
    </section>
  )
}

export default HomePage
