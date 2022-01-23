import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import "./editProductModal.css";

import { categories } from "../../PAGES/Admin_addproduct/Addproduct.jsx";
import { useDispatch, useSelector } from "react-redux";
import { adminEditProduct } from "../../actions/productactions.js";
import { toastSuccess } from "../../utils/toastify.js";

const EditProductModal = ({ selected, open, setModalOpen }) => {
  const [inputValue, setInputValue] = useState({});
  const dispatch = useDispatch();
  const { success, error } = useSelector((state) => state.editproduct);
  const inputFields = [
    { name: "name", label: "Prouct Name" },
    { name: "description", label: "Product Desctiption" },
    { name: "price", label: "Price" },
    { name: "stock", label: "Stock" },
  ];

  if (error) {
    alert(error);
    dispatch({ type: "CLEAR_ERROR" });
  }

  if (success) {
    toastSuccess("Product Updated Successfully");
    dispatch({ type: "RESET_SUCCESS" });
    setModalOpen(false);
  }

  const handleChange = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
    console.log(inputValue);
  };

  const handleSubmit = (e) => {
    if (!inputValue) return;
    dispatch(adminEditProduct(inputValue, selected));
  };
  return (
    <Modal
      open={open}
      // onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="edit-area__wrapper">
        <div className="admin__input-area">
          {inputFields.map((field) => (
            <div className="admin__inputField">
              <label htmlFor="name">{field.label}</label>
              <input
                value={inputValue[field.name]}
                type="text"
                name={field.name}
                onChange={(e) => handleChange(e)}
              />
            </div>
          ))}
          <div className="admin__inputField">
            <label htmlFor="name">Category</label>
            <select name="category" id="category" onChange={handleChange}>
              <option value={null}>Select Category</option>
              {categories.map((category) => (
                <option value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div>
            <input type="submit" className="subBtn" onClick={handleSubmit} />
            <button
              className="btn btn-submit"
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditProductModal;
