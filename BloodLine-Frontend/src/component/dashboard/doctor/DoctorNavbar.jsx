import React from "react";
import { Link } from "react-router-dom";
import '../../../docstyle/navbar.css'; 
import logo from "../../../assets/logo.png";

const DocNavbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
             <Link to="/dashboard/doctor" className="navbar-logo-link" onClick={() => setMenuOpen(false)}>
                 <img src={logo} alt="Logo" className="navbar-logo" />
               </Link>

        <div className="navbar-links">
          <Link to="/dashboard/doctor" className="nav-link">Home</Link>
          <Link to="/dashboard/doctor/patient-details" className="nav-link">Patient Details</Link>
          <Link to="/dashboard/doctor/petient-cheking" className="nav-link">Patient Check Up</Link>
          <Link to="/dashboard/doctor/petient-description" className="nav-link">Patient Description</Link>
          <Link to="/dashboard/doctor/petient-medicine" className="nav-link">Patient Medicine</Link>
          <Link to="/dashboard/doctor/about" className="nav-link">About</Link>
          <Link to="/dashboard/doctor/staff" className="nav-link">Staff</Link>
        </div>

        <div className="navbar-actions">

          <Link to="/login" className="nav-link logout-link">Logout</Link>
        </div>
      </div>
    </nav>
  );
};

export default DocNavbar;