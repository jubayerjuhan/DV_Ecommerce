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

const Homepage = () => {
  return (
    <div className="homepage__container">
      <TitleHelmet title="Dim Vaji - Home" />
      <Navbar />
      <Slidercomponent />
      <Brands />
      <Productbanner />
      <FeaturedProducts />
      <Hotsection />
      <Footerfeature />
      <Footer />
    </div>
  );
};

export default Homepage;
