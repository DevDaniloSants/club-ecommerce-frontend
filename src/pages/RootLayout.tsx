import { Outlet } from 'react-router-dom'
import { StyleSheetManager } from 'styled-components'

import Header from '../components/header/header.component'

const shouldForwardProp = (prop: string) => prop !== 'hasError'

const RootLayout = () => {
  return (
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
      <Header />
      <Outlet />
    </StyleSheetManager>
  )
}

export default RootLayout
