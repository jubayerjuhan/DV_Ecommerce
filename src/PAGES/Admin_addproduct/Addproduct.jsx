import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
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
import { Checkbox } from "@mui/material";
import { authaxios } from "../../utils/axios.js";
const Addproduct = () => {
  const [allimages, setAllimages] = React.useState("");
  const dispatch = useDispatch();
  const [kitchen, setKitchen] = useState(true);
  const [kitchens, setKitchens] = useState([]);
  const schema = yup
    .object({
      name: yup.string().required(),
      description: yup.string().required(),
      price: yup.number().required(),
      category: yup.string().required(),
      subCategory: yup.string().required(),
      stock: yup.number().required(),
      kitchen: yup.string(),
    })
    .required();

  useEffect(() => {
    authaxios.get("/kitchens").then((res) => {
      setKitchens(res.data.kitchens);
    });
  }, []);

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
    formData.append("subCategory", data.subCategory ? data.subCategory : null);
    formData.append("stock", data.stock);
    formData.append("kitchen", data.kitchen);
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
          <Checkbox
            checked={kitchen}
            onChange={() => setKitchen(!kitchen)}
            name="Kitchen"
          />
          <label htmlFor="checkbox">Kitchen Food?</label>
          {kitchen && (
            <div className="input__group">
              <select {...register("kitchen")}>
                <option value={null}>Select Kitchen</option>
                {kitchens.map((kitchens) => (
                  <option value={kitchens._id}>{kitchens.name}</option>
                ))}
              </select>
            </div>
          )}
          <div className="input__group">
            <p>Sub Category</p>
            <input {...register("subCategory")} />
            <p className="error">
              {errors.subCategory && "Subcategory Required"}
            </p>
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
  "Daily Food Package",
  "Dimvaji Food Package",
  "Diet Food Package",
  "Bachelor Food Package",
  "Only Fruit Package",
  "Patient Food Package",
  "Nasta Food Package",
  "Vegetable Food Package",
];

export default Addproduct;
