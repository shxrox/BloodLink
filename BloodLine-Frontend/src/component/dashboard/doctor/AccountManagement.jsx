import React, { useEffect, useState } from "react";
import { getRegistrations } from "../../../services/RegistrationAPI";
import Navbar from './DoctorNavbar';
import Footer from '../../Footer';
import '../../../docstyle/AccountManagement.css';


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
    <div className="section-container">
      <h3 className="section-title">{title}</h3>
      <div className="table-wrapper">
        <table className="accounts-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr><td colSpan="3" className="no-accounts-message">No {title.toLowerCase()} found</td></tr>
            ) : (
              data.map(acc => (
                <tr key={acc.id}>
                  <td>{acc.name}</td>
                  <td>{acc.email}</td>
                  <td>{acc.mobile_num}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="account-management-page">
      <Navbar />
      <div className="account-management-container">
        <h2 className="main-title">Account Management</h2>
        {renderTable("Doctors", doctors)}
        {renderTable("Nurses", nurses)}
        {renderTable("Lab Technicians", labtechs)}
      </div>
      <Footer />
    </div>
  );
};

export default AccountManagement;