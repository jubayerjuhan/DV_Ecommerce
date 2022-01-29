import React from "react";
import "./productcardprimary.css";

const ProductcardPrimary = ({ product }) => {
  return (
    <div className="productCard productCard">
      <div className="productCard__image">
        <img src={product.images[0].url} alt={product.name} />
      </div>
      <div className="productCard__name">
        <h3>{product.name}</h3>
      </div>
      <div iv className="productCard__price">
        <p>{`৳ ${product.price}`}</p>
      </div>
    </div>
  );
};

export default ProductcardPrimary;
