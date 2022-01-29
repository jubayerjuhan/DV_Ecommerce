import React, { useEffect } from "react";
import Navbar from "../../component/navbar/Navbar";
import Footer from "../../component/footer/Footer";
import Footerfeature from "../../component/footer_feature/Footerfeature";
import Reviewcardinfo from "../../component/review_card/Reviewcardinfo.jsx";
import "./productdetail.css";
import { useParams } from "react-router";
import { getSingleProduct } from "../../actions/productactions.js";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../component/spinner/Spinner.jsx";
import { toastWarning } from "../../utils/toastify.js";
import { addItemstoCart } from "../../actions/cartactions.js";
import { toastSuccess } from "./../../utils/toastify";
import TitleHelmet from "../../component/Helmet/Helmet.jsx";
const Productdetail = () => {
  const dispatch = useDispatch();
  const { product, loading, success } = useSelector(
    (state) => state.singleproduct
  );
  const [mainImage, setMainImage] = React.useState("");
  const { id } = useParams();
  useEffect(() => {
    dispatch(getSingleProduct(id));
  }, [dispatch, id]);

  if (success) {
    dispatch({ type: "RESET_SUCCESS" });
    setMainImage(product && product.images[0].url);
  }

  // quantity
  const [quantity, setQuantity] = React.useState(1);

  if (quantity <= 0) {
    toastWarning("Minimum quantity is 1");
    setQuantity(1);
  }
  if (product?.stock < quantity) {
    toastWarning("Not Enough Stock");
    setQuantity(product?.stock);
    return;
  }

  const handleAddtoCart = () => {
    dispatch(addItemstoCart(product, quantity));
    toastSuccess("Item Added to Cart");
  };

  return (
    <>
      <TitleHelmet title={product?.name} />
      {loading && <Spinner />}
      {loading === false && (
        <>
          <Navbar />
          <div className="product-detail__container section__padding">
            <div className="product-detail__content">
              <div className="product-detail__image">
                <img src={mainImage} alt="" />
                <div className="product-detail__image-thumbnail">
                  {product &&
                    product.images.map((image) => (
                      <img
                        src={image.url}
                        alt={product.name}
                        onClick={() => setMainImage(image.url)}
                      />
                    ))}
                </div>
              </div>
              <div className="product-detail-info">
                <div className="product-detail__title">
                  <h2>{product?.name}</h2>
                </div>
                <div className="product-detail__price">
                  <p>{`৳ ${product?.price}`}</p>
                </div>
                <div className="product-detail__quantity">
                  <p>Quantity</p>
                  <div className="product-detail__quantity-input">
                    <button onClick={() => setQuantity(quantity - 1)}>-</button>
                    <input type="text" placeholder="1" value={quantity} />
                    <button onClick={() => setQuantity(quantity + 1)}>+</button>
                  </div>
                </div>

                <div onClick={handleAddtoCart} className="action-cart-btn">
                  <p>Add To Cart</p>
                  <svg
                    width="33"
                    height="32"
                    viewBox="0 0 33 32"
                    fill="black"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.8337 25.3333C11.4381 25.3333 11.0514 25.4506 10.7225 25.6704C10.3936 25.8902 10.1373 26.2025 9.9859 26.568C9.83452 26.9334 9.79492 27.3356 9.87209 27.7235C9.94926 28.1115 10.1397 28.4678 10.4194 28.7475C10.6992 29.0273 11.0555 29.2177 11.4435 29.2949C11.8314 29.3721 12.2336 29.3325 12.599 29.1811C12.9645 29.0297 13.2768 28.7734 13.4966 28.4445C13.7164 28.1156 13.8337 27.7289 13.8337 27.3333C13.8337 26.8029 13.6229 26.2942 13.2479 25.9191C12.8728 25.544 12.3641 25.3333 11.8337 25.3333ZM25.8337 21.3333H9.83366C9.48004 21.3333 9.1409 21.1929 8.89085 20.9428C8.6408 20.6928 8.50033 20.3536 8.50033 20C8.50033 19.6464 8.6408 19.3072 8.89085 19.0572C9.1409 18.8071 9.48004 18.6667 9.83366 18.6667H21.1553C22.0238 18.6639 22.8681 18.3797 23.5616 17.8567C24.255 17.3336 24.7603 16.6 25.0017 15.7656L27.1156 8.36653C27.1723 8.1681 27.1822 7.9592 27.1444 7.7563C27.1067 7.5534 27.0224 7.36202 26.8981 7.19724C26.7738 7.03246 26.613 6.89878 26.4283 6.80671C26.2436 6.71464 26.04 6.6667 25.8337 6.66667H9.48575C9.20973 5.88981 8.70092 5.21695 8.02863 4.73975C7.35633 4.26256 6.55327 4.00424 5.72885 4H4.50033C4.1467 4 3.80756 4.14048 3.55752 4.39052C3.30747 4.64057 3.16699 4.97971 3.16699 5.33333C3.16699 5.68696 3.30747 6.02609 3.55752 6.27614C3.80756 6.52619 4.1467 6.66667 4.50033 6.66667H5.72885C6.01829 6.66768 6.29962 6.76242 6.53071 6.93671C6.7618 7.11099 6.93021 7.35545 7.01074 7.63347L7.2181 8.35979L7.21842 8.36653L9.40593 16.0228C8.38801 16.1323 7.45082 16.6279 6.78735 17.4076C6.12387 18.1873 5.78461 19.1918 5.83943 20.2141C5.89424 21.2364 6.33896 22.1988 7.08201 22.9031C7.82506 23.6074 8.80987 24 9.83366 24H25.8337C26.1873 24 26.5264 23.8595 26.7765 23.6095C27.0265 23.3594 27.167 23.0203 27.167 22.6667C27.167 22.313 27.0265 21.9739 26.7765 21.7239C26.5264 21.4738 26.1873 21.3333 25.8337 21.3333ZM24.0661 9.33333L22.4378 15.0325C22.3574 15.3108 22.1889 15.5555 21.9577 15.7299C21.7265 15.9043 21.4449 15.9991 21.1553 16H12.1728L11.8329 14.8104L10.2689 9.33333H24.0661ZM22.5003 25.3333C22.1048 25.3333 21.7181 25.4506 21.3892 25.6704C21.0603 25.8902 20.8039 26.2025 20.6526 26.568C20.5012 26.9334 20.4616 27.3356 20.5388 27.7235C20.6159 28.1115 20.8064 28.4678 21.0861 28.7475C21.3658 29.0273 21.7222 29.2177 22.1101 29.2949C22.4981 29.3721 22.9002 29.3325 23.2657 29.1811C23.6311 29.0297 23.9435 28.7734 24.1633 28.4445C24.383 28.1156 24.5003 27.7289 24.5003 27.3333C24.5003 26.8029 24.2896 26.2942 23.9145 25.9191C23.5395 25.544 23.0308 25.3333 22.5003 25.3333Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <div className="product-detail__description">
                  <p>{product?.description}</p>
                </div>
              </div>
            </div>
          </div>
          <Footerfeature />
          <Footer />
        </>
      )}
    </>
  );
};

const reviews = [
  {
    username: "Juhan",
    rating: 5,
    comment: "Dam e kom man e valo",
  },
  { username: "Jubayer", rating: 3, comment: "good" },
  { username: "Abir", rating: 5, comment: "good, very good" },
];

export default Productdetail;
