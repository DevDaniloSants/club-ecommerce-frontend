import { combineReducers } from 'redux'

import userReducer from './reducers/user/userReducer'
import cartReducer from './reducers/cart/cartReducer'
import categoryReducer from './reducers/category/categoryReducer'

const rootReducer = combineReducers({
  userReducer,
  cartReducer,
  categoryReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
