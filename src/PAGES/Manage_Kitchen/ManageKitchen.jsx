import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import "./ManageKitchen.css";
import { authaxios, instance } from "../../utils/axios.js";

const ManageKitchen = () => {
  const [open, setOpen] = useState(false);
  const [kitchens, setKitchens] = useState([]);
  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
  ];

  useEffect(() => {
    instance.get("kitchens").then((res) => {
      setKitchens(res.data.kitchens);
    });
  }, []);

  const rows = [];
  kitchens?.forEach((kitchen) => {
    rows.push({
      id: kitchen._id,
      name: kitchen.name,
    });
  });

  const [allImages, setAllimages] = useState([]);
  const [name, setName] = useState("");
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setAllimages([]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAllimages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const formdata = new FormData();
  formdata.append("name", name);
  formdata.append("images", allImages[0]);

  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  const handleSubmit = () => {
    authaxios.post("/kitchen/add", formdata, config).then((res) => {
      console.log(res);
    });
  };

  return (
    <div className="kitchenWrapper">
      <Button variant="text" onClick={() => setOpen(true)}>
        Add Kitchen
      </Button>
      <Modal
        open={open}
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
            placeholder="Kitchen Name"
            onChange={(e) => setName(e.target.value)}
          />
          <input type="file" name="Image" id="" onChange={handleImageChange} />
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

export default ManageKitchen;
