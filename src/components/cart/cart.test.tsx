import { renderWithRedux } from '../../helpers/test-helpers'
import CartProducts from '../../types/cartProducts.types'
import Cart from './cart.components'

describe('cart', () => {
  it('should show correct cart products', () => {
    const products: CartProducts[] = [
      {
        id: '1',
        imageUrl: 'image.png',
        name: 'boné',
        price: 100,
        quantity: 1,
      },
    ]
    const { getByText } = renderWithRedux(<Cart />, {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      preloadedState: { cartReducer: { products } } as any,
    })

    getByText(/boné/i)
    getByText('R$100')
    getByText('1')
    getByText('Total: R$ 100')
  })
})
