import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import CartProducts from '../../../types/cartProducts.types'
import Product from '../../../types/product.types'

interface InitialState {
  isVisible: boolean
  products: CartProducts[]
}

const initialState: InitialState = {
  isVisible: false,
  products: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toogleCart(state) {
      state.isVisible = !state.isVisible
    },
    addProduct(state, action: PayloadAction<Product>) {
      const product = action.payload

      const productIsAlreadyInCart = state.products.some(
        (item) => item.id === product.id
      )

      if (productIsAlreadyInCart) {
        state.products.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )

        return
      }

      state.products = [...state.products, { ...product, quantity: +1 }]
    },
    removeProduct(state, action: PayloadAction<string>) {
      state.products = state.products.filter(
        (item) => item.id !== action.payload
      )
    },
    increaseProductQuantity(state, action: PayloadAction<string>) {
      state.products = state.products.map((item) =>
        item.id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    },
    decreaseProductQuantity(state, action: PayloadAction<string>) {
      state.products = state.products
        .map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    },
    clearProducts(state) {
      state.products = []
    },
  },
})

export const {
  addProduct,
  toogleCart,
  clearProducts,
  decreaseProductQuantity,
  increaseProductQuantity,
  removeProduct,
} = cartSlice.actions

export default cartSlice.reducer
