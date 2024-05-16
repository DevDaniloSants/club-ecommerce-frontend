import { FunctionComponent, ReactNode, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { UserContext } from '../contexts/user.context'

import Loading from '../components/loading/loading.component'

interface IAuthenticationProps {
  children: ReactNode
}

const AuthenticationGuard: FunctionComponent<IAuthenticationProps> = ({
  children,
}) => {
  const { isAuthenticated } = useContext(UserContext)

  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      setTimeout(() => {
        navigate('/login')
      }, 3000)
    }
  }, [isAuthenticated])

  if (!isAuthenticated) {
    return (
      <Loading message="Você precisa estar logado para acessar esta página. Você será redirecionado para a página de login" />
    )
  }

  return <>{children}</>
}

export default AuthenticationGuard
