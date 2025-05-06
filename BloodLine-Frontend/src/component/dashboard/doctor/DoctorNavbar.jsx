import React from "react";
import { Link } from "react-router-dom";

const NurseNavbar = () => {
  return (
    <nav style={styles.navbar}>
      <div>
        <Link to="/dashboard/doctor" style={styles.link}>Home</Link>
        <Link to="/dashboard/doctor/patient-details" style={styles.link}>patient details</Link>
        <Link to="/dashboard/doctor/petient-cheking" style={styles.link}>patient check up details</Link>
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
