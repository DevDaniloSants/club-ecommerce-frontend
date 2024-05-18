import { FunctionComponent, useContext, useState } from 'react'
import { MdShoppingCartCheckout } from 'react-icons/md'
import axios from 'axios'

import { CartContext } from '../../contexts/cart.context'

import {
  CheckoutContainer,
  CheckoutProducts,
  CheckoutTitle,
  CheckoutTotal,
} from './checkout.styles'

import CartItem from '../cart-item/cart-item.components'
import CustomButton from '../custom-button/custom-button'
import Loading from '../loading/loading.component'

const Checkout: FunctionComponent = () => {
  const { products, productsTotalPrice } = useContext(CartContext)
  const [loading, setLoading] = useState(false)

  const handleFinishPurchaseClick = async () => {
    try {
      setLoading(true)
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/create-checkout-session`!,
        { products }
      )

      window.location.href = data.url
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {loading && <Loading />}
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
            <CustomButton
              startIcon={<MdShoppingCartCheckout size={18} />}
              onClick={handleFinishPurchaseClick}
            >
              Finalizar a Compra
            </CustomButton>
          </>
        ) : (
          <p>Seu carrinho está vazio!</p>
        )}
      </CheckoutContainer>
    </>
  )
}

export default Checkout
