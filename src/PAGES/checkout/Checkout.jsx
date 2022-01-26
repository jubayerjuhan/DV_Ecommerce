import React, { useRef } from "react";
import Navbar from "../../component/navbar/Navbar";
import Footer from "../../component/footer/Footer";
import Stapper from "../../component/stepper/Stepper";
import { Country } from "country-state-city";
import "./checkout.css";
import Shippingform from "./../../component/shippingform/Shippingform";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { authaxios } from "../../utils/axios.js";
import { toastError, toastSuccess } from "../../utils/toastify.js";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "../../actions/orderactions.js";
import { useNavigate } from "react-router";
import Spinner from "./../../component/spinner/Spinner";
import { useState } from "react";

const Checkout = () => {
  const navigate = useNavigate();
  const amount = JSON.parse(sessionStorage.getItem("amount"));
  console.log(amount);
  const [paymentMethod, setPaymentMethod] = useState("");
  const { success, error, loading } = useSelector((state) => state.placeOrder);
  const { shippingAddress, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const [transectionId, setTransectionId] = useState("");
  const dispatch = useDispatch();

  //countryList
  const countries = Country.getAllCountries();

  if (success) {
    navigate("/checkout-complete");
    dispatch({ type: "SUCCESS_RESET_ORDER" });
    localStorage.removeItem("cart");
  }
  if (error) {
    toastError(Error);
    dispatch({ type: "CLEAR_ERROR" });
  }

  const handleOrder = (method, id) => {
    const orderInfo = {
      shippingInfo: shippingAddress,
      orderItems: cartItems,
      user: user._id,
      paymentInfo: {
        id: id ? id : "none",
        status: method,
      },
      paidAt: Date.now(),
      priceBreakdown: amount,
    };

    dispatch(placeOrder(orderInfo));
  };
  return (
    <>
      {loading && <Spinner />}
      <Navbar />
      <Stapper activestep={1} />
      <div className="checkout__container section__padding">
        <div className="shipping__address-section">
          <p className="shipping__address-section-title">Buyer Info</p>
          <Shippingform countries={countries} />
        </div>
        <div className="checkout__section">
          <p className="paymentMethod__select">Select Payment Method</p>
          <select
            disabled={shippingAddress ? false : true}
            name=""
            id=""
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value={null}>Select One</option>
            <option value="bKash">bKash</option>
            <option value="COD">Cash On Delivery</option>
          </select>
          {paymentMethod === "bKash" && (
            <ShowBkashOption
              paymentMethod={paymentMethod}
              transectionId={transectionId}
              setTransectionId={setTransectionId}
              handleOrder={handleOrder}
              totalPrice={amount.totalPrice}
            />
          )}
          {paymentMethod === "COD" && (
            <ShowCODOption
              paymentMethod={paymentMethod}
              handleOrder={handleOrder}
            />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

const ShowCODOption = ({ handleOrder, paymentMethod }) => (
  <div className="COD">
    <input type="submit" onClick={() => handleOrder(paymentMethod)} />
  </div>
);

const ShowBkashOption = ({
  setTransectionId,
  transectionId,
  totalPrice,
  handleOrder,
  paymentMethod,
}) => (
  <div className="bKash">
    <p>
      Please Send {totalPrice} Taka To This bKash account and enter the
      transection id down below.{" "}
    </p>
    <input
      type="text"
      placeholder="Bkash Transection Id"
      onChange={(e) => setTransectionId(e.target.value)}
    />{" "}
    <br />
    <input
      type="submit"
      onClick={() => handleOrder(paymentMethod, transectionId)}
    />
  </div>
);
export default Checkout;
