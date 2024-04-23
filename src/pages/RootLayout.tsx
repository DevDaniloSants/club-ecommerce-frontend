import { Outlet } from 'react-router-dom'

import Header from '../components/header/header.component'

const RootLayout = () => {
  return (
    <>
      <Header />
      <div className="container">
        <Outlet />
      </div>
    </>
  )
}

export default RootLayout
