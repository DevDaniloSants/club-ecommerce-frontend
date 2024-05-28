import { FunctionComponent } from 'react'
import { BsCartCheck } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { useAppSelector } from '../../hooks/redux.hooks'
import { toogleCart } from '../../store/reducers/cart/cart.actions'
import {
  selectProductsCount,
  selectProductsTotalPrice,
} from '../../store/reducers/cart/cart.selectors'
import CartProducts from '../../types/cartProducts.types'

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
  const { isVisible, products } = useAppSelector((state) => state.cartReducer!)

  const productsTotalPrice = useAppSelector(selectProductsTotalPrice)
  const productsCount = useAppSelector(selectProductsCount)

  const dispatch = useDispatch()

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

        {products.map((product: CartProducts) => (
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
