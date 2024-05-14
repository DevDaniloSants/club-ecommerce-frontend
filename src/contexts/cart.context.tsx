import { FunctionComponent, ReactNode, createContext, useState } from 'react'
import CartProducts from '../types/cartProducts.types'
import Product from '../types/product.types'

interface ICartContext {
  isVisible: boolean
  products: CartProducts[]
  toogleCart: () => void
  addProductToCart: (product: Product) => void
}

interface ICartContextProviderProps {
  children: ReactNode
}

export const CartContext = createContext<ICartContext>({
  isVisible: false,
  products: [],
  toogleCart: () => {},
  addProductToCart: () => {},
})

const CartContextProvider: FunctionComponent<ICartContextProviderProps> = ({
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [products, setProducts] = useState<CartProducts[]>([])

  const toogleCart = () => {
    setIsVisible((prevState) => !prevState)
  }

  const addProductToCart = (product: Product) => {
    setProducts((prevState) => [...prevState, { ...product, quantity: 1 }])
  }

  return (
    <CartContext.Provider
      value={{ products, isVisible, toogleCart, addProductToCart }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartContextProvider
