import { waitFor } from '@testing-library/dom'

import { renderWithRedux } from '../../helpers/test-helpers'

import SignUpPage from './sign-up-page'
import userEvent from '@testing-library/user-event'

jest.mock('firebase/auth')

describe('Sign Up', () => {
  it('should show error when trying to submit without filling all required fields', async () => {
    const { getByText } = renderWithRedux(<SignUpPage />, {})

    const buttonSubmit = getByText('Criar conta', { selector: 'button' })

    userEvent.click(buttonSubmit)

    await waitFor(() => getByText(/o nome é obrigatório/i))
    getByText('O sobrenome é obrigatório')
    getByText('O e-mail é obrigatório')
    getByText('A senha é obrigatória')
    getByText('A confirmação de senha é obrigatória')
  })
})
