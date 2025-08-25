import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; 
 // npm install jwt-decode
import Footer from "../components/Footer";
import { FaUserCircle } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../components/AdminDashboard.css";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [restaurantName, setRestaurantName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");

useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/");
    return;
  }

  try {
    const decoded = jwtDecode(token);
    setAdminEmail(decoded.email);
    setRestaurantName(decoded.restaurantName || "My Restaurant"); 
  } catch (err) {
    console.error("Invalid token", err);
    navigate("/");
  }
}, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/");
  };

  return (
    <div className="admin-dashboard-wrapper">

      <header className="admin-header d-flex justify-content-between align-items-center p-3 shadow">
        <div>
          <h5 className="mb-0 fw-bold">{restaurantName}</h5>
         {/*<span className="text-muted small">{adminEmail}</span>*/}
        </div>
        <div className="dropdown">
          <FaUserCircle
            size={30}
            className="dropdown-toggle"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{ cursor: "pointer" }}
          />
          <ul className="dropdown-menu dropdown-menu-end">
            <li>
              <span className="dropdown-item-text text-muted">{restaurantName}</span>
            </li>
            <li><hr className="dropdown-divider" /></li>
            <li>
              <button className="dropdown-item text-danger" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </header>


      <main className="admin-dashboard-content container text-center mt-5">
        <h2>Welcome, Admin 👨‍💻</h2>
        <p className="lead">Manage your restaurant menu and settings below:</p>

        <div className="d-flex flex-column gap-3 mt-4">
          <Link to="/view-menu" className="btn btn-info btn-lg">📋 View Menu</Link>
          <Link to="/add-item" className="btn btn-success btn-lg">➕ Add Menu Item</Link>
          <Link to="/remove-item" className="btn btn-danger btn-lg">❌ Remove Menu Item</Link>
          <Link to="/generate-qr" className="btn btn-primary btn-lg">🔗 Generate Table QR</Link>
          <Link to="/table-manager" className="btn btn-warning btn-lg">🪑 Manage Tables</Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}