import React from "react";
import logo from "../../assets/images/logo.svg";
import { BiSearchAlt2 } from "react-icons/bi";
import { FaOpencart } from "react-icons/fa";
import "./navbar.css";
import { Link, useLocation } from "react-router-dom";
import { Twirl as Hamburger } from "hamburger-react";
import { FaRegUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { toastSuccess } from "./../../utils/toastify";
import { useNavigate } from "react-router-dom";
import { categories } from "../../PAGES/Admin_addproduct/Addproduct.jsx";
export const Menu = () => (
  <>
    {categories.map((cate) => (
      <>
        <a href={`/products?category=${cate}`}>
          <p>{cate}</p>
        </a>
      </>
    ))}
  </>
);
const Navbar = () => {
  const location = useLocation();
  console.log(location);
  const navigate = useNavigate();
  const [isOpen, setOpen] = React.useState(false);
  const [keyword, setKeyword] = React.useState("");
  const { isloggedin, user } = useSelector((state) => state.user);
  const [userbar, setUserbar] = React.useState(false);

  const { cartItems } = useSelector((state) => state.cart);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
    toastSuccess("Logout Successfully");
  };

  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/products?searchkeyword=" + keyword);
  };

  return (
    <>
      {isOpen && (
        <div className="navbar__mobile-menu slide-left">
          <Menu />
          <Link to="/login">
            <button className="navbar__mobile__button">Login</button>
          </Link>
        </div>
      )}

      <div
        className="navbar__container section__padding"
        style={{ paddingTop: "1rem", paddingBottom: "1rem" }}
      >
        <div className="navbar__container-top">
          <div
            className={
              location.pathname === "/" ? "navbar__logo" : "navbar__logo-active"
            }
          >
            <a href="/">
              <img src={logo} alt="Logo" />
            </a>
          </div>

          <div className="navbar__searchbar">
            <form action="" onSubmit={handleSubmit}>
              <input
                type="search"
                placeholder="Search"
                onChange={handleChange}
                onSubmit={handleSubmit}
              />
              <button>
                <BiSearchAlt2 />
              </button>
            </form>
          </div>

          <div className="navbar__icon-menu__btn">
            <div className="cart__btn">
              <div>
                <p>{cartItems.length}</p>
              </div>
              <Link to="/cart">
                <FaOpencart />
              </Link>
            </div>

            {isloggedin === true ? (
              <FaRegUserCircle onClick={() => setUserbar(!userbar)} />
            ) : (
              <Link to="/login">
                <button className="navbar__sign-in  btn-primary">Login</button>
              </Link>
            )}
            <div
              className={
                isOpen
                  ? "lightText navbar__mobile-hamburger"
                  : "navbar__mobile-hamburger"
              }
            >
              <Hamburger toggled={isOpen} toggle={setOpen} />
            </div>
          </div>
        </div>
        {userbar && (
          <div className="userbar__container fade-in">
            <Link to="/orders">Orders</Link>
            {user.role === "admin" && (
              <Link to="/admin/dashboard">Admin Panel</Link>
            )}
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
        {/* <div className="navbar__container-menu ">
          <Menu></Menu>
        </div> */}
      </div>
    </>
  );
};

export default Navbar;
