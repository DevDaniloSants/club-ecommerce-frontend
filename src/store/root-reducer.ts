import { combineReducers } from 'redux'

import userReducer from './reducers/user/userReducer'
import cartReducer from './reducers/cart/cartReducer'

const rootReducer = combineReducers({
  userReducer,
  cartReducer,
})

export default rootReducer
