import { BsCart3 } from 'react-icons/bs'

import {
  HeaderItem,
  HeaderItems,
  HeaderTitle,
  HearderContainer,
} from './header.styles'

const Header = () => {
  return (
    <HearderContainer>
      <HeaderTitle>CLUB CLOTHING</HeaderTitle>
      <HeaderItems>
        <HeaderItem>Explorar</HeaderItem>
        <HeaderItem>Login</HeaderItem>
        <HeaderItem>Criar conta</HeaderItem>
        <HeaderItem>
          <BsCart3 size={25} />
          <p>5</p>
        </HeaderItem>
      </HeaderItems>
    </HearderContainer>
  )
}

export default Header
