import React from "react";
import Navbar from "./../../component/navbar/Navbar";
import Slidercomponent from "./../../component/slidercomponent/Slidercomponent";
import Productbanner from "./../../component/productbanner/Productbanner";
import Brands from "./../../component/brands_section/Brands";
// import some icons from react icons
import FeaturedProducts from "./../../component/featured/FeaturedProducts";
import Hotsection from "../../component/homapage_hotsection/Hotsection";
import Footerfeature from "./../../component/footer_feature/Footerfeature";
import Footer from "../../component/footer/Footer.jsx";
import TitleHelmet from "../../component/Helmet/Helmet.jsx";
import CategorySidebar from "../../component/CategorySidebar/CategorySidebar.jsx";
import "./Homepage.css";
import Bannerslider from "../../component/BannerSlider/Bannerslider.jsx";

const Homepage = () => {
  return (
    <>
      <TitleHelmet title="Dim Vaji - Home" />
      <div className="homepage__container">
        <div className="sidebar">
          <CategorySidebar />
        </div>
        <div className="homepage__main">
          <Navbar />
          <Bannerslider />
          <FeaturedProducts category="Sports" />
          <FeaturedProducts category="Accessories" />
          <FeaturedProducts category="Sports" />
          <FeaturedProducts category="Sports" />
          <Hotsection />
          <Footerfeature />
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Homepage;
