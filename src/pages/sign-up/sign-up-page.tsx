import { useForm } from 'react-hook-form'
import { isEmail } from 'validator'
import { FiLogIn } from 'react-icons/fi'

import {
  SignUpContainer,
  SignUpContent,
  SignUpHeadline,
  SignUpInputContainer,
} from './sign-up.styles'

import CustomButton from '../../components/custom-button/custom-button'
import CustomInput from '../../components/custom-input/custom-input'
import InputErrorMessage from '../../components/input-error-message/input-error-message'

interface SignUpPageForm {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}

const SignUpPage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<SignUpPageForm>()

  const handleSubmitSignUp = (data: SignUpPageForm) => {
    console.log({ data })
  }

  const watchPassword = watch('password')

  return (
    <SignUpContainer>
      <SignUpContent>
        <SignUpHeadline>Criar uma conta</SignUpHeadline>

        <SignUpInputContainer>
          <p>Nome</p>
          <CustomInput
            hasError={!!errors?.firstName}
            placeholder="Digite o seu nome"
            {...register('firstName', { required: true })}
          />
          {errors?.firstName?.type === 'required' && (
            <InputErrorMessage>O nome é obrigatório</InputErrorMessage>
          )}
        </SignUpInputContainer>

        <SignUpInputContainer>
          <p>Sobrenome</p>
          <CustomInput
            hasError={!!errors?.lastName}
            placeholder="Digite o seu sobrenome"
            {...register('lastName', { required: true })}
          />
          {errors?.lastName?.type === 'required' && (
            <InputErrorMessage>O sobrenome é obrigatório</InputErrorMessage>
          )}
        </SignUpInputContainer>

        <SignUpInputContainer>
          <p>E-mail</p>
          <CustomInput
            hasError={!!errors?.email}
            placeholder="Digite o seu e-mail"
            {...register('email', {
              required: true,
              validate: (value) => isEmail(value),
            })}
          />
          {errors?.email?.type === 'required' && (
            <InputErrorMessage>O e-mail é obrigatório</InputErrorMessage>
          )}
          {errors?.email?.type === 'validate' && (
            <InputErrorMessage>Digite um e-mail válido</InputErrorMessage>
          )}
        </SignUpInputContainer>

        <SignUpInputContainer>
          <p>Senha</p>
          <CustomInput
            hasError={!!errors?.password}
            placeholder="Digite a sua senha"
            {...register('password', { required: true })}
          />
          {errors?.password?.type === 'required' && (
            <InputErrorMessage>A senha é obrigatória</InputErrorMessage>
          )}
        </SignUpInputContainer>

        <SignUpInputContainer>
          <p>Confirme sua senha</p>
          <CustomInput
            hasError={!!errors?.confirmPassword}
            placeholder="Digite novamente sua senha"
            {...register('confirmPassword', {
              required: true,
              validate: (value) => {
                return value === watchPassword
              },
            })}
          />
          {errors?.confirmPassword?.type === 'required' && (
            <InputErrorMessage>
              A confirmação de senha é obrigatória
            </InputErrorMessage>
          )}
          {errors?.confirmPassword?.type === 'validate' && (
            <InputErrorMessage>
              A confirmação de senha precisa ser igual a senha.
            </InputErrorMessage>
          )}
        </SignUpInputContainer>

        <CustomButton
          startIcon={<FiLogIn size={18} />}
          onClick={() => handleSubmit(handleSubmitSignUp)()}
        >
          Criar conta
        </CustomButton>
      </SignUpContent>
    </SignUpContainer>
  )
}

export default SignUpPage
