import { applyMiddleware, combineReducers, createStore } from "redux"
import { forgetPasswordReducer, registerUserReducer } from "../reducers/userreducer.js"
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk'
import logger from "redux-logger";
import { adminProductReducer, allProductsReducer, editProductReducer, getSingleProduct, productreducer } from "./../reducers/productreducer";
import { cartreducer, deleteCartProduct } from "../reducers/cartreducer.js";
import { getAllOrderReducer, getSingleOrderReducer, orderReducer, orderStatusReducer, placeOrderReducer } from "./../reducers/orderreducer";
import { deleteOrderReducer } from "../reducers/orderreducer.js";






const reducer = combineReducers({
  user: registerUserReducer,
  addproduct: productreducer,
  allproducts: allProductsReducer,
  singleproduct: getSingleProduct,
  cart: cartreducer,
  order: orderReducer,
  editproduct: editProductReducer,
  getAllOrder: getAllOrderReducer,
  deleteOrder: deleteOrderReducer,
  updateOrder: orderStatusReducer,
  singleOrder: getSingleOrderReducer,
  adminProducts: adminProductReducer,
  placeOrder: placeOrderReducer,
  forgetPassword: forgetPasswordReducer,
  deleteCart: deleteCartProduct,
})

const initialState = {
  cart: {
    cartItems: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
  }
}

const middlewares = [thunk, logger]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middlewares)))

export default store;