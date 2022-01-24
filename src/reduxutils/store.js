import { applyMiddleware, combineReducers, createStore } from "redux"
import { registerUserReducer } from "../reducers/userreducer.js"
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk'
import logger from "redux-logger";
import { allProductsReducer, editProductReducer, getSingleProduct, productreducer } from "./../reducers/productreducer";
import { cartreducer } from "../reducers/cartreducer.js";
import { getAllOrderReducer, getSingleOrderReducer, orderReducer, orderStatusReducer } from "./../reducers/orderreducer";
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
})

const initialState = {
  cart: {
    cartItems: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
  }
}

const middlewares = [thunk, logger]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middlewares)))

export default store;