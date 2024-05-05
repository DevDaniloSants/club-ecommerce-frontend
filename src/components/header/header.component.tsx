import { BsCart3 } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

import {
  HeaderItem,
  HeaderItems,
  HeaderTitle,
  HearderContainer,
} from './header.styles'

const Header = () => {
  const navigate = useNavigate()

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
        <HeaderItem onClick={handleLoginClick}>Login</HeaderItem>
        <HeaderItem onClick={handleSignUpClick}>Criar conta</HeaderItem>
        <HeaderItem>
          <BsCart3 size={25} />
          <p>5</p>
        </HeaderItem>
      </HeaderItems>
    </HearderContainer>
  )
}

export default Header
