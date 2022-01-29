import React from "react";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import "./EditOrder.css";
import {
  getSingleOrder,
  updateOrderStatus,
} from "../../actions/orderactions.js";
import Spinner from "../../component/spinner/Spinner.jsx";
import TitleHelmet from "../../component/Helmet/Helmet.jsx";
const EditOrder = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { order, loading, error } = useSelector((state) => state.singleOrder);
  const { success, error: updateError } = useSelector(
    (state) => state.updateOrder
  );

  useEffect(() => {
    dispatch(getSingleOrder(id));
  }, [dispatch, id]);

  if (success) {
    alert("Order Updated Successfully");
    dispatch({ type: "RESET_SUCCESS" });
  }

  if (error || updateError) {
    alert(error || updateError);
    dispatch({ type: "CLEAR_ERROR" });
  }

  const handleStatusChange = (e) => {
    if (e.target.value == null) return;
    dispatch(updateOrderStatus(id, e.target.value));
  };

  return (
    <>
      <TitleHelmet title="Update Order Status" />

      {loading || !order ? (
        <Spinner />
      ) : (
        <>
          <div className="edit__order-container">
            <div className="edit__order-buyerInfo">
              <h2>{order.user.name}</h2>
              <h3>Phone No: {order.shippingInfo.phoneNumber}</h3>
              <h3>Email: {order.user.email}</h3>

              <div>
                <h3>Address:</h3>
                <p>
                  {order.shippingInfo.street}, {order.shippingInfo.city},{" "}
                  {order.shippingInfo.state}, {order.shippingInfo.zipcode},{" "}
                  {order.shippingInfo.country}
                </p>
              </div>
            </div>

            <div className="edit__order-items">
              <h2>Items</h2>
              <div className="edit__order-items-container">
                {order.orderItems.map((item) => (
                  <div className="edit__order-item">
                    <img src={item.image} alt="" />
                    <div>
                      <p>{item.name}</p>
                      <p>{`৳ ${item.price}`}</p>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="edit__order-total">
              <h2>Total: {`৳ ${order.priceBreakdown.totalPrice}`}</h2>
              <p>
                <span>Subtotal: </span>
                <span>{`৳ ${order.priceBreakdown.subtotal}`}</span>
              </p>
              <p>
                <span>Shipping: </span>
                <span>{`৳ ${order.priceBreakdown.shippingCharge}`}</span>
              </p>
            </div>
            {order.orderStatus !== "Delivered" && (
              <div className="edit__order-changeOrderStatus">
                <h2>Change Order Status</h2>
                <select onChange={handleStatusChange}>
                  {order.orderStatus === "Processing" && (
                    <>
                      <option value={null}>Select One</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </>
                  )}

                  {order.orderStatus === "Shipped" && (
                    <>
                      <option value={null}>Select One</option>
                      <option value="Delivered">Delivered</option>
                    </>
                  )}
                </select>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default EditOrder;
