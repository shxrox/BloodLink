import React, { useEffect, useState } from "react";
import Navbar from "./NurseNavbar";
import { getAllLabReports } from "../../../services/labReportService";
import Footer from '../../Footer';
import "../../../style/Labdetails.css"; 

const Labdetails = () => {
  const [labReports, setLabReports] = useState([]);
  const [detailedReports, setDetailedReports] = useState([]);

  useEffect(() => {
    fetchLabReports();
    fetchDetailedReports();
  }, []);

  const fetchLabReports = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/labreports/all");
      const data = await res.json();
      setLabReports(data);
    } catch (error) {
      console.error("Failed to fetch lab reports:", error);
    }
  };

  const fetchDetailedReports = async () => {
    try {
      const data = await getAllLabReports();
      setDetailedReports(data);
    } catch (error) {
      console.error("Error fetching detailed reports", error);
    }
  };

  const handlePrint = (detail) => {
    const patientName = detail.labReport?.patient?.fullName || "Unknown";
    const testType = detail.labReport?.testType || "N/A";
    const reportDate = detail.labReport?.reportDate || "N/A";

    const content = `
      <html>
        <head>
          <title>Detailed Lab Report</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h2 { text-align: center; color: #c0392b; }
            p { margin-bottom: 5px; }
            strong { color: #333; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            td, th { border: 1px solid #ccc; padding: 8px; text-align: left; }
            th { background-color: #f0f0f0; }
          </style>
        </head>
        <body>
          <h2>Detailed Lab Report</h2>
          <p><strong>Patient:</strong> ${patientName}</p>
          <p><strong>Test Type:</strong> ${testType}</p>
          <p><strong>Report Date:</strong> ${reportDate}</p>
          <table>
            <tr><th>Platelet Count</th><td>${detail.plateletCount}</td></tr>
            <tr><th>Hemoglobin Level</th><td>${detail.hemoglobinLevel}</td></tr>
            <tr><th>WBC Count</th><td>${detail.wbcCount}</td></tr>
            <tr><th>RBC Count</th><td>${detail.rbcCount}</td></tr>
            <tr><th>Notes</th><td>${detail.notes}</td></tr>
          </table>
        </body>
      </html>
    `;

    const printWindow = window.open("", "_blank");
    printWindow.document.write(content);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <div className="lab-details-page">
      <Navbar />
      <div className="lab-details-container">

        <h1 className="lab-details-title">Submitted Lab Reports</h1>
        <div className="table-scroll-wrapper mb-10">
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
                  <td colSpan="6" className="text-center-message">
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

        {/* Detailed Lab Reports Table */}
        <h2 className="lab-details-subtitle">Detailed Lab Reports</h2>
        <div className="table-scroll-wrapper">
          <table className="detailed-lab-reports-table">
            <thead className="table-header">
              <tr>
                <th>Patient</th>
                <th>Platelet</th>
                <th>Hemoglobin</th>
                <th>WBC</th>
                <th>RBC</th>
                <th>Notes</th>
                <th>Print</th>
              </tr>
            </thead>
            <tbody>
              {detailedReports.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center-message">
                    No detailed reports available.
                  </td>
                </tr>
              ) : (
                detailedReports.map((detail, index) => (
                  <tr key={index}>
                    <td data-label="Patient">{detail.labReport?.patient?.fullName || "N/A"}</td>
                    <td data-label="Platelet">{detail.plateletCount}</td>
                    <td data-label="Hemoglobin">{detail.hemoglobinLevel}</td>
                    <td data-label="WBC">{detail.wbcCount}</td>
                    <td data-label="RBC">{detail.rbcCount}</td>
                    <td data-label="Notes">{detail.notes}</td>
                    <td data-label="Print" className="print-button-cell">
                      <button
                        onClick={() => handlePrint(detail)}
                        className="print-btn"
                      >
                        Print
                      </button>
                    </td>
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

export default Labdetails;
