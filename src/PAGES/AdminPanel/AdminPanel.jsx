import React from "react";
import "./adminPanel.css";
import AdminPanelSidebar from "../../component/APSidebar/AdminPanelSidebar.jsx";
import AddProduct from "../Admin_addproduct/Addproduct.jsx";
import { useParams } from "react-router-dom";
const AdminPanel = () => {
  const { name } = useParams();
  return (
    <div className="adminPanel__wrapper">
      <div className="adminPanel__container">
        <AdminPanelSidebar />
        <div className="admin__panel-gui">
          <ShowGui name={name} />
        </div>
      </div>
    </div>
  );
};

const ShowGui = ({ name }) => {
  if (!name) return <h1>404</h1>;
  if (name === "add-product") return <AddProduct />;
  if (name === "dashboard") return <h1>Dashboard</h1>;
  if (name === "manage-user") return <h1>Manage User</h1>;
  if (name === "manage-product") return <h1>Manage Product</h1>;
  if (name === "manage-orders") return <h1>Manage Orders</h1>;
  return <h1>404</h1>;
};
export default AdminPanel;
