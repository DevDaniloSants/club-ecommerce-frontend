import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { useDispatch } from 'react-redux'

import { auth, db } from './config/firebase.config'
import { userConverter } from './converters/firestore.converters'
import AuthenticationGuard from './guards/authentication.guards'
import { loginUser, logoutUser } from './store/reducers/user/user.actions'
import { useAppSelector } from './hooks/redux.hooks'

import Loading from './components/loading/loading.component'

import RootLayout from './pages/RootLayout'
import HomePage from './pages/home/home.page'
import LoginPage from './pages/login/login.page'
import SignUpPage from './pages/sign-up/sign-up-page'
import ExplorePage from './pages/explore/explore.page'
import CategoryDetailsPage from './pages/category-details/category-details.page'
import CheckoutPage from './pages/checkout/checkout.page'
import PaymentConfirmationPage from './pages/payment-confirmation/payment-confirmation.page'

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
        path: '/explore',
        element: <ExplorePage />,
      },
      {
        path: '/category/:id',
        element: <CategoryDetailsPage />,
      },
      {
        path: '/checkout',
        element: (
          <AuthenticationGuard>
            <CheckoutPage />
          </AuthenticationGuard>
        ),
      },
      {
        path: '/payment-confirmation',
        element: (
          <AuthenticationGuard>
            <PaymentConfirmationPage />
          </AuthenticationGuard>
        ),
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
  const [isInitializing, setIsInitializing] = useState(true)

  const dispatch = useDispatch()

  const { isAuthenticated } = useAppSelector((state) => state.userReducer)

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      const isSigninOut = isAuthenticated && !user

      if (isSigninOut) {
        dispatch(logoutUser())
        return setIsInitializing(false)
      }

      const isSigningIn = !isAuthenticated && user

      if (isSigningIn) {
        const querySnapshot = await getDocs(
          query(
            collection(db, 'users').withConverter(userConverter),
            where('id', '==', user.uid)
          )
        )

        const userFromFirestore = querySnapshot.docs[0]?.data()

        dispatch(loginUser(userFromFirestore))

        return setIsInitializing(false)
      }

      return setIsInitializing(false)
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  if (isInitializing) return <Loading />

  return <RouterProvider router={router} />
}

export default App
