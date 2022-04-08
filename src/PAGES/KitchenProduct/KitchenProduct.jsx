import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  getAdminProduct,
  getallProducts,
} from "../../actions/productactions.js";
import CategorySidebar from "../../component/CategorySidebar/CategorySidebar.jsx";
import Footer from "../../component/footer/Footer.jsx";
import Footerfeature from "../../component/footer_feature/Footerfeature.jsx";
import TitleHelmet from "../../component/Helmet/Helmet.jsx";
import Navbar from "../../component/navbar/Navbar.jsx";
import ProductcardPrimary from "../../component/productcard-primary/ProductcardPrimary.jsx";
import { instance } from "../../utils/axios.js";
// import "./Kitchens.css";

const Kitchens = () => {
  const dispatch = useDispatch();
  const kitchenProduct = [];
  const { success, error, products } = useSelector(
    (state) => state.adminProducts
  );
  const { id } = useParams();
  console.log(products, "products1");

  products?.forEach((product) => {
    console.log(product.kitchen, "Ello");
    if (product.kitchen === id) {
      kitchenProduct.push(product);
    }
  });

  console.log(kitchenProduct, "kpp");
  useEffect(() => {
    dispatch(getAdminProduct());
  }, [dispatch]);

  return (
    <>
      <TitleHelmet title="Dimvaji - Kitchen" />
      <div className="homepage__container">
        <div className="sidebar">
          <CategorySidebar />
        </div>
        <div className="homepage__main">
          <Navbar />
          <div className="kitchen__all section__padding">
            {kitchenProduct.map((product, i) => (
              <Link key={i} to={`/product/${product._id}`}>
                <ProductcardPrimary product={product} />
              </Link>
            ))}
          </div>
          <Footerfeature />

          <Footer />
        </div>
      </div>
    </>
  );
};

export default Kitchens;
