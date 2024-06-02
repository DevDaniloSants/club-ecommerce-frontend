import { FunctionComponent } from 'react'
import { AiOutlineClose, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { useDispatch } from 'react-redux'

import CartProducts from '../../types/cartProducts.types'
import {
  decreaseProductQuantity,
  increaseProductQuantity,
  removeProduct,
} from '../../store/toolkit/cart/cartSlice'

import {
  CartItemContainer,
  CartItemImage,
  CartItemInfo,
  CartItemQuantity,
  RemoveButton,
} from './cart-item.styles'

interface CartItemProps {
  product: CartProducts
}

const CartItem: FunctionComponent<CartItemProps> = ({ product }) => {
  const dispatch = useDispatch()

  const handleRemoveClick = () => {
    dispatch(removeProduct(product.id))
  }

  const handleIncreaseClick = () => {
    dispatch(increaseProductQuantity(product.id))
  }

  const handleDecreaseClick = () => {
    dispatch(decreaseProductQuantity(product.id))
  }

  return (
    <CartItemContainer>
      <CartItemImage imageurl={product.imageUrl} />

      <CartItemInfo>
        <p>{product.name}</p>
        <p>R${product.price}</p>
        <CartItemQuantity>
          <AiOutlineMinus
            onClick={handleDecreaseClick}
            aria-label={`Decrease of ${product.name}`}
          />
          <p>{product.quantity}</p>
          <AiOutlinePlus
            onClick={handleIncreaseClick}
            aria-label={`Increase of ${product.name}`}
          />
        </CartItemQuantity>
      </CartItemInfo>

      <RemoveButton
        onClick={handleRemoveClick}
        aria-label={`Remove of ${product.name}`}
      >
        <AiOutlineClose />
      </RemoveButton>
    </CartItemContainer>
  )
}

export default CartItem
