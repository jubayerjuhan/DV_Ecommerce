import React from "react";
import appsign from "../../assets/images/forgetpassword.svg";
import Navbar from "../../component/navbar/Navbar";
import Footer from "../../component/footer/Footer.jsx";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Errordialog from "./../../component/errordialog/Errordialog";
import TitleHelmet from "../../component/Helmet/Helmet.jsx";

const schema = yup.object({
  email: yup
    .string()
    .email("Must be a valid email")
    .max(255)
    .required("Email is required"),
});

const Forgetpassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <>
      <TitleHelmet title="Forget Password" />

      <Navbar />
      <Errordialog />
      <div className="register__container section__full-padding">
        <div className="register__graphicside">
          <div className="register__graphicside__image">
            <img src={appsign} alt="Hero img" />
          </div>
        </div>
        <div className="register__form ">
          <h1>Forget Password</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form__input">
              <p>Email</p>
              <input {...register("email")} />
              <p className="error">{errors.email?.message}</p>
            </div>

            <input type="submit" className="btn btn-primary" />
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Forgetpassword;
