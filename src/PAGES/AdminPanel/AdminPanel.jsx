import React from "react";
import "./adminPanel.css";
import AdminPanelSidebar from "../../component/APSidebar/AdminPanelSidebar.jsx";
import AddProduct from "../Admin_addproduct/Addproduct.jsx";
import ManageProduct from "../ManageProduct/ManageProduct.jsx";
import ManageOrder from "../Admin_ManageOrder/ManageOrder.jsx";

import { useParams } from "react-router-dom";
import Dashboard from "../Admin_Dashboard/Dashboard.jsx";
import TitleHelmet from "../../component/Helmet/Helmet.jsx";
const AdminPanel = () => {
  const { name } = useParams();
  return (
    <>
      <TitleHelmet title="Admin Panel" />

      <div className="adminPanel__wrapper">
        <div className="adminPanel__container">
          <AdminPanelSidebar />
          <div className="admin__panel-gui">
            <ShowGui name={name} />
          </div>
        </div>
      </div>
    </>
  );
};

const ShowGui = ({ name }) => {
  if (!name) return <h1>404</h1>;
  if (name === "add-product") return <AddProduct />;
  if (name === "dashboard") return <Dashboard />;
  if (name === "manage-product") return <ManageProduct />;
  if (name === "manage-orders") return <ManageOrder />;
  return <h1>404</h1>;
};
export default AdminPanel;
