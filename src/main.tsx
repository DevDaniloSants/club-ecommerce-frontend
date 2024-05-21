import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'

import './index.css'

import CategoryContextProvider from './contexts/category-context.tsx'
import CartContextProvider from './contexts/cart.context.tsx'

import store from './store/store.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <CategoryContextProvider>
      <CartContextProvider>
        <App />
      </CartContextProvider>
    </CategoryContextProvider>
  </Provider>
)
