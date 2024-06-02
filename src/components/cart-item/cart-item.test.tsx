import { renderWithRedux } from '../../helpers/test-helpers'
import CartProducts from '../../types/cartProducts.types'
import CartItem from './cart-item.components'

describe('cart item', () => {
  it('should show correct cart item', () => {
    const cartItem: CartProducts = {
      id: '1',
      imageUrl: 'image.png',
      name: 'boné',
      price: 100,
      quantity: 2,
    }

    const { getByText, getByLabelText } = renderWithRedux(
      <CartItem product={cartItem} />,
      {}
    )

    getByText('boné')
    getByText('R$100')
    getByText('2')
    getByLabelText('Increase of boné')
    getByLabelText('Decrease of boné')
    getByLabelText('Remove of boné')
  })
})
