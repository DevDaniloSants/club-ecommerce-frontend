import { useForm } from 'react-hook-form'
import { isEmail } from 'validator'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { collection, addDoc } from 'firebase/firestore'
import { FiLogIn } from 'react-icons/fi'

import { auth, db } from '../../config/firebase.config'

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
    reset,
  } = useForm<SignUpPageForm>()

  const handleSubmitSignUp = async (data: SignUpPageForm) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      )

      const doc = await addDoc(collection(db, 'users'), {
        id: userCredentials.user.uid,
        email: userCredentials.user.email,
        firstName: data.firstName,
        lastName: data.lastName,
        provider: 'firebase',
      })

      console.log(doc.id)
      reset()
    } catch (error) {
      console.log(error)
    }
  }

  const watchPassword = watch('password')

  return (
    <SignUpContainer>
      <SignUpContent onSubmit={handleSubmit(handleSubmitSignUp)}>
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
            type="email"
            autoComplete="username"
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
            type="password"
            autoComplete="new-password"
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
            type="password"
            autoComplete="new-password"
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

        <CustomButton type="submit" startIcon={<FiLogIn size={18} />}>
          Criar conta
        </CustomButton>
      </SignUpContent>
    </SignUpContainer>
  )
}

export default SignUpPage
