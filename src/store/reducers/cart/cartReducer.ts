import CartProducts from '../../../types/cartProducts.types'

import CartActionsTypes from './cart.actions-types'

interface InitialState {
  isVisible: boolean
  products: CartProducts[]
}

const initialState: InitialState = {
  isVisible: false,
  products: [],
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cartReducer = (state = initialState, action: any): InitialState => {
  switch (action.type) {
    case CartActionsTypes.toggleCart:
      return { ...state, isVisible: !state.isVisible }
    case CartActionsTypes.addProduct: {
      const product = action.payload

      const productIsAlreadyInCart = state.products.some(
        (item) => item.id === product.id
      )

      if (productIsAlreadyInCart) {
        return {
          ...state,
          products: state.products.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        }
      }

      return {
        ...state,
        products: [...state.products, { ...product, quantity: 1 }],
      }
    }
    case CartActionsTypes.removeProduct:
      return {
        ...state,
        products: [
          ...state.products.filter((item) => item.id !== action.payload),
        ],
      }
    case CartActionsTypes.increaseProduct:
      return {
        ...state,
        products: [
          ...state.products.map((item) =>
            item.id === action.payload
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        ],
      }
    case CartActionsTypes.decreaseProduct:
      return {
        ...state,
        products: [
          ...state.products
            .map((item) =>
              item.id === action.payload
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter((item) => item.quantity > 0),
        ],
      }
    case CartActionsTypes.clearProduct:
      return { ...state, products: [] }

    default:
      return state
  }
}

export default cartReducer
