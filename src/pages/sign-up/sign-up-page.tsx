import { useForm } from 'react-hook-form'
import { isEmail } from 'validator'
import {
  AuthError,
  AuthErrorCodes,
  createUserWithEmailAndPassword,
} from 'firebase/auth'
import { collection, addDoc } from 'firebase/firestore'
import { FiLogIn } from 'react-icons/fi'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

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
import Loading from '../../components/loading/loading.component'

interface SignUpPageForm {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}

const SignUpPage = () => {
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    getValues,
    setError,
  } = useForm<SignUpPageForm>()

  const navigate = useNavigate()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { isAuthenticated } = useSelector((state: any) => state.userReducer)

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  const handleSubmitSignUp = async (data: SignUpPageForm) => {
    try {
      setIsLoading(true)

      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      )

      await addDoc(collection(db, 'users'), {
        id: userCredentials.user.uid,
        email: userCredentials.user.email,
        firstName: data.firstName,
        lastName: data.lastName,
        provider: 'firebase',
      })

      reset()
    } catch (error) {
      const _error = error as AuthError

      if (_error.code === AuthErrorCodes.EMAIL_EXISTS) {
        setError('email', { type: 'alreadyInUse' })
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {isLoading && <Loading />}
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
            {errors?.email?.type === 'alreadyInUse' && (
              <InputErrorMessage>O e-mail já está em uso</InputErrorMessage>
            )}
          </SignUpInputContainer>

          <SignUpInputContainer>
            <p>Senha</p>
            <CustomInput
              type="password"
              autoComplete="password"
              hasError={!!errors?.password}
              placeholder="Digite a sua senha"
              {...register('password', { required: true, minLength: 6 })}
            />
            {errors?.password?.type === 'required' && (
              <InputErrorMessage>A senha é obrigatória</InputErrorMessage>
            )}
            {errors?.password?.type === 'minLength' && (
              <InputErrorMessage>
                A senha precisa ter no mínimo 6 caracteres
              </InputErrorMessage>
            )}
          </SignUpInputContainer>

          <SignUpInputContainer>
            <p>Confirme sua senha</p>
            <CustomInput
              type="password"
              autoComplete="confirm-password"
              hasError={!!errors?.confirmPassword}
              placeholder="Digite novamente sua senha"
              {...register('confirmPassword', {
                required: true,
                minLength: 6,
                validate: (value) => {
                  const password = getValues('password')

                  return value === password
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
            {errors?.confirmPassword?.type === 'minLength' && (
              <InputErrorMessage>
                A senha precisa ter no mínimo 6 caracteres
              </InputErrorMessage>
            )}
          </SignUpInputContainer>

          <CustomButton type="submit" startIcon={<FiLogIn size={18} />}>
            Criar conta
          </CustomButton>
        </SignUpContent>
      </SignUpContainer>
    </>
  )
}

export default SignUpPage
