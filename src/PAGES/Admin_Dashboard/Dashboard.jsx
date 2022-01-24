import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAdminProduct } from "../../actions/productactions.js";
import Spinner from "../../component/spinner/Spinner.jsx";
import { getallorder } from "../../actions/orderactions.js";
import "./dashboard.css";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.allproducts);
  const { orders } = useSelector((state) => state.getAllOrder);

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getallorder());
  }, [dispatch]);

  // counting product price
  let totalPrice = 0;

  orders.forEach((order) => {
    totalPrice += order.priceBreakdown.subtotal;
  });

  console.log(totalPrice);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="admin__dashboard">
          <div className="selling_info">
            <div className="dashboard__total">
              <h2>Total Sale</h2>
              <p>{`$${Math.round(totalPrice)}`}</p>
            </div>
            <div className="dashboard__total">
              <h2>Product Available</h2>
              <p>{products?.length}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
