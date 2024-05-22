const CartActionsTypes = {
  toggleCart: 'cart/toogle' as const,
  addProduct: 'cart/addProductToCart' as const,
  removeProduct: 'cart/removeProductFromCart' as const,
  increaseProduct: 'cart/increaseProductQuantity' as const,
  decreaseProduct: 'cart/decreaseProductQuantity' as const,
  clearProduct: 'cart/clearProduct' as const,
}

export default CartActionsTypes
