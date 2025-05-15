import React from "react";
import { Link } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";

const NurseNavbar = () => {
  return (
    <nav style={styles.navbar}>
      <div>
        <Link to="/dashboard/doctor" style={styles.link}>Home</Link>
        <Link to="/dashboard/doctor/patient-details" style={styles.link}>patient details</Link>
        <Link to="/dashboard/doctor/petient-cheking" style={styles.link}>patient check up details</Link>
        <Link to="/dashboard/doctor/petient-description" style={styles.link}>patient description</Link>
        <Link to="/dashboard/doctor/petient-medicine" style={styles.link}>patient medicine</Link>
        <Link to="/dashboard/doctor/about" style={styles.link}>about</Link>
        <Link to="/dashboard/doctor/staff" style={styles.link}>staff</Link>

  <div style={styles.registerIcon}>
  <Link to="/registration" style={{ color: "white", textDecoration: "none" }} title="Register">
    <FaUserPlus size={20} />
  </Link>
</div>

        
        <Link to="/login" style={styles.link}>Logout</Link>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: "green",
    padding: "10px",
    display: "flex",
    justifyContent: "center",
  },
  link: {
    margin: "0 15px",
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
  }
};

export default NurseNavbar;
