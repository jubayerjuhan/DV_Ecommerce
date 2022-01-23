import { applyMiddleware, combineReducers, createStore } from "redux"
import { registerUserReducer } from "../reducers/userreducer.js"
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk'
import logger from "redux-logger";
import { allProductsReducer, getgood, getSingleProduct, productreducer } from "./../reducers/productreducer";
import { cartreducer } from "../reducers/cartreducer.js";
import { orderReducer } from "./../reducers/orderreducer";






const reducer = combineReducers({
  user: registerUserReducer,
  addproduct: productreducer,
  allproducts: allProductsReducer,
  singleproduct: getSingleProduct,
  cart: cartreducer,
  order: orderReducer,
  editproduct: getgood,
})

const initialState = {
  cart: {
    cartItems: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
  }
}

const middlewares = [thunk, logger]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middlewares)))

export default store;