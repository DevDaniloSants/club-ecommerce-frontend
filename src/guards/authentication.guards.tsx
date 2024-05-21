import { FunctionComponent, ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import Loading from '../components/loading/loading.component'
import { useSelector } from 'react-redux'

interface IAuthenticationProps {
  children: ReactNode
}

const AuthenticationGuard: FunctionComponent<IAuthenticationProps> = ({
  children,
}) => {
  const navigate = useNavigate()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { isAuthenticated } = useSelector((state: any) => state.userReducer)

  useEffect(() => {
    if (!isAuthenticated) {
      setTimeout(() => {
        navigate('/login')
      }, 3000)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated])

  if (!isAuthenticated) {
    return (
      <Loading message="Você precisa estar logado para acessar esta página. Você será redirecionado para a página de login" />
    )
  }

  return <>{children}</>
}

export default AuthenticationGuard
