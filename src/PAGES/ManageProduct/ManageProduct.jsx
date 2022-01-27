import { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import {
  adminDeleteProduct,
  getAdminProduct,
} from "../../actions/productactions.js";
import Spinner from "../../component/spinner/Spinner.jsx";
import { BiMessageEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

import "./manageProduct.css";
import EditProductModal from "../../component/EditProductModal/EditProductModal.jsx";
import { useState } from "react";
import { toastSuccess } from "../../utils/toastify.js";

export default function DataGridDemo() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState("");

  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.adminProducts);
  const { success, error } = useSelector((state) => state.editproduct);
  console.log(products);

  const columns = [
    {
      field: "productName",
      headerName: "Product Name",
      flex: 1,
    },
    {
      field: "productPrice",
      headerName: "Product Price",
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
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
  if (products) {
    products.forEach((product) => {
      rows.push({
        productName: product.name,
        productPrice: product.price,
        stock: product.stock,
        id: product._id,
      });
    });
  }

  useEffect(() => {
    dispatch(getAdminProduct());
  }, [dispatch]);

  if (success) {
    toastSuccess("Successfull");
    dispatch({ type: "RESET_SUCCESS" });
    setModalOpen(false);
  }

  if (error) {
    alert(error);
    dispatch({ type: "CLEAR_ERROR" });
  }

  const onEditPress = (product) => {
    setModalOpen(true);
    setSelected(product);
  };

  const handleDelete = (product) => {
    dispatch(adminDeleteProduct(product));
  };
  return (
    <>
      {loading && <Spinner />}
      {modalOpen && (
        <EditProductModal
          selected={selected}
          open={modalOpen}
          setModalOpen={setModalOpen}
        />
      )}
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
}
