import React from "react";
import { Link } from "react-router-dom";

const NurseNavbar = () => {
  return (
    <nav style={styles.navbar}>
      <div>
        <Link to="/dashboard/lab" style={styles.link}>Home</Link>
        <Link to="/dashboard/lab/lab-details" style={styles.link}>lab details</Link>
        <Link to="/dashboard/lab/lab-cheking" style={styles.link}>lab check up details</Link>
        <Link to="/dashboard/lab/staff" style={styles.link}>staff</Link>
        <Link to="/dashboard/lab/about" style={styles.link}>about</Link>
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
