import { combineReducers } from 'redux'

import userReducer from './reducers/user/userReducer'

const rootReducer = combineReducers({
  userReducer,
})

export default rootReducer
