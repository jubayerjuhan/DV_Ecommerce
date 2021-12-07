import { applyMiddleware, combineReducers, createStore } from "redux"
import { registerUserReducer } from "../reducers/userreducer.js"
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk'
import logger from "redux-logger";
import { productreducer } from "./../reducers/productreducer";






const reducer = combineReducers({
  user: registerUserReducer,
  addproduct: productreducer,
})

const middlewares = [thunk, logger]
const store = createStore(reducer, [], composeWithDevTools(applyMiddleware(...middlewares)))

export default store;