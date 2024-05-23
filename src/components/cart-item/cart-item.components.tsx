import { FunctionComponent } from 'react'
import { AiOutlineClose, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { useDispatch } from 'react-redux'

import CartProducts from '../../types/cartProducts.types'

import {
  CartItemContainer,
  CartItemImage,
  CartItemInfo,
  CartItemQuantity,
  RemoveButton,
} from './cart-item.styles'
import {
  decreaseProductQuantity,
  increaseProductQuantity,
  removeProduct,
} from '../../store/reducers/cart/cart.actions'

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
          <AiOutlineMinus onClick={handleDecreaseClick} />
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
