export const addItemstoCart = (product, quantity) => async (dispatch, getState) => {
  const productDetail = {
    _id: product._id,
    name: product.name,
    quantity: quantity,
    price: product.price,
    image: product.image || product.images[0].url,
    stock: product.stock
  }

  dispatch({ type: 'ADD_TO_CART', payload: productDetail })

  localStorage.setItem('cart', JSON.stringify(getState().cart.cartItems))
}

export const deleteCartItem = (id) => async (dispatch, getState) => {
  dispatch({ type: 'DELETE_PRODUCT_PENDING' })

  console.log(id)
  // console.log(getState().cart.cartItems)
  const cartItems = getState().cart.cartItems.filter(item => item._id !== id)
  dispatch({ type: 'SET_CART', payload: cartItems })
  dispatch({ type: 'DELETE_PRODUCT_FULFILLED', payload: cartItems })

  localStorage.setItem('cart', JSON.stringify(getState().cart.cartItems))
}