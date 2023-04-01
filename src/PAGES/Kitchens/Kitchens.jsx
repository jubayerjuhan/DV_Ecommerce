import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CategorySidebar from "../../component/CategorySidebar/CategorySidebar.jsx";
import Footer from "../../component/footer/Footer.jsx";
import Footerfeature from "../../component/footer_feature/Footerfeature.jsx";
import TitleHelmet from "../../component/Helmet/Helmet.jsx";
import Navbar from "../../component/navbar/Navbar.jsx";
import { instance } from "../../utils/axios.js";
import "./Kitchens.css";

const Kitchens = () => {
  const [kitchens, setKitchens] = useState([]);
  console.log(kitchens);
  useEffect(() => {
    instance
      .get("/kitchens")
      .then((res) => {
        setKitchens(res.data?.kitchens);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
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
            {kitchens.map((kitchen) => (
              <Link to={`/kitchens-product/${kitchen._id}`}>
                <div className="kitchen__card ">
                  <img src={kitchen.image} alt="" />
                  <p>{kitchen.name}</p>
                </div>
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
