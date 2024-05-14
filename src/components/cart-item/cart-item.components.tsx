import { FunctionComponent, useContext } from 'react'
import { AiOutlineClose, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

import CartProducts from '../../types/cartProducts.types'
import {
  CartItemContainer,
  CartItemImage,
  CartItemInfo,
  CartItemQuantity,
  RemoveButton,
} from './cart-item.styles'
import { CartContext } from '../../contexts/cart.context'

interface CartItemProps {
  product: CartProducts
}

const CartItem: FunctionComponent<CartItemProps> = ({ product }) => {
  const { removeProductFromCart, increaseProductQuantity } =
    useContext(CartContext)

  const handleRemoveClick = () => {
    removeProductFromCart(product.id)
  }

  const handleIncreaseClick = () => {
    increaseProductQuantity(product.id)
  }

  return (
    <CartItemContainer>
      <CartItemImage imageurl={product.imageUrl} />

      <CartItemInfo>
        <p>{product.name}</p>
        <p>R${product.price}</p>
        <CartItemQuantity>
          <AiOutlineMinus />
          <p>{product.quantity}</p>
          <AiOutlinePlus onClick={handleIncreaseClick} />
        </CartItemQuantity>
      </CartItemInfo>

      <RemoveButton onClick={handleRemoveClick}>
        <AiOutlineClose />
      </RemoveButton>
    </CartItemContainer>
  )
}

export default CartItem
