import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";
import '../../../style/NurseNavbar.css';

const NurseNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="nurse-navbar">
      <div className="navbar-content">
        <Link to="/dashboard/nurse" className="navbar-logo-link" onClick={() => setMenuOpen(false)}>
          <img src={logo} alt="Logo" className="navbar-logo" />
        </Link>

        <div className={`navbar-links ${menuOpen ? 'active' : ''}`}>
          <Link to="/dashboard/nurse" className="navbar-link" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/dashboard/nurse/patient-register" className="navbar-link" onClick={() => setMenuOpen(false)}>Patient Register</Link>
          <Link to="/dashboard/nurse/patient-queue" className="navbar-link" onClick={() => setMenuOpen(false)}>Patient Queue</Link>
          <Link to="/dashboard/nurse/patient-labreport" className="navbar-link" onClick={() => setMenuOpen(false)}>Patient Lab</Link>
          <Link to="/dashboard/nurse/lab-cheking" className="navbar-link" onClick={() => setMenuOpen(false)}>Detailed Report</Link>
          <Link to="/dashboard/nurse/staff" className="navbar-link" onClick={() => setMenuOpen(false)}>Staff</Link>
          <Link to="/dashboard/nurse/about" className="navbar-link" onClick={() => setMenuOpen(false)}>About</Link>
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

export default NurseNavbar;
