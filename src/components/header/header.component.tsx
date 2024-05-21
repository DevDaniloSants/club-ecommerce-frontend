import { BsCart3 } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { auth } from '../../config/firebase.config'
import { CartContext } from '../../contexts/cart.context'

import {
  HeaderItem,
  HeaderItems,
  HeaderTitle,
  HearderContainer,
} from './header.styles'

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { isAuthenticated } = useSelector((state: any) => state.userReducer)

  const { productsCount, toogleCart } = useContext(CartContext)

  const handleLogoClick = () => {
    navigate('/')
  }

  const handleLoginClick = () => {
    navigate('/login')
  }

  const handleSignUpClick = () => {
    navigate('/sign-up')
  }

  const handleExploreClick = () => {
    navigate('/explore')
  }

  const handleSignOutClick = () => {
    dispatch({ type: 'LOGOUT_USER' })
    signOut(auth)
  }

  return (
    <HearderContainer>
      <HeaderTitle onClick={handleLogoClick}>CLUB CLOTHING</HeaderTitle>
      <HeaderItems>
        <HeaderItem onClick={handleExploreClick}>Explorar</HeaderItem>
        {!isAuthenticated && (
          <>
            <HeaderItem onClick={handleLoginClick}>Login</HeaderItem>
            <HeaderItem onClick={handleSignUpClick}>Criar conta</HeaderItem>
          </>
        )}
        {isAuthenticated && (
          <HeaderItem onClick={handleSignOutClick}>Sair</HeaderItem>
        )}
        <HeaderItem onClick={toogleCart}>
          <BsCart3 size={25} />
          <p>{productsCount}</p>
        </HeaderItem>
      </HeaderItems>
    </HearderContainer>
  )
}

export default Header
