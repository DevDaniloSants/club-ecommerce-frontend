import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'

import { auth } from './config/firebase.config'

import RootLayout from './pages/RootLayout'
import HomePage from './pages/home/home.page'
import LoginPage from './pages/login/login.page'
import SignUpPage from './pages/sign-up/sign-up-page'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/sign-up',
        element: <SignUpPage />,
      },
    ],
  },
])

const App = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid

      console.log(`Usuário logado com sucesso id: ${uid}`)
    } else {
      console.log('Usuário desconectado')
    }
  })
  return <RouterProvider router={router} />
}

export default App
