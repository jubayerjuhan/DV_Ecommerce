export const cartreducer = (state = {
  cartItems: []
}, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const isExist = state.cartItems.find(cartItem => cartItem._id === action.payload._id)

      console.log("isexist", isExist)
      if (isExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item._id === action.payload._id ? action.payload : item
          )
        }
      }
      else {
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload]
        }
      }

    case 'SET_CART':
      return {
        ...state,
        cartItems: action.payload
      }
    case 'ADD_SHIPPING_ADDRESS':
      return {
        ...state,
        shippingAddress: action.payload
      }

    default:
      return state;
  }

}


export const deleteCartProduct = (state = {}, action) => {
  switch (action.type) {
    case 'DELETE_PRODUCT_PENDING':
      return {
        ...state,
        loading: true,
      }
    case 'DELETE_PRODUCT_FULFILLED':
      return {
        ...state,
        loading: false,
        success: true,
      }
    case "RESET_SUCCESS":
      return {
        ...state,
        success: null,
      }
    default:
      return state;
  }

}

export const selectedCategoryReducer = (state = {}, action) => {
  console.log(action, 'action')
  switch (action.type) {
    case 'SET_CATEGORY':
      return {
        ...state,
        selectedCategory: action.payload
      }
    default:
      return state;
  }
}