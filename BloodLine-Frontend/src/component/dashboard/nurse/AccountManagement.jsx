import React, { useEffect, useState } from "react";
import { getRegistrations } from "../../../services/RegistrationAPI";
import Navbar from './NurseNavbar';
import Footer from '../../Footer';
import "../../../style/AccountManagement.css";

const AccountManagement = () => {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const data = await getRegistrations();
      setAccounts(data);
    } catch (err) {
      console.error("Error fetching accounts:", err);
    }
  };

  const doctors = accounts.filter(acc => acc.role === "DOCTOR");
  const nurses = accounts.filter(acc => acc.role === "NURSE");
  const labtechs = accounts.filter(acc => acc.role === "LABTECH");

  const renderTable = (title, data) => (
    <section className="account-section">
      <h3 className="section-title">{title}</h3>
      <div className="table-scroll-wrapper">
        <table className="account-table">
          <thead className="table-header">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr><td colSpan="3" className="no-accounts-message">No {title.toLowerCase()} found.</td></tr>
            ) : (
              data.map(acc => (
                <tr key={acc.id}>
                  <td data-label="Name">{acc.name}</td>
                  <td data-label="Email">{acc.email}</td>
                  <td data-label="Mobile">{acc.mobile_num}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );

  return (
    <div className="account-management-page">
      <Navbar />
      <div className="account-management-container">
        <h1 className="main-title">Account Management</h1>

        {renderTable("Doctors", doctors)}
        <hr className="section-divider" />
        {renderTable("Nurses", nurses)}
        <hr className="section-divider" />
        {renderTable("Lab Technicians", labtechs)}
      </div>
      <Footer />
    </div>
  );
};

export default AccountManagement;
