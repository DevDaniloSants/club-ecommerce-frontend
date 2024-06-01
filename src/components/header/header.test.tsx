import Header from './header.component'
import { renderWithRedux } from '../../helpers/test-helpers'

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
})
