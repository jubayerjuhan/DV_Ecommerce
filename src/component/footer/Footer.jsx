import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "../navbar/Navbar.jsx";
import "./footer.css";
import { BsArrowRight } from "react-icons/bs";
import { AiOutlinePhone } from "react-icons/ai";
import { FiMail } from "react-icons/fi";
import logo from "../../assets/images/dimvajiLogo.png";
import {
  TiSocialFacebook,
  TiSocialInstagram,
  TiSocialTwitter,
} from "react-icons/ti";

const Footer = () => {
  return (
    <div className="footer__container section__padding">
      <div className="footer__left-section">
        <img
          src={logo}
          alt=""
          className="logo"
          style={{
            maxHeight: "80px",
          }}
        />
        <div className="footer__left-section-contact">
          <h5>Contacts</h5>
          <div className="contacts__wrapper">
            <AiOutlinePhone />
            <p>+7 (999) 999-99-99</p>
          </div>
          <div className="contacts__wrapper">
            <FiMail />
            <p>demo@support.com</p>
          </div>
        </div>

        <div className="footer__left-section_socialMedia">
          <h5>Social Media</h5>
          <div className="socialMediaContainer">
            <Link to="/elliye">
              <TiSocialInstagram />
            </Link>
            <Link to="/elliye">
              <TiSocialTwitter />
            </Link>
            <Link to="/elliye">
              <TiSocialFacebook />
            </Link>
          </div>
        </div>
      </div>
      <div className="footer__right-section">
        <div className="footer__right-section_links-container">
          <h5>Product Links</h5>
          <Menu></Menu>
        </div>
        <div className="footer__right-section_links-container">
          <h5>Company</h5>
          <CompanyLinks />
        </div>
        <div className="footer__right-section_newsletter">
          <h5>Join Our Newsletter</h5>
          <p>
            Drop your email below to get update, promotions, coupons, and more!
          </p>
          <div className="footerEmailInput">
            <input
              type="email"
              className="emailinput"
              placeholder="Enter your email"
            />
            <button className="emailbutton">
              <BsArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CompanyLinks = () => (
  <>
    <Link to="#about">About</Link>
    <Link to="#blog">Blog</Link>
    <Link to="#career">Career</Link>
    <Link to="#services">Services</Link>
    <Link to="#privacypolicy">Privacy Policy</Link>
    <Link to="#termsofservice">Terms Of Service</Link>
  </>
);
export default Footer;
