import { FunctionComponent, useState } from 'react'
import { MdShoppingCartCheckout } from 'react-icons/md'
import axios from 'axios'

import { useAppSelector } from '../../hooks/redux.hooks'
import { selectProductsTotalPrice } from '../../store/reducers/cart/cart.selectors'

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
  const [loading, setLoading] = useState(false)

  const { products } = useAppSelector((state) => state.cartReducer)
  const productsTotalPrice = useAppSelector(selectProductsTotalPrice)

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
