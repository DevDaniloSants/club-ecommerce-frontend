import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { useContext } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'

import { auth, db } from './config/firebase.config'
import { UserContext } from './contexts/user.context'

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
  const { loginUser, isAuthenticated, logoutUser } = useContext(UserContext)

  onAuthStateChanged(auth, async (user) => {
    const isSigninOut = isAuthenticated && !user

    if (isSigninOut) {
      return logoutUser()
    }

    const isSigningIn = !isAuthenticated && user

    if (isSigningIn) {
      const querySnapshot = await getDocs(
        query(collection(db, 'users'), where('id', '==', user.uid))
      )

      const userFromFirestore = querySnapshot.docs[0]?.data()

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return loginUser(userFromFirestore as any)
    }
  })
  return <RouterProvider router={router} />
}

export default App
