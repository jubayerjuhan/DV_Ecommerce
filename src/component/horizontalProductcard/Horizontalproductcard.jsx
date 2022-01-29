import React from "react";
import "./horizontalProductcard.css";

const Horizontalproductcard = ({ product }) => {
  return (
    <div className="hProductcard__container">
      <div className="hProductcard__image">
        <img src={product?.images[0].url} alt="" />
      </div>
      <div className="hProductcard__info">
        <h2>{product?.name} </h2>
        <p>{`৳ ${product?.price}`}</p>
      </div>
    </div>
  );
};

export default Horizontalproductcard;
