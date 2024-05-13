import { Outlet } from 'react-router-dom'
import { StyleSheetManager } from 'styled-components'

import Header from '../components/header/header.component'
import Cart from '../components/cart/cart.components'

const shouldForwardProp = (prop: string) => prop !== 'hasError'

const RootLayout = () => {
  return (
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
      <Header />
      <Outlet />
      <Cart />
    </StyleSheetManager>
  )
}

export default RootLayout
