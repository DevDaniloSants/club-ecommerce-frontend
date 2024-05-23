import { createStore } from 'redux'

import rootReducer from './root-reducer'

// @ts-expect-error: Unreachable code error
import storage from 'redux-persist/lib/storage'
// @ts-expect-error: Unreachable code error
import persistReducer from 'redux-persist/es/persistReducer'
// @ts-expect-error: Unreachable code error
import persistStore from 'redux-persist/es/persistStore'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cartReducer'],
}

const persistedRootReducer: typeof rootReducer = persistReducer(
  persistConfig,
  rootReducer
)

export const store = createStore(persistedRootReducer)

export const persistedStore = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
