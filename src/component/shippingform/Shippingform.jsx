import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import "./shippingform.css";
import { useDispatch } from "react-redux";

const Shippingform = () => {
  const schema = yup
    .object({
      name: yup.string().required(),
      phoneNumber: yup.number().required(),
      street: yup.string().required(),
      city: yup.string().required(),
      state: yup.string().required(),
      zipcode: yup.number().required().positive(),
    })
    .required();
  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const onSubmit = (data) => {
    // console.log(data);
    dispatch({ type: "ADD_SHIPPING_ADDRESS", payload: data });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="input__group">
        <p>Name</p>
        <input {...register("name")} />
        <p className="error">{errors.name && "Name Required"}</p>
      </div>
      <div className="input__group">
        <p>Phone Number</p>
        <input {...register("phoneNumber")} />
        <p className="error">{errors.phoneNumber && "Phone Number Required"}</p>
      </div>
      <div className="input__group">
        <p>Street</p>
        <input {...register("street")} />
        <p className="error">{errors.street && "Street is Required"}</p>
      </div>
      <div className="input__group">
        <p>City</p>
        <input {...register("city")} />
        <p className="error">{errors.city && "City is Required"}</p>
      </div>

      <div className="input__group">
        <p>State</p>
        <input {...register("state")} />
        <p className="error">{errors.state && "State Required"}</p>
      </div>
      <div className="input__group">
        <p>Zipcode</p>
        <input {...register("zipcode")} />
        <p className="error">{errors.zipcode && "Zipcode Required"}</p>
      </div>

      <input type="submit" value="Submit" />
    </form>
  );
};

export default Shippingform;
