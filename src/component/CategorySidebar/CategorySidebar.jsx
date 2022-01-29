import React from "react";
import { Menu } from "../navbar/Navbar.jsx";
import logo from "../../assets/images/logo-sec.svg";

import "./categorysidebar.css";
import { BsChevronRight } from "react-icons/bs";
import { useDispatch } from "react-redux";

const CategorySidebar = () => {
  const dispatch = useDispatch();
  const handleCategory = (category) => {
    dispatch({ type: "SET_CATEGORY", payload: category });
  };
  return (
    <div className="category__sidebar-container ">
      <div className="category__logo">
        <a href="/">
          <img src={logo} alt="Logo" />
        </a>
      </div>
      <div className="menu">
        <a href="/products" className="category__link">
          <p>All Products</p>
          <BsChevronRight />
        </a>
        <Menu handleCategory={handleCategory} chevron={true} />
      </div>
    </div>
  );
};

export default CategorySidebar;
