import { FunctionComponent, ReactNode, createContext, useState } from 'react'
import CartProducts from '../types/cartProducts.types'
import Product from '../types/product.types'

interface ICartContext {
  isVisible: boolean
  products: CartProducts[]
  toogleCart: () => void
  addProductToCart: (product: Product) => void
  removeProductFromCart: (productId: string) => void
  increaseProductQuantity: (productId: string) => void
}

interface ICartContextProviderProps {
  children: ReactNode
}

export const CartContext = createContext<ICartContext>({
  isVisible: false,
  products: [],
  toogleCart: () => {},
  addProductToCart: () => {},
  removeProductFromCart: () => {},
  increaseProductQuantity: () => {},
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
    const productIsAlreadyInCart = products.some(
      (item) => item.id === product.id
    )

    if (productIsAlreadyInCart) {
      return setProducts((prevState) =>
        prevState.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      )
    }

    setProducts((prevState) => [...prevState, { ...product, quantity: 1 }])
  }

  const removeProductFromCart = (productId: string) => {
    setProducts((product) => product.filter((item) => item.id !== productId))
  }

  const increaseProductQuantity = (productId: string) => {
    setProducts((products) =>
      products.map((product) =>
        product.id === productId
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    )
  }

  return (
    <CartContext.Provider
      value={{
        products,
        isVisible,
        toogleCart,
        addProductToCart,
        removeProductFromCart,
        increaseProductQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartContextProvider
