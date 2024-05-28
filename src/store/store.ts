import { thunk } from 'redux-thunk'
import { logger } from 'redux-logger'
import { configureStore } from '@reduxjs/toolkit'

// @ts-expect-error: Unreachable code error
import storage from 'redux-persist/lib/storage'
// @ts-expect-error: Unreachable code error
import persistReducer from 'redux-persist/es/persistReducer'
// @ts-expect-error: Unreachable code error
import persistStore from 'redux-persist/es/persistStore'

import rootReducer from './root-reducer'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cartReducer'],
}

const persistedRootReducer: typeof rootReducer = persistReducer(
  persistConfig,
  rootReducer
)

// // @ts-expect-error: Unreachable code error
// export const store = createStore(
//   persistedRootReducer,
//   applyMiddleware(thunk, logger)
// )

export const store = configureStore({
  reducer: persistedRootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk, logger),
})

export const persistedStore = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
