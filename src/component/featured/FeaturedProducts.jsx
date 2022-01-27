import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./featuredproducts.css";
import { BsArrowRight } from "react-icons/bs";
import ProductcardPrimary from "./../productcard-primary/ProductcardPrimary";
import { useDispatch, useSelector } from "react-redux";
import { toastError } from "../../utils/toastify.js";
import Spinner from "../spinner/Spinner.jsx";
import FadeLoader from "react-spinners/FadeLoader";
import {
  getAdminProduct,
  getallProducts,
} from "../../actions/productactions.js";

const FeaturedProducts = ({ category }) => {
  const dispatch = useDispatch();
  const {
    products: categoryProduct,
    loading,
    error,
  } = useSelector((state) => state.adminProducts);

  const products = [];
  categoryProduct?.forEach((product) => {
    if (product.category === category) {
      products.push(product);
    }
  });

  useEffect(() => {
    dispatch(getAdminProduct());
  }, [dispatch]);

  if (error) {
    toastError(error);
  }

  return (
    <>
      <div className="fp__container-heading ">
        <h4>{category}</h4>
        <a href={`/products?category=${category}`}>
          <p>View All</p>
          <BsArrowRight />
        </a>
      </div>
      {loading ? (
        <div className="fp__loading">
          <FadeLoader color="#393d46" />
        </div>
      ) : (
        <>
          <div className="fp__container section__padding" id="featured">
            <div className="fp__container-section" id="featured">
              <div className="fp__products">
                {products.slice(0, 5)?.map((product, i) => (
                  <Link key={i} to={`/product/${product._id}`}>
                    <ProductcardPrimary product={product} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default FeaturedProducts;
