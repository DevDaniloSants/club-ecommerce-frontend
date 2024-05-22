import { FunctionComponent, useContext } from 'react'
import { BsCartCheck } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { CartContext } from '../../contexts/cart.context'
import { useAppSelector } from '../../hooks/redux.hooks'
import { toogleCart } from '../../store/reducers/cart/cart.actions'

import {
  CartContainer,
  CartContent,
  CartEscapeArea,
  CartTitle,
  CartTotal,
} from './cart.styles'

import CustomButton from '../custom-button/custom-button'
import CartItem from '../cart-item/cart-item.components'

const Cart: FunctionComponent = () => {
  const { isVisible, products } = useAppSelector((state) => state.cartReducer)

  const dispatch = useDispatch()

  const { productsTotalPrice, productsCount } = useContext(CartContext)

  const navigate = useNavigate()

  const handleGoToCheckoutClick = () => {
    navigate('/checkout')
    dispatch(toogleCart())
  }

  const handleEscapeAreaClick = () => {
    dispatch(toogleCart())
  }

  return (
    <CartContainer isvisible={isVisible}>
      <CartEscapeArea onClick={handleEscapeAreaClick} />
      <CartContent>
        <CartTitle>Seu Carrinho</CartTitle>

        {products.map((product) => (
          <CartItem key={product.id} product={product} />
        ))}

        {productsCount > 0 && (
          <>
            <CartTotal>Total: R$ {productsTotalPrice}</CartTotal>

            <CustomButton
              startIcon={<BsCartCheck />}
              onClick={handleGoToCheckoutClick}
            >
              Ir para o Checkout
            </CustomButton>
          </>
        )}

        {productsCount === 0 && <p>Seu carrinho está vazio</p>}
      </CartContent>
    </CartContainer>
  )
}

export default Cart
