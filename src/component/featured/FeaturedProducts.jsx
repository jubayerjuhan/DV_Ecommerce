import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./featuredproducts.css";
import { BsArrowRight } from "react-icons/bs";
import ProductcardPrimary from "./../productcard-primary/ProductcardPrimary";
import { useDispatch, useSelector } from "react-redux";
import { toastError } from "../../utils/toastify.js";
import Spinner from "../spinner/Spinner.jsx";
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
      {loading ? (
        <></>
      ) : (
        <>
          <div className="fp__container section__padding" id="featured">
            <div className="fp__container-heading">
              <h4>{category}</h4>
              <Link to={`/products?category=${category}`}>
                <p>View All</p>
                <BsArrowRight />
              </Link>
            </div>

            <div className="fp__container-section" id="featured">
              <div className="fp__products">
                {products?.map((product, i) => (
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
