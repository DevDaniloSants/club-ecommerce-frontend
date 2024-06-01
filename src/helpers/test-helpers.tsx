import { ReactElement, ReactNode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { render } from '@testing-library/react'

import rootReducer from '../store/root-reducer'
import { RootState } from '../store/root-reducer'
import { AppStore } from '../store/store'

export const renderWithRedux = (
  component: ReactElement,
  {
    preloadedState,
    store = configureStore({
      reducer: rootReducer,
      preloadedState,
    }),
    ...renderOptions
  }: { preloadedState: RootState; store?: AppStore }
) => {
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <BrowserRouter>
      <Provider store={store}>{children}</Provider>
    </BrowserRouter>
  )

  return render(component, { wrapper: Wrapper, ...renderOptions })
}
