import { BsGoogle } from 'react-icons/bs'
import { FiLogIn } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import { isEmail } from 'validator'
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'
import {
  AuthError,
  AuthErrorCodes,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth'
import { useContext, useEffect, useState } from 'react'

import CustomButton from '../../components/custom-button/custom-button'
import CustomInput from '../../components/custom-input/custom-input'
import InputErrorMessage from '../../components/input-error-message/input-error-message'
import Loading from '../../components/loading/loading.component'

import { auth, db, provider } from '../../config/firebase.config'
import { UserContext } from '../../contexts/user.context'

import {
  LoginContainer,
  LoginContent,
  LoginForm,
  LoginHeadline,
  LoginInputContainer,
  LoginSubtitle,
} from './login.styles'
import { useNavigate } from 'react-router-dom'

interface LoginForm {
  email: string
  password: string
}

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<LoginForm>()

  const { isAuthenticated } = useContext(UserContext)

  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  const handleSubmitPress = async (data: LoginForm) => {
    try {
      setIsLoading(true)
      await signInWithEmailAndPassword(auth, data.email, data.password)
    } catch (error) {
      const _error = error as AuthError

      if (_error.code === AuthErrorCodes.INVALID_IDP_RESPONSE) {
        setError('password', { type: 'mismatch' })
        setError('email', { type: 'mismatch' })

        return
      }
    } finally {
      setIsLoading(false)
    }
  }

  const loginWithGoogle = async () => {
    try {
      setIsLoading(true)
      const credential = await signInWithPopup(auth, provider)

      const querySnapshot = await getDocs(
        query(collection(db, 'users'), where('id', '==', credential.user.uid))
      )

      const user = querySnapshot.docs[0]?.data()

      if (!user) {
        const firstName = credential.user.displayName?.split(' ')[0]
        const lastName = credential.user.displayName?.split(' ')[1]

        await addDoc(collection(db, 'users'), {
          id: credential.user.uid,
          email: credential.user.email,
          firstName,
          lastName,
          provider: 'google',
        })
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {isLoading && <Loading />}
      <LoginContainer>
        <LoginContent>
          <LoginHeadline>Entre com a sua conta</LoginHeadline>
          <CustomButton
            startIcon={<BsGoogle size={18} />}
            onClick={() => loginWithGoogle()}
          >
            Entrar com o Google
          </CustomButton>

          <LoginSubtitle>ou entre com o seu e-mail</LoginSubtitle>
          <LoginForm onSubmit={handleSubmit(handleSubmitPress)}>
            <LoginInputContainer>
              <p>E-mail</p>
              <CustomInput
                hasError={!!errors?.email}
                placeholder="Digite seu e-mail"
                {...register('email', {
                  required: true,
                  validate: (value) => {
                    return isEmail(value)
                  },
                })}
              />
              {errors?.email?.type === 'required' && (
                <InputErrorMessage>O e-mail é obrigatório</InputErrorMessage>
              )}
              {errors?.email?.type === 'validate' && (
                <InputErrorMessage>
                  Por favor, digite um e-mail válido.
                </InputErrorMessage>
              )}
            </LoginInputContainer>
            <LoginInputContainer>
              <p>Senha</p>
              <CustomInput
                type="password"
                autoComplete="password"
                hasError={!!errors?.password}
                placeholder="Digite sua senha"
                {...register('password', { required: true })}
              />
              {errors?.password?.type === 'required' && (
                <InputErrorMessage>A senha é obrigatória</InputErrorMessage>
              )}
              {errors?.password?.type === 'mismatch' && (
                <InputErrorMessage>
                  O endereço de email ou a senha que você inseriu não é válido
                </InputErrorMessage>
              )}
            </LoginInputContainer>

            <CustomButton startIcon={<FiLogIn size={18} />}>
              Entrar
            </CustomButton>
          </LoginForm>
        </LoginContent>
      </LoginContainer>
    </>
  )
}

export default LoginPage
