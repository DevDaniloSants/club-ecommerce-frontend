import { waitFor } from '@testing-library/dom'
import { renderWithRedux } from '../../helpers/test-helpers'
import LoginPage from './login.page'
import userEvent from '@testing-library/user-event'

describe('Login', () => {
  it('should show erros when trying to submit without filling all required fields', async () => {
    const { getByText } = renderWithRedux(<LoginPage />, {})

    const loginButton = getByText('Entrar')

    userEvent.click(loginButton)

    await waitFor(() => getByText(/o e-mail é obrigatório/i))
    getByText('A senha é obrigatória')
  })
})
