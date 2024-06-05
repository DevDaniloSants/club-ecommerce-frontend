import userEvent from '@testing-library/user-event'
import * as firebaseAuth from 'firebase/auth'
import { waitFor } from '@testing-library/dom'

import { renderWithRedux } from '../../helpers/test-helpers'

import LoginPage from './login.page'

jest.mock('firebase/auth')

describe('Login', () => {
  it('should show erros when trying to submit without filling all required fields', async () => {
    const { getByText } = renderWithRedux(<LoginPage />, {})

    const submitButton = getByText('Entrar')

    userEvent.click(submitButton)

    await waitFor(() => getByText('O e-mail é obrigatório'))
    getByText(/a senha é obrigatória/i)
  })

  it('should show error if email is invalid', async () => {
    const { getByPlaceholderText, getByText } = renderWithRedux(
      <LoginPage />,
      {}
    )

    const emailInput = getByPlaceholderText(/digite seu e-mail/i)

    userEvent.type(emailInput, 'invalid_email')

    const submitButton = getByText('Entrar')

    userEvent.click(submitButton)

    await waitFor(() => getByText(/Por favor, digite um e-mail válido./i))
  })

  it('should show an error if email and passowrd is not found', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mockFirebaseAuth = firebaseAuth as any

    mockFirebaseAuth.signInWithEmailAndPassword.mockImplementation(() =>
      Promise.reject({
        code: mockFirebaseAuth.AuthErrorCodes.INVALID_IDP_RESPONSE,
      })
    )

    const { getByPlaceholderText, getByText } = renderWithRedux(
      <LoginPage />,
      {}
    )

    const emailInput = getByPlaceholderText(/digite seu e-mail/i)
    const passwordInput = getByPlaceholderText(/digite sua senha/i)
    const submitButton = getByText('Entrar')

    await userEvent.type(emailInput, 'lorem@ipsum.com')
    await userEvent.type(passwordInput, '123')

    await userEvent.click(submitButton)

    await waitFor(() => {
      expect(
        getByText(
          'O endereço de email ou a senha que você inseriu não é válido'
        )
      ).toBeInTheDocument()
    })
  })
})
