import React from "react";
import "./notfound.css";
import notfoundImg from "../../assets/images/404.svg";
import Navbar from "../../component/navbar/Navbar.jsx";
import Footer from "../../component/footer/Footer.jsx";

const Notfound = () => {
  return (
    <>
      <Navbar />
      <div className="notFound__page">
        <img src={notfoundImg} alt="" />
        <p>This Page Is Unavailable, Untill You Discover a Time Machine</p>
      </div>
      <Footer />
    </>
  );
};

export default Notfound;
