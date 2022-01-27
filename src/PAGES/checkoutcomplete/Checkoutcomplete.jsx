import React from "react";
import Navbar from "../../component/navbar/Navbar";
import Footer from "../../component/footer/Footer";
import Materialstepper from "../../component/stepper/Stepper.jsx";
import "./checkoutcomplete.css";
import { useNavigate } from "react-router-dom";
import TitleHelmet from "../../component/Helmet/Helmet.jsx";
const Checkoutcomplete = () => {
  const navigate = useNavigate();
  return (
    <>
      <TitleHelmet title="Dimvaji - Complete" />

      <Navbar />
      <Materialstepper activestep={2} />
      <div className="section__padding" style={{ paddingBottom: "6rem" }}>
        <div className="checkoutcomplete__container">
          <h1>Checkout Complete!</h1>
          <p>Your Order has been successfully placed</p>
          <button onClick={() => navigate("/products")}>
            Continue Shopping
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkoutcomplete;
