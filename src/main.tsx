import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
// @ts-expect-error: Unreachable code error
import { PersistGate } from 'redux-persist/integration/react'

import './index.css'

import CategoryContextProvider from './contexts/category-context.tsx'

import { store, persistedStore } from './store/store.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate persistor={persistedStore}>
      <CategoryContextProvider>
        <App />
      </CategoryContextProvider>
    </PersistGate>
  </Provider>
)
