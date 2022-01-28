import React from "react";
import appsign from "../../assets/images/forgetpassword.svg";
import Navbar from "../../component/navbar/Navbar";
import Footer from "../../component/footer/Footer.jsx";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Errordialog from "./../../component/errordialog/Errordialog";
import TitleHelmet from "../../component/Helmet/Helmet.jsx";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../actions/userActions.js";
import { useSelector } from "react-redux";
import { toastError, toastSuccess } from "../../utils/toastify.js";
import { Navigate, useNavigate, useParams } from "react-router-dom";

const schema = yup.object({
  password: yup
    .string()
    .min(5, "Password must be at least 8 characters")
    .required("Field Is Required"),
  confirmPassword: yup
    .string()
    .min(5, "Password must be at least 8 characters")
    .required("Field Is Required"),
});

const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useParams();
  const { success, message, error } = useSelector(
    (state) => state.forgetPassword
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data, e) => {
    console.log(token);
    dispatch(resetPassword(data, token));
  };

  if (error) {
    toastError(error);
    dispatch({ type: "CLEAR_ERROR" });
  }

  if (success) {
    toastSuccess("Password Changed Successfully");
    dispatch({ type: "CLEAR_SUCCESS" });
    navigate("/login");
  }
  return (
    <>
      <TitleHelmet title="Forget Password" />

      <Navbar />
      <div className="register__container section__full-padding">
        <div className="register__graphicside">
          <div className="register__graphicside__image">
            <img src={appsign} alt="Hero img" />
          </div>
        </div>
        <div className="register__form ">
          <h1>Reset Password</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form__input">
              <p>New Password</p>
              <input {...register("password")} />
              <p className="error">{errors.password?.message}</p>
            </div>
            <div className="form__input">
              <p>Retype New Password</p>
              <input {...register("confirmPassword")} />
              <p className="error">{errors.confirmPassword?.message}</p>
            </div>

            <input type="submit" className="btn btn-primary" />
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ResetPassword;
