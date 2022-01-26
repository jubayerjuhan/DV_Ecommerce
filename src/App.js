import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from "react-helmet";
import './App.css';
import Homepage from "./PAGES/homapage/Homepage";
import Notfound from "./PAGES/notfound/Notfound";
import Productlist from './PAGES/product list/Productlist.jsx';
import Productdetail from './PAGES/product_info/Productdetail.jsx';
import Shoppingcart from "./PAGES/shoppingcart/Shoppingcart";
import Checkout from "./PAGES/checkout/Checkout"
import Checkoutcomplete from "./PAGES/checkoutcomplete/Checkoutcomplete";
import Signup from './PAGES/signup/Signup.jsx';
import Login from './PAGES/login/Login.jsx';
import Forgetpassword from './PAGES/forgetpassword/Forgotpassword.jsx';
import AdminPanel from './PAGES/AdminPanel/AdminPanel'
import ManageProduct from './PAGES/ManageProduct/ManageProduct.jsx'
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loadUser } from './actions/userActions.js';
import Addproduct from './PAGES/Admin_addproduct/Addproduct.jsx';
import { instance } from './utils/axios.js';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PrivateRoute from "./utils/Privateroute";
import Myorders from "./PAGES/myorders/Myorders";
import EditOrder from './PAGES/Admin_EditOrder/EditOrder.jsx';
import Adminroutes from './utils/AdminRoutes.js'
import Slide from './component/Slide/Slide.jsx';


function App() {
  const [stripeKey, setStripeKey] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(loadUser());
    }

    const getStripeKey = async () => {
      const { data } = await instance.get('/getStipePubKey');
      setStripeKey(data.key);
    }
    getStripeKey();

  }, [dispatch]);
  console.log(stripeKey)
  const stripePromise = loadStripe('pk_test_51Jk944Kqk54qfeAmqK2cRxVVq122wVq5oMiAHWv0xEHXCjx362GhIJAiCkOCtjnfSVHGzMP7YSeVX6NQX4MuNASY00FJlGLuOo');

  return (
    <div className="App">
      <Router>
        <Routes>
          {/* checkout route */}
          <Route path="/checkout" element={<Elements stripe={stripePromise} >
            <Checkout />
          </Elements>} />
          {/* home page route */}
          <Route exact path="/" element={<Homepage />} />

          {/* general routes */}
          <Route exact path="/products" element={<Productlist />} />
          <Route path="/product/:id" element={<Productdetail />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotten-password" element={<Forgetpassword />} />
          {/* <Route path="/swiper" element={<Slide />} /> */}

          {/* <Route path="/manage-product" element={<ManageProduct />} /> */}

          {/* private routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/cart" element={<Shoppingcart />} />
            <Route path="/checkout-complete" element={<Checkoutcomplete />} />
            <Route path="/orders" element={<Myorders />} />

            {/* admin route */}
            <Route element={<Adminroutes />}>
              <Route path="/addproduct" element={<Addproduct />} />
              <Route path="/admin/:name" element={<AdminPanel />} />
              <Route path="/admin/order/:id" element={<EditOrder />} />
            </Route>
          </Route>
          <Route path="*" element={<Notfound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
