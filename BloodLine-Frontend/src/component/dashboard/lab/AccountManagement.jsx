import React, { useEffect, useState } from "react";
import { getRegistrations } from "../../../services/RegistrationAPI";
import Navbar from "./LabNavbar";

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

  // Filter accounts by role
  const doctors = accounts.filter(acc => acc.role === "DOCTOR");
  const nurses = accounts.filter(acc => acc.role === "NURSE");
  const labtechs = accounts.filter(acc => acc.role === "LABTECH");

  const renderTable = (title, data) => (
    <div style={{ marginBottom: "40px" }}>
      <h3>{title}</h3>
      <table border="1" cellPadding="8" style={{ width: "100%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr><td colSpan="3" style={{ textAlign: "center" }}>No {title.toLowerCase()} found</td></tr>
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
  );

  return (
    <div style={{ padding: "20px" }}>
      <Navbar />
      <h2>Account Management</h2>
      {renderTable("Doctors", doctors)}
      {renderTable("Nurses", nurses)}
      {renderTable("Lab Technicians", labtechs)}
    </div>
  );
};

export default AccountManagement;
