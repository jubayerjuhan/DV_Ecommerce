import React, { useEffect } from "react";
import Navbar from "../../component/navbar/Navbar";
import "./productlist.css";
import Slider from "@mui/material/Slider";
import { IoColorFilterOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import ProductcardPrimary from "../../component/productcard-primary/ProductcardPrimary";
import Pagination from "../../component/pagination/Pagination";
import Footer from "../../component/footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../component/spinner/Spinner.jsx";
import { getallProducts } from "../../actions/productactions.js";
import { categories } from "./../Admin_addproduct/Addproduct";
import { useLocation } from "react-router-dom";
import TitleHelmet from "../../component/Helmet/Helmet.jsx";

const Productlist = () => {
  const { search } = useLocation();
  const location = useLocation();
  console.log(location);

  const key = search.split("keyword=")[1];

  const [filter, setFilter] = React.useState({
    category: "",
    price: [0, 25000],
    rating: 0,
    keyword: key,
    page: 1,
  });
  filter.keyword = key;
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const { products, success, loading, productsCount, resultPerPage } =
    useSelector((state) => state.allproducts);

  const handleValueChange = (event) => {
    setFilter({ ...filter, [event.target.name]: event.target.value });
    console.log(filter);
  };

  const categoryFromHome = search.split("category=")[1];
  if (categoryFromHome) {
    filter.category = categoryFromHome;
  }

  useEffect(() => {
    dispatch(
      getallProducts(
        filter.keyword,
        filter.rating,
        filter.price[0],
        filter.price[1],
        filter.page,
        filter.category
      )
    );
  }, [dispatch, filter, key, productsCount, resultPerPage]);

  if (success) {
    dispatch({ type: "RESET_SUCCESS" });
  }
  const totalPage = Math.ceil(productsCount / resultPerPage);

  return (
    <>
      {loading && <Spinner />}
      <TitleHelmet title="Products" />

      <Navbar />
      <div className="productlist__container section__padding">
        <div className="show_filters" onClick={() => setOpen(!open)}>
          <IoColorFilterOutline />
          <p>Show Filters</p>
        </div>
        {open ? (
          <div className="slide-left">
            <ProductlistFilterLeft filter={filter} />
          </div>
        ) : (
          ""
        )}
        <div className="productlist__content__title">
          <h4>{products?.length > 0 ? "Product List" : "No Product Found"}</h4>
        </div>
        <div className="productlist__content">
          <ProductlistFilterLeft
            filter={filter}
            onValueChange={handleValueChange}
          />
          <div className="productlist__all-products">
            {products &&
              products.map((product, i) => (
                <Link key={i} to={`/product/${product._id}`}>
                  <ProductcardPrimary key={i} product={product} />
                </Link>
              ))}
          </div>
        </div>
        {totalPage > 1 && (
          <Pagination
            totalPage={totalPage}
            setFilter={setFilter}
            filter={filter}
          />
        )}
      </div>
      <Footer />
    </>
  );
};

const ProductlistFilterLeft = ({ onValueChange, filter }) => (
  <div className="productlist__filter">
    {console.log(filter)}
    <div className="filter__category">
      <p>Filter By Category</p>
      <select onChange={onValueChange} name="category">
        <option value="">All Categories</option>
        {categories.map((category, i) => (
          <option key={i} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>

    <div className="filter__price">
      <p>Filter By Price</p>
      <Slider
        value={filter.price}
        onChange={onValueChange}
        name="price"
        valueLabelDisplay="auto"
        getAriaValueText={(value) => `${value}`}
      ></Slider>
    </div>
  </div>
);

export default Productlist;
