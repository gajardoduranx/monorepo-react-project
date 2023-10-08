import { useContext } from 'react'
import { CartContext } from '../context/cart'

// Hooks que usa el ontexto y lo retorna validado
export const useCart = () => {
  const context = useContext(CartContext)

  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
