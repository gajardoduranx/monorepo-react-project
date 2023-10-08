import './Products.css'
import { AddToCartIcon, RemoveFromCartIcon } from './Icons'
import { useCart } from '../hooks/useCart'

export function Products ({ products }) {
  // Uso del Hooks que devuelve el contexto
  const { addToCart, cart, removeFromCart } = useCart()
  // Funcion que devuelve un bolean true si los id son iguales
  const checkProductInCart = product => {
    return cart.some(item => item.id === product.id)
  }
  return (
    <main className='products'>
      <ul>
        {
            products.slice(0, 10).map((product) => {
              // True or False
              const isProductInCart = checkProductInCart(product)
              return (
                <li key={product.id}>
                  <img src={product.thumbnail} alt={product.title} />
                  <div>
                    <strong>{product.title}</strong> - ${product.price}
                  </div>
                  <div>
                    <button
                    // True - lo remueve.red.iconRemove False - lo agrega.#09f.iconAdd
                      onClick={() => { isProductInCart ? removeFromCart(product) : addToCart(product) }}
                      style={{ backgroundColor: isProductInCart ? 'red' : '#09f' }}
                    >
                      {isProductInCart ? <RemoveFromCartIcon /> : <AddToCartIcon />}
                    </button>
                  </div>
                </li>
              )
            })
        }
      </ul>
    </main>
  )
}
