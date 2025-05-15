import React from "react";
import { Link } from "react-router-dom";

const NurseNavbar = () => {
  return (
    <nav style={styles.navbar}>
      <div>
        <Link to="/dashboard/nurse" style={styles.link}>Home</Link>
        <Link to="/dashboard/nurse/patient-register" style={styles.link}>patient Register</Link>
        <Link to="/dashboard/nurse/patient-queue" style={styles.link}>patient queue</Link>
        <Link to="/dashboard/nurse/patient-labreport" style={styles.link}>patient lab</Link>
        <Link to="/dashboard/nurse/lab-cheking" style={styles.link}>patient Detailed Report</Link>
        <Link to="/dashboard/nurse/staff" style={styles.link}>staff</Link>
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
