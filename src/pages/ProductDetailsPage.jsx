import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Loader from '../components/Loader'

function ProductDetailsPage() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const res = await fetch(`https://dummyjson.com/products/${id}`)

        if (!res.ok) {
          throw new Error('Product not found')
        }

        const data = await res.json()
        setProduct(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  if (loading) return <Loader />
  if (error) return <p className="error">{error}</p>
  if (!product) return null

  return (
    <section>
      <h2>Product Details (dynamic route)</h2>
      <article className="details">
        <img src={product.thumbnail} alt={product.title} />
        <div>
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          <p>
            <strong>Category:</strong> {product.category}
          </p>
          <p>
            <strong>Price:</strong> ${product.price}
          </p>
          <p>
            <strong>Rating:</strong> {product.rating}
          </p>
        </div>
      </article>
      <Link to="/products">Back to products</Link>
    </section>
  )
}

export default ProductDetailsPage
