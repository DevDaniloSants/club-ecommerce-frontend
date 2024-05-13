import { FunctionComponent, useContext } from 'react'
import { BsCartCheck } from 'react-icons/bs'

import { CartContext } from '../../contexts/cart.context'

import {
  CartContainer,
  CartContent,
  CartEscapeArea,
  CartTitle,
  CartTotal,
} from './cart.styles'

import CustomButton from '../custom-button/custom-button'

const Cart: FunctionComponent = () => {
  const { isVisible, toogleCart } = useContext(CartContext)

  return (
    <CartContainer isVisible={isVisible}>
      <CartEscapeArea onClick={toogleCart} />
      <CartContent>
        <CartTitle>Seu Carrinho</CartTitle>

        <CartTotal>Total: R$ 999</CartTotal>
        <CustomButton startIcon={<BsCartCheck />}>
          Ir para o Checkout
        </CustomButton>
      </CartContent>
    </CartContainer>
  )
}

export default Cart
