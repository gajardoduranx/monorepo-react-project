import { useId } from 'react'
import './Cart.css'
import { CartIcon, ClearCartIcon } from './Icons'
import { useCart } from '../hooks/useCart'

function CartItem ({ thumbnail, price, title, quantity, addToCard }) {
  return (
    <li>
      <img
        src={thumbnail} alt={title}
      />
      <div><strong>{title}</strong> - ${price}</div>
      <footer>
        <small>
          Qty:{quantity}
        </small>
        <button onClick={addToCard}>+</button>
      </footer>
    </li>
  )
}
export function Cart () {
  const cartCheckboxId = useId()
  const { cart, addToCart, clearCart } = useCart()
  return (
    <>
      <label className='cart-button' htmlFor={cartCheckboxId}>
        <CartIcon />
      </label>
      <input type='checkBox' id={cartCheckboxId} hidden />

      <aside className='cart'>
        <ul>
          {cart.map(product => (
            <CartItem
              key={product.id}
              addToCard={() => addToCart(product)}
              {...product}
            />
          ))}
        </ul>
        <button onClick={clearCart}>
          <ClearCartIcon />
        </button>
      </aside>
    </>
  )
}
