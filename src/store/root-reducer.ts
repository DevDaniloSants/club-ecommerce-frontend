import { combineReducers } from 'redux'

import userReducer from './toolkit/user/userSlice'
import cartReducer from './toolkit/cart/cartSlice'
import categoryReducer from './toolkit/category/categorySlice'

const rootReducer = combineReducers({
  userReducer,
  cartReducer,
  categoryReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
