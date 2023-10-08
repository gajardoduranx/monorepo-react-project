import { createContext, useReducer } from 'react'
import { reducer, initialState, CART_ACTION_TYPES } from '../reducer/cart'

// Creacio del contexto
export const CartContext = createContext()

const useCartReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const addToCart = product => dispatch({
    type: CART_ACTION_TYPES.ADD_TO_CART,
    payload: product
  })
  const removeFromCart = product => dispatch({
    type: CART_ACTION_TYPES.REMOVE_FROM_CART,
    payload: product
  })
  const clearCart = () => dispatch({ type: CART_ACTION_TYPES.CLEAR_CART })

  return { addToCart, removeFromCart, clearCart, state }
}

// Creacion de provedor
export function CartProvider ({ children }) {
  const { state, addToCart, removeFromCart, clearCart } = useCartReducer()

  return (
    // Props para los children
    <CartContext.Provider value={{
      cart: state,
      removeFromCart,
      addToCart,
      clearCart
    }}
    >
      {children}
    </CartContext.Provider>
  )
}
