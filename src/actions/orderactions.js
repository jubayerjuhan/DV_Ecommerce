import { authaxios } from "./../utils/axios";

export const placeOrder = (orderData) => async (dispatch) => {
  try {
    dispatch({ type: "PLACE_ORDER_PENDING" });
    const { data } = await authaxios.post("/order/new", orderData);
    dispatch({ type: "PLACE_ORDER_FULFILLED", payload: data.success });
  } catch (err) {
    console.log(err.message);
    dispatch({ type: "PLACE_ORDER_REJECTED", payload: err.response.data.error });
  }
}

export const getUserOrder = () => async (dispatch) => {
  try {
    dispatch({ type: "GET_USER_ORDER_PENDING" });
    const { data } = await authaxios.get("/my-orders");
    dispatch({ type: "GET_USER_ORDER_FULFILLED", payload: data.orders });

  } catch (err) {
    console.log(err.message);
    dispatch({ type: "GET_USER_ORDER_REJECTED", payload: err.response.data.message });
  }
}



export const getallorder = () => async (dispatch) => {
  try {
    dispatch({ type: "ALL_ORDER_PENDING" });
    const { data } = await authaxios.get("admin/orders");
    console.log(data)
    dispatch({ type: "ALL_ORDER_FULFILLED", payload: data.orders });

  } catch (err) {
    console.log(err.message);
    dispatch({ type: "ALL_ORDER_REJECTED", payload: err.response.data.message });

  }
}


// admin delete order
export const deleteorder = (id) => async (dispatch) => {
  try {
    dispatch({ type: "DELETE_ORDER_PENDING" });
    const { data } = await authaxios.delete(`/admin/order/${id}`);
    dispatch({ type: "DELETE_ORDER_FULFILLED", payload: data.success });
  } catch (err) {
    console.log(err.message);
    dispatch({ type: "DELETE_ORDER_REJECTED", payload: err.response.data.message });

  }
}



// admin get single order 
export const getSingleOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: "GET_SINGLE_ORDER_PENDING" });

    const { data } = await authaxios.get(`/order/${id}`);

    dispatch({ type: "GET_SINGLE_ORDER_FULFULLED", payload: data.order });
  } catch (err) {
    console.log(err.message);
    dispatch({ type: "GET_SINGLE_ORDER_REJECTED", payload: err.response.data.message });

  }
}


// order status update
export const updateOrderStatus = (id, status) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_ORDER_STATUS_PENDING" });
    const { data } = await authaxios.put(`/admin/order/${id}`, { status });
    dispatch({ type: "UPDATE_ORDER_STATUS_FULFILLED", payload: data.success });
  } catch (err) {
    console.log(err.message);
    dispatch({ type: "UPDATE_ORDER_STATUS_REJECTED", payload: err.response.data.message });

  }
}