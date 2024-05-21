import User from '../../../types/user.types'
import UserActionsTypes from './user.action-types'

interface InitialState {
  currentUser: User | null
  isAuthenticated: boolean
}

const initalState: InitialState = {
  currentUser: null,
  isAuthenticated: false,
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const userReducer = (state = initalState, action: any) => {
  switch (action.type) {
    case UserActionsTypes.LOGIN:
      return { ...state, currentUser: action.payload, isAuthenticated: true }
    case UserActionsTypes.LOGOUT:
      return { ...state, currentUser: null, isAuthenticated: false }
    default:
      return { ...state }
  }
}

export default userReducer
