import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "./bannerslider.css";

const Bannerslider = () => {
  const images = [
    "https://www.creatopy.com/blog/wp-content/uploads/2018/10/Twitch-Social-Media-Image-Size.jpg",
    "https://www.creatopy.com/blog/wp-content/uploads/2018/10/Twitch-Social-Media-Image-Size.jpg",
    "https://www.creatopy.com/blog/wp-content/uploads/2018/10/Twitch-Social-Media-Image-Size.jpg",
  ];
  return (
    <div className="slider">
      <Carousel interval={4000}>
        {images.map((image) => (
          <Carousel.Item>
            <img
              className="d-block w-100 carousel-img"
              src={image}
              alt="First slide"
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Bannerslider;
