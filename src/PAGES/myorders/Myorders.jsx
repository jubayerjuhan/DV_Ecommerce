import React from "react";
import Footer from "../../component/footer/Footer.jsx";
import Navbar from "../../component/navbar/Navbar.jsx";
import "./myorders.css";
import { useDispatch, useSelector } from "react-redux";
import { toastError } from "../../utils/toastify.js";
import Spinner from "./../../component/spinner/Spinner";
import { getUserOrder } from "../../actions/orderactions.js";
import TitleHelmet from "../../component/Helmet/Helmet.jsx";
const Myorders = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getUserOrder());
  }, [dispatch]);
  const { loading, orders, error, success } = useSelector(
    (state) => state.order
  );
  const { user } = useSelector((state) => state.user);

  if (error) {
    toastError("Unknown Error Occured");
  }

  if (success) {
    dispatch({ type: "SUCCESS_RESET" });
  }

  return (
    <>
      <TitleHelmet title={`${user?.name} - Orders`} />

      {loading && <Spinner />}
      <Navbar />
      <div className="myorders__container section__full-padding">
        <div className="orders__wrapper">
          <div className="order__header">
            <p>Order Id</p>
            <p>Order Status</p>
            <p>Order Total Price</p>
          </div>
          {orders &&
            orders.map((order, i) => (
              <div className="order" key={i}>
                <div className="order__id">
                  <p>{order._id}</p>
                </div>
                <div className="order__status">
                  <p
                    className={
                      order.orderStatus === "Processing" ? "red" : "green"
                    }
                  >
                    {order.orderStatus}
                  </p>
                </div>
                <div className="order__price">
                  <p>{`৳ ${order.priceBreakdown.totalPrice}`}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Myorders;
