import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './reduxutils/store.js';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
ReactDOM.render(

  <Provider store={store}>
    <ToastContainer />
    <App />
  </Provider>
  , document.getElementById('root')
);

