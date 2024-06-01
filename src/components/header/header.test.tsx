import Header from './header.component'
import { renderWithRedux } from '../../helpers/test-helpers'
import CartProducts from '../../types/cartProducts.types'

describe('Header', () => {
  it('should show sign out button if user is autheticated', () => {
    const { getByText } = renderWithRedux(<Header />, {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      preloadedState: { userReducer: { isAuthenticated: true } } as any,
    })

    getByText('Sair')
  })

  it('should show sign in and sign up button if user is not authenticated', () => {
    const { getByText } = renderWithRedux(<Header />, {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      preloadedState: { userReducer: { isAuthenticated: false } } as any,
    })

    getByText(/login/i)
    getByText(/criar conta/i)
  })

  it('should show correct cart products count', () => {
    const products: CartProducts[] = [
      {
        id: '1',
        imageUrl: 'image.png',
        name: 'boné',
        price: 100,
        quantity: 20,
      },
      {
        id: '2',
        imageUrl: 'image.png',
        name: 'jaqueta',
        price: 100,
        quantity: 2,
      },
    ]

    const { getByText } = renderWithRedux(<Header />, {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      preloadedState: { cartReducer: { products } } as any,
    })

    getByText('22')
  })
})
