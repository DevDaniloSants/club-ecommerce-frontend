import { waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { renderWithRedux } from '../../helpers/test-helpers'

import SignUpPage from './sign-up-page'

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

  it('should show error when filling an invalid email', async () => {
    const { getByText, getByPlaceholderText } = renderWithRedux(
      <SignUpPage />,
      {}
    )

    const inputEmail = getByPlaceholderText('Digite o seu e-mail')
    await userEvent.type(inputEmail, 'lorem@lorem')

    const buttonSubmit = getByText('Criar conta', { selector: 'button' })

    userEvent.click(buttonSubmit)

    await waitFor(() => getByText('Digite um e-mail válido'))
  })
  it('should show error when password and password confirmation are different', async () => {
    const { getByText, getByPlaceholderText } = renderWithRedux(
      <SignUpPage />,
      {}
    )

    const inputPassword = getByPlaceholderText('Digite a sua senha')
    await userEvent.type(inputPassword, '12345678')

    const inputConfirmPassword = getByPlaceholderText(
      'Digite novamente sua senha'
    )
    await userEvent.type(inputConfirmPassword, '1234567890')

    const buttonSubmit = getByText('Criar conta', { selector: 'button' })

    userEvent.click(buttonSubmit)

    await waitFor(() =>
      getByText('A confirmação de senha precisa ser igual a senha.')
    )
  })
  it('should show error when password has less then 6 characters', async () => {
    const { getByText, getByPlaceholderText } = renderWithRedux(
      <SignUpPage />,
      {}
    )

    const inputPassword = getByPlaceholderText('Digite a sua senha')
    await userEvent.type(inputPassword, '123')

    const buttonSubmit = getByText('Criar conta', { selector: 'button' })

    userEvent.click(buttonSubmit)

    await waitFor(() => getByText('A senha precisa ter no mínimo 6 caracteres'))
  })
})
