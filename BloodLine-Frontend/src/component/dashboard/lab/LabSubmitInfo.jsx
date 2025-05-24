import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./LabNavbar";
import Footer from '../../Footer';
import '../../../labstyle/LabSubmitInfo.css';


const LabSubmitInfo = () => {
  const [labReports, setLabReports] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/labreports/all")
      .then((res) => setLabReports(res.data))
      .catch((err) => console.error("Failed to fetch lab reports:", err));
  }, []);

  return (
    <div className="lab-submit-info-page">
      <Navbar />
      <div className="lab-submit-info-container">
        <h1 className="main-title">Submitted Lab Reports</h1>
        <div className="table-wrapper">
          <table className="lab-reports-table">
            <thead className="table-header">
              <tr>
                <th>Patient</th>
                <th>Test Type</th>
                <th>Result Summary</th>
                <th>Sent to Lab</th>
                <th>Technician</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {labReports.length === 0 ? (
                <tr>
                  <td colSpan="6" className="no-reports-message">
                    No lab reports available.
                  </td>
                </tr>
              ) : (
                labReports.map((report) => (
                  <tr key={report.reportId}>
                    <td data-label="Patient">{report.patient?.fullName || "N/A"}</td>
                    <td data-label="Test Type">{report.testType}</td>
                    <td data-label="Result Summary">{report.resultSummary}</td>
                    <td data-label="Sent to Lab">{report.sentToLab ? "Yes" : "No"}</td>
                    <td data-label="Technician">{report.labTechnician}</td>
                    <td data-label="Date">{report.reportDate}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LabSubmitInfo;