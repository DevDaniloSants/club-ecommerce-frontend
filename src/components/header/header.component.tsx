import { BsCart3 } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { useContext } from 'react'

import { auth } from '../../config/firebase.config'
import { UserContext } from '../../contexts/user.context'

import {
  HeaderItem,
  HeaderItems,
  HeaderTitle,
  HearderContainer,
} from './header.styles'

const Header = () => {
  const navigate = useNavigate()

  const { isAuthenticated } = useContext(UserContext)

  const handleLoginClick = () => {
    navigate('/login')
  }

  const handleSignUpClick = () => {
    navigate('/sign-up')
  }

  return (
    <HearderContainer>
      <HeaderTitle>CLUB CLOTHING</HeaderTitle>
      <HeaderItems>
        <HeaderItem>Explorar</HeaderItem>
        {!isAuthenticated && (
          <>
            <HeaderItem onClick={handleLoginClick}>Login</HeaderItem>
            <HeaderItem onClick={handleSignUpClick}>Criar conta</HeaderItem>
          </>
        )}
        {isAuthenticated && (
          <HeaderItem onClick={() => signOut(auth)}>Sair</HeaderItem>
        )}
        <HeaderItem>
          <BsCart3 size={25} />
          <p>5</p>
        </HeaderItem>
      </HeaderItems>
    </HearderContainer>
  )
}

export default Header
