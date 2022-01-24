import React from "react";

import { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../../component/spinner/Spinner.jsx";

import { BiMessageEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

import { useNavigate } from "react-router-dom";
import { deleteorder, getallorder } from "../../actions/orderactions.js";
const ManageOrder = () => {
  const dispatch = useDispatch();
  const { orders, loading, error, success } = useSelector(
    (state) => state.getAllOrder
  );
  const {
    loading: loadingDelete,
    error: deleteError,
    success: deleteSuccess,
  } = useSelector((state) => state.deleteOrder);
  const navigate = useNavigate();

  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      flex: 1,
    },
    {
      field: "orderPrice",
      headerName: "Order Price",
      flex: 1,
    },
    {
      field: "orderStatus",
      headerName: "Order Status",
      type: "number",
      flex: 1,
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="actionOfOrders">
            <BiMessageEdit
              onClick={() => onEditPress(params.getValue(params.id, "id"))}
            />

            <AiFillDelete
              onClick={() => handleDelete(params.getValue(params.id, "id"))}
            />
          </div>
        );
      },
    },
  ];

  const rows = [];
  if (orders) {
    orders.forEach((order) => {
      rows.push({
        id: order._id,
        orderPrice: `$${order.priceBreakdown.totalPrice}`,
        orderStatus: order.orderStatus,
      });
    });
  }

  useEffect(() => {
    dispatch(getallorder());
  }, [dispatch]);

  if (success) {
    dispatch({ type: "RESET_SUCCESS" });
  }
  if (deleteSuccess) {
    dispatch({ type: "RESET_SUCCESS" });
    alert("Deleted Successfully");
  }

  if (error || deleteError) {
    alert(error);
    dispatch({ type: "CLEAR_ERROR" });
  }

  const onEditPress = (id) => {
    navigate(`/admin/order/${id}`);
  };

  const handleDelete = (product) => {
    dispatch(deleteorder(product));
  };
  return (
    <>
      {(loading || loadingDelete) && <Spinner />}
      <div style={{ height: "100vh", width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      </div>
    </>
  );
};

export default ManageOrder;
