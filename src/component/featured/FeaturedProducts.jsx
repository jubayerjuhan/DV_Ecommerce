import React, { useEffect, useState } from "react";
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
  const { selectedCategory } = useSelector((state) => state.selectedCategory);

  let products = [];

  if (category !== "Trending Products") {
    categoryProduct?.forEach((product) => {
      if (product.category === category) {
        products.push(product);
      }
    });
  }

  if (category === "Trending Products") {
    products = categoryProduct;
    products?.slice(0, 20);
  }

  console.log(products, "productsaaa");
  const [selectedSub, setSelectedSub] = useState(null);

  useEffect(() => {
    dispatch(getAdminProduct());
  }, [dispatch]);

  if (error) {
    toastError(error);
  }

  console.log(selectedSub);

  return (
    <>
      <div className="fp__container-heading ">
        <h4>{category}</h4>
        {/* <a href={`/products?category=${category}`}>
          <p>View All</p>
          <BsArrowRight />
        </a> */}
      </div>
      {loading ? (
        <div className="fp__loading">
          <FadeLoader color="#393d46" />
        </div>
      ) : (
        <>
          <div className="fp__container section__padding" id="featured">
            <div className="fp__container-section" id="featured">
              {selectedCategory !== "Patient Food Package" && (
                <div className="fp__products">
                  {products?.map((product, i) => (
                    <Link key={i} to={`/product/${product._id}`}>
                      <ProductcardPrimary product={product} />
                    </Link>
                  ))}
                </div>
              )}
              {selectedCategory === "Patient Food Package" && (
                <>
                  <div className="subcategoryWrapperPat">
                    <div
                      className="subCategory"
                      onClick={() => setSelectedSub("Day")}
                    >
                      <h2>Day</h2>
                    </div>
                    <div
                      className="subCategory"
                      onClick={() => setSelectedSub("Night")}
                    >
                      <h2>Night</h2>
                    </div>
                  </div>
                  <div className="categoryWrapperSub">
                    {products
                      .filter((product) => product.subCategory === selectedSub)
                      ?.map((product, i) => (
                        <Link key={i} to={`/product/${product._id}`}>
                          <ProductcardPrimary product={product} />
                        </Link>
                      ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default FeaturedProducts;
