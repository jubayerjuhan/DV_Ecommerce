import React, { useEffect } from "react";
import Horizontalproductcard from "../horizontalProductcard/Horizontalproductcard";
import "./hotsection.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getallProducts } from "../../actions/productactions";
import FadeLoader from "react-spinners/FadeLoader";

const Hotsection = () => {
  const dispatch = useDispatch();
  let { products, loading } = useSelector((state) => state.allproducts);
  const newArrival = products?.slice(0, 4);

  const popular = [];

  useEffect(() => {
    dispatch(getallProducts());
  }, []);

  if (products) {
    for (let i = 0; i < 4; i++) {
      let randomNumber = Math.floor(Math.random(1, 100) * products?.length);
      let isExist = popular.find((item) => item === products[randomNumber]);
      if (!isExist) {
        popular.push(products[randomNumber]);
      } else {
        i--;
      }
    }
  }
  console.log(popular);

  return (
    <div className="hotsection__container section__padding">
      <div className="hotsection__new-arrival" id="newarrivals">
        <h4 className="hotsection__title">New Arrival</h4>
        {loading ? (
          <div className="fp__loading">
            <FadeLoader color="#393d46" />
          </div>
        ) : (
          <div className="hotsection__new-arrival_products">
            {newArrival &&
              newArrival.map((product, i) => (
                <Link to={`product/${product._id}`}>
                  <Horizontalproductcard key={i} product={product} />
                </Link>
              ))}
          </div>
        )}
      </div>

      <div className="hotsection__popular-week" id="popularnow">
        <h4 className="hotsection__title">Popular This Week</h4>
        {loading ? (
          <div className="fp__loading">
            <FadeLoader color="#393d46" />
          </div>
        ) : (
          <div className="hotsection__popular-week_products">
            {popular &&
              popular.map((product, i) => (
                <Link to={`product/${product._id}`}>
                  <Horizontalproductcard key={i} product={product} />
                </Link>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Hotsection;
