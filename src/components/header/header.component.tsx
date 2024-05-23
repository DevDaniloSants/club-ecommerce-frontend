import { BsCart3 } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { useDispatch } from 'react-redux'

import { auth } from '../../config/firebase.config'
import { useAppSelector } from '../../hooks/redux.hooks'
import { logoutUser } from '../../store/reducers/user/user.actions'
import { toogleCart } from '../../store/reducers/cart/cart.actions'
import { selectProductsCount } from '../../store/reducers/cart/cart.selectors'

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
  const { isAuthenticated } = useAppSelector((state) => state.userReducer)

  const productsCount = useAppSelector(selectProductsCount)

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
    dispatch(logoutUser())
    signOut(auth)
  }

  const handleCartClick = () => {
    dispatch(toogleCart())
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
        <HeaderItem onClick={handleCartClick}>
          <BsCart3 size={25} />
          <p>{productsCount}</p>
        </HeaderItem>
      </HeaderItems>
    </HearderContainer>
  )
}

export default Header
