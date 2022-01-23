import { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../actions/productactions.js";

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
          <h1>Hello</h1>
        </div>
      );
    },
  },
];

export default function DataGridDemo() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.allproducts);
  console.log(products);

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
  console.log(rows);

  useEffect(() => {
    dispatch(getAdminProduct());
  }, [dispatch]);
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
      />
    </div>
  );
}
