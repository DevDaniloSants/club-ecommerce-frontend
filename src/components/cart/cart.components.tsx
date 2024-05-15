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
import CartItem from '../cart-item/cart-item.components'

const Cart: FunctionComponent = () => {
  const { isVisible, productsTotalPrice, productsCount, toogleCart, products } =
    useContext(CartContext)

  return (
    <CartContainer isvisible={isVisible}>
      <CartEscapeArea onClick={toogleCart} />
      <CartContent>
        <CartTitle>Seu Carrinho</CartTitle>

        {products.map((product) => (
          <CartItem key={product.id} product={product} />
        ))}

        {productsCount > 0 && (
          <>
            <CartTotal>Total: R$ {productsTotalPrice}</CartTotal>

            <CustomButton startIcon={<BsCartCheck />}>
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
