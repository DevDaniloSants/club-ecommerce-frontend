import { FunctionComponent, ReactNode, createContext, useState } from 'react'
import CartProducts from '../types/cartProducts.types'

interface ICartContext {
  isVisible: boolean
  products: CartProducts[]
  toogleCart: () => void
}

interface ICartContextProviderProps {
  children: ReactNode
}

export const CartContext = createContext<ICartContext>({
  isVisible: false,
  products: [],
  toogleCart: () => {},
})

const CartContextProvider: FunctionComponent<ICartContextProviderProps> = ({
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [products] = useState([])

  const toogleCart = () => {
    setIsVisible((prevState) => !prevState)
  }

  return (
    <CartContext.Provider value={{ products, isVisible, toogleCart }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartContextProvider
