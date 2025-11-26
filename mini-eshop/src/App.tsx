
import './App.css'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import type { Product, ProductState } from './types'
import { fetchProducts } from './slices/productSlice'
import type { AppDispatch } from './store'
function App() {
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])
  
  const products = useSelector((state: { products: ProductState }) => state.products.items)
  const loading = useSelector((state: { products: ProductState }) => state.products.loading)
  const error = useSelector((state: { products: ProductState }) => state.products.error)
  
  if (error) {
    return <div>Error: {error}</div>
  }
  console.log("Loading state:", loading);
  console.log("Products from store:", products);
  return (
    <>
      {
        loading ? "Loading..." :
        products.map((product: Product) => (
          <div key={product.id}>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>${product.price}</p>
          </div>
        ))
      }
    </>
  )
}

export default App
