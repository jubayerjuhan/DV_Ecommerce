import { Button, Modal } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { authaxios, instance } from "../../utils/axios.js";
import { AiFillDelete } from "react-icons/ai";
import { toastSuccess, toastWarning } from "../../utils/toastify.js";

const ManageCoupon = () => {
  const [open, setOpen] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState("");
  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    {
      field: "code",
      headerName: "Code",
      flex: 1,
    },
    {
      field: "discount",
      headerName: "Discount",
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
            <AiFillDelete
              onClick={() => handleDelete(params.getValue(params.id, "id"))}
            />
          </div>
        );
      },
    },
  ];

  const handleDelete = (id) => {
    authaxios
      .delete("coupon/" + id)
      .then((res) => {
        if (res.data.success) {
          toastSuccess("Coupon deleted successfully");
          getCoupons();
        }
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getCoupons();
  }, []);
  const getCoupons = () => {
    authaxios.get("/coupons").then((res) => {
      setCoupons(res.data.coupons);
    });
  };

  const rows = [];
  coupons?.forEach((coupon) => {
    rows.push({
      id: coupon._id,
      code: coupon.code,
      discount: coupon.discount,
    });
  });

  const handleSubmit = () => {
    authaxios
      .post("/coupon/add", {
        code: coupon,
        discount: discount,
      })
      .then((res) => {
        if (res.data.success) {
          setCoupons([...coupons, res.data.coupon]);
          setCoupon("");
          setDiscount("");
          setOpen(false);
          alert("Coupon Added");
        }
      })
      .catch((err) => {
        alert("Something Went Wrong");
      });
  };

  return (
    <div className="kitchenWrapper">
      <Button variant="text" onClick={() => setOpen(true)}>
        Add Coupon
      </Button>
      <Modal
        open={open}
        // onClose={handleClose}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="addKitchen" style={{ backgroundColor: "White" }}>
          <input
            type="text"
            name="Name"
            id=""
            placeholder="Coupon Code"
            onChange={(e) => setCoupon(e.target.value)}
          />
          <input
            type="number"
            name="discount"
            id=""
            placeholder="Discount"
            onChange={(e) => setDiscount(e.target.value)}
          />
          <Button varient="contained" onClick={handleSubmit}>
            Submit
          </Button>
          <Button varient="contained" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </div>
      </Modal>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
    </div>
  );
};

export default ManageCoupon;
