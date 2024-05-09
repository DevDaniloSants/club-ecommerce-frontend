import { FunctionComponent, createContext, useState, ReactNode } from 'react'
import User from '../types/user.types'

interface IUserContextTypes {
  currentUser: User | null
  isAuthenticated: boolean
  loginUser: (user: User) => void
  logoutUser: () => void
}

interface IUserContextProviderProps {
  children: ReactNode
}

export const UserContext = createContext<IUserContextTypes>({
  currentUser: null,
  isAuthenticated: false,
  loginUser: () => {},
  logoutUser: () => {},
})

const UserContextProvider: FunctionComponent<IUserContextProviderProps> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  const isAuthenticated = currentUser !== null

  const loginUser = (user: User) => {
    setCurrentUser(user)
  }

  const logoutUser = () => {
    setCurrentUser(null)
  }

  return (
    <UserContext.Provider
      value={{ currentUser, isAuthenticated, loginUser, logoutUser }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
