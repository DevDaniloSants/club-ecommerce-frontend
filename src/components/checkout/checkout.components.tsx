import { FunctionComponent, useContext } from 'react'
import { MdShoppingCartCheckout } from 'react-icons/md'

import { CartContext } from '../../contexts/cart.context'

import {
  CheckoutContainer,
  CheckoutProducts,
  CheckoutTitle,
  CheckoutTotal,
} from './checkout.styles'

import CartItem from '../cart-item/cart-item.components'
import CustomButton from '../custom-button/custom-button'

const Checkout: FunctionComponent = () => {
  const { products, productsTotalPrice } = useContext(CartContext)

  return (
    <CheckoutContainer>
      <CheckoutTitle>Checkout</CheckoutTitle>
      {products.length > 0 ? (
        <>
          <CheckoutProducts>
            {products.map((product) => (
              <CartItem key={product.id} product={product} />
            ))}
          </CheckoutProducts>
          <CheckoutTotal>R$ {productsTotalPrice}</CheckoutTotal>
          <CustomButton startIcon={<MdShoppingCartCheckout size={18} />}>
            Finalizar a Compra
          </CustomButton>
        </>
      ) : (
        <p>Seu carrinho está vazio!</p>
      )}
    </CheckoutContainer>
  )
}

export default Checkout
