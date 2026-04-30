import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'

function ProductsPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const res = await fetch('https://dummyjson.com/products?limit=12')

        if (!res.ok) {
          throw new Error('Failed to load products')
        }

        const data = await res.json()
        setProducts(data.products)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return (
    <section>
      <h2>Products</h2>
      {loading && <Loader />}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <div className="cards">
          {products.map((product) => (
            <article key={product.id} className="card">
              <img src={product.thumbnail} alt={product.title} />
              <h3>{product.title}</h3>
              <p>${product.price}</p>
              <Link to={`/products/${product.id}`}>Open details</Link>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default ProductsPage
