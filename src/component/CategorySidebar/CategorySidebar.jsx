import React from "react";
import { Menu } from "../navbar/Navbar.jsx";
import logo from "../../assets/images/logo.svg";

import "./categorysidebar.css";
const CategorySidebar = () => {
  return (
    <div className="category__sidebar-container ">
      <div className="category__logo">
        <a href="/">
          <img src={logo} alt="Logo" />
        </a>
      </div>
      <div className="menu">
        <Menu />
      </div>
    </div>
  );
};

export default CategorySidebar;
