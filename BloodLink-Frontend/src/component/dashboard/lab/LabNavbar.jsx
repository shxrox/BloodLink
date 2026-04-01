import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";
import '../../../labstyle/LabNavbar.css'; 


const LabNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="lab-navbar">
      <div className="navbar-content">
        <Link to="/dashboard/lab" className="navbar-logo-link" onClick={() => setMenuOpen(false)}>
          <img src={logo} alt="BloodLink Logo" className="navbar-logo" />
        </Link>

        <div className={`navbar-links ${menuOpen ? 'active' : ''}`}>
          <Link to="/dashboard/lab" className="navbar-link" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/dashboard/lab/lab-details" className="navbar-link" onClick={() => setMenuOpen(false)}>Lab Details</Link>
          <Link to="/dashboard/lab/lab-cheking" className="navbar-link" onClick={() => setMenuOpen(false)}>Lab Check Up Details</Link>
          <Link to="/dashboard/lab/staff" className="navbar-link" onClick={() => setMenuOpen(false)}>Staff</Link>
          <Link to="/dashboard/lab/about" className="navbar-link" onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/login" className="navbar-link" onClick={() => setMenuOpen(false)}>Logout</Link>
          
        </div>

        <div className="menu-toggle" onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </nav>
  );
};

export default LabNavbar;