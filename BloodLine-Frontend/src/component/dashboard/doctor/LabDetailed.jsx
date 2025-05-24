import React, { useEffect, useState } from "react";
import Navbar from "../doctor/DoctorNavbar";
import { getAllLabReports } from "../../../services/labReportService";
import Footer from '../../Footer';
import '../../../docstyle/Labdetails.css';

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

  return (
    <div className="lab-details-page">
      <Navbar />
      <div className="lab-details-container">

        <h1 className="section-title">Submitted Lab Reports</h1>
        <div className="table-wrapper">
          <table className="lab-reports-table">
            <thead>
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
                    <td>{report.patient?.fullName || "N/A"}</td>
                    <td>{report.testType}</td>
                    <td>{report.resultSummary}</td>
                    <td>{report.sentToLab ? "Yes" : "No"}</td>
                    <td>{report.labTechnician}</td>
                    <td>{report.reportDate}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <h1 className="section-title">Detailed Lab Reports</h1>
        <div className="table-wrapper">
          <table className="lab-reports-table">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Platelet</th>
                <th>Hemoglobin</th>
                <th>WBC</th>
                <th>RBC</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {detailedReports.length === 0 ? (
                <tr>
                  <td colSpan="6" className="no-reports-message">
                    No detailed reports available.
                  </td>
                </tr>
              ) : (
                detailedReports.map((detail, index) => (
                  <tr key={index}>
                    <td>{detail.labReport?.patient?.fullName || "N/A"}</td>
                    <td>{detail.plateletCount}</td>
                    <td>{detail.hemoglobinLevel}</td>
                    <td>{detail.wbcCount}</td>
                    <td>{detail.rbcCount}</td>
                    <td>{detail.notes}</td>
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