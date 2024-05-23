import Product from '../../../types/product.types'
import CartActionsTypes from './cart.actions-types'

interface ToogleCartActions {
  type: typeof CartActionsTypes.toggleCart
}

interface AddProductActions {
  type: typeof CartActionsTypes.addProduct
  payload: Product
}

interface RemoveProductActions {
  type: typeof CartActionsTypes.removeProduct
  payload: string
}

interface IncreaseProductQuantityActions {
  type: typeof CartActionsTypes.increaseProduct
  payload: string
}

interface DecreaseProductQuantityActions {
  type: typeof CartActionsTypes.decreaseProduct
  payload: string
}

interface ClearProductsActions {
  type: typeof CartActionsTypes.clearProduct
}

export const toogleCart = (): ToogleCartActions => ({
  type: CartActionsTypes.toggleCart,
})

export const addProduct = (payload: Product): AddProductActions => ({
  type: CartActionsTypes.addProduct,
  payload,
})

export const removeProduct = (payload: string): RemoveProductActions => ({
  type: CartActionsTypes.removeProduct,
  payload,
})

export const increaseProductQuantity = (
  payload: string
): IncreaseProductQuantityActions => ({
  type: CartActionsTypes.increaseProduct,
  payload,
})

export const decreaseProductQuantity = (
  payload: string
): DecreaseProductQuantityActions => ({
  type: CartActionsTypes.decreaseProduct,
  payload,
})

export const clearProducts = (): ClearProductsActions => ({
  type: CartActionsTypes.clearProduct,
})
