import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";

import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import Navbar from "../../component/navbar/Navbar";
// import Footer from "../../component/footer/Footer";
import { useSelector, useDispatch } from "react-redux";
import { addproduct } from "../../actions/productactions.js";
import { toastSuccess, toastError } from "../../utils/toastify.js";
import Spinner from "../../component/spinner/Spinner.jsx";
import "./addproduct.css";
import TitleHelmet from "../../component/Helmet/Helmet.jsx";
const Addproduct = () => {
  const [allimages, setAllimages] = React.useState("");
  const dispatch = useDispatch();

  const schema = yup
    .object({
      name: yup.string().required(),
      description: yup.string().required(),
      price: yup.number().required(),
      category: yup.string().required(),
      stock: yup.number().required(),
    })
    .required();

  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleChange = (e) => {
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

  const onSubmit = async (data) => {
    // console.log(data);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("stock", data.stock);
    allimages.forEach((elem) => {
      formData.append("images", elem);
    });
    console.log(formData);
    dispatch(addproduct(formData));
    reset(data);
  };

  const { success, error, loading } = useSelector((state) => state.addproduct);
  if (success) {
    toastSuccess("Product Added Successfully");
    dispatch({ type: "RESET_SUCCESS" });
    window.location.reload();
  }
  if (error) {
    toastError("Something went wrong");
    dispatch({ type: "CLEAR_ERROR" });
  }

  return (
    <>
      <TitleHelmet title="Admin - Add Product" />

      {loading && <Spinner />}
      <div className="addproduct__container section__padding">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input__group">
            <p>Product Name</p>
            <input {...register("name")} />
            <p className="error">{errors.name && "Product Name Required"}</p>
          </div>
          <div className="input__group">
            <p>Description</p>
            <Controller
              name="description"
              control={control}
              label="Description"
              render={() => (
                <textarea rows={10} {...register("description")}></textarea>
              )}
            ></Controller>
            <p className="error">
              {errors.description && "description Required"}
            </p>
          </div>
          <div className="input__group">
            <p>Price</p>
            <input {...register("price")} />
            <p className="error">{errors.price && "Price is Required"}</p>
          </div>
          <div className="input__group">
            <p>Category</p>
            <select {...register("category")}>
              <option value={null}>Select Category</option>
              {categories.map((category) => (
                <option value={category}>{category}</option>
              ))}
            </select>
            <p className="error">{errors.category && "Category Required"}</p>
          </div>
          <div className="input__group">
            <p>Stock</p>
            <input {...register("stock")} />
            <p className="error">{errors.stock && "Stock is Required"}</p>
          </div>
          <div className="input__group">
            <p>Image</p>
            <input onChange={handleChange} type="file" multiple />
            <p className="error">{errors.images && "State Required"}</p>
            <input type="submit" />
          </div>
        </form>
      </div>
    </>
  );
};

export const categories = [
  "T-shirt",
  "Shirt",
  "Pants",
  "Shoes",
  "Bag",
  "Female Dress",
  "Accessories",
  "Phone",
  "Appliences",
  "Laptop",
  "Camera",
  "Jacket",
  "Trousers",
  "Socks",
  "Sweater",
  "Sports",
  "TV",
  "Tablet",
  "Washing Machine",
  "Refrigerator",
];

export default Addproduct;
