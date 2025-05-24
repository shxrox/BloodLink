import React, { useEffect, useState } from "react";
import Navbar from "./LabNavbar";
import Footer from '../../Footer';
import '../../../labstyle/Labdetails.css';

import {
  getAllLabReports,
  getDetailedReportByReportId,
  addDetailedReport,
} from "../../../services/labReportService";

const Labdetails = () => {
  const [labReports, setLabReports] = useState([]);
  const [detailedReports, setDetailedReports] = useState([]);
  const [isAdding, setIsAdding] = useState(null);
  const [newReportData, setNewReportData] = useState({
    plateletCount: "",
    hemoglobinLevel: "",
    wbcCount: "",
    rbcCount: "",
    notes: "",
  });

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

  const handleActionClick = (reportId) => {
    setIsAdding(isAdding === reportId ? null : reportId);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReportData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (reportId) => {
    try {
      await addDetailedReport(reportId, {
        ...newReportData,
        labReport: { reportId },
      });

      alert("Detailed report added successfully");

      setIsAdding(null);
      setNewReportData({
        plateletCount: "",
        hemoglobinLevel: "",
        wbcCount: "",
        rbcCount: "",
        notes: "",
      });

      fetchDetailedReports();
    } catch (error) {
      console.error("Error adding detailed report", error);
      alert("Failed to add detailed report");
    }
  };

  return (
    <div className="lab-details-page">
      <Navbar />
      <div className="lab-details-container">
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {labReports.length === 0 ? (
                <tr>
                  <td colSpan="7" className="no-reports-message">
                    No lab reports available.
                  </td>
                </tr>
              ) : (
                labReports.map((report) => (
                  <React.Fragment key={report.reportId}>
                    <tr>
                      <td data-label="Patient">{report.patient?.fullName || "N/A"}</td>
                      <td data-label="Test Type">{report.testType}</td>
                      <td data-label="Result Summary">{report.resultSummary}</td>
                      <td data-label="Sent to Lab">{report.sentToLab ? "Yes" : "No"}</td>
                      <td data-label="Technician">{report.labTechnician}</td>
                      <td data-label="Date">{report.reportDate}</td>
                      <td data-label="Action" className="action-cell">
                        <button
                          onClick={() => handleActionClick(report.reportId)}
                          className="action-button"
                          title="Add/View Action"
                        >
                          {isAdding === report.reportId ? "-" : "+"}
                        </button>
                      </td>
                    </tr>

                    {isAdding === report.reportId && (
                      <tr className="add-report-row">
                        <td colSpan="7" className="add-report-form-cell">
                          <form
                            onSubmit={(e) => {
                              e.preventDefault();
                              handleSubmit(report.reportId);
                            }}
                            className="add-report-form"
                          >
                            <div className="form-grid">
                              <input
                                type="text"
                                name="plateletCount"
                                placeholder="Platelet Count"
                                value={newReportData.plateletCount}
                                onChange={handleInputChange}
                                className="form-input"
                                required
                              />
                              <input
                                type="text"
                                name="hemoglobinLevel"
                                placeholder="Hemoglobin Level"
                                value={newReportData.hemoglobinLevel}
                                onChange={handleInputChange}
                                className="form-input"
                                required
                              />
                              <input
                                type="text"
                                name="wbcCount"
                                placeholder="WBC Count"
                                value={newReportData.wbcCount}
                                onChange={handleInputChange}
                                className="form-input"
                                required
                              />
                              <input
                                type="text"
                                name="rbcCount"
                                placeholder="RBC Count"
                                value={newReportData.rbcCount}
                                onChange={handleInputChange}
                                className="form-input"
                                required
                              />
                              <textarea
                                name="notes"
                                placeholder="Notes"
                                value={newReportData.notes}
                                onChange={handleInputChange}
                                className="form-textarea"
                                rows="3"
                              ></textarea>
                            </div>
                            <button type="submit" className="submit-button">
                              Add Report
                            </button>
                          </form>
                        </td>
                      </tr>
                    )}

                    {detailedReports
                      .filter((d) => d?.labReport?.reportId === report.reportId)
                      .map((detail, index) => (
                        <tr key={`detail-${index}`} className="detailed-report-row">
                          <td colSpan="7" className="detailed-report-cell">
                            <div className="detailed-report-content">
                              <strong>Platelet Count:</strong> {detail.plateletCount} |{" "}
                              <strong>Hemoglobin:</strong> {detail.hemoglobinLevel} |{" "}
                              <strong>WBC:</strong> {detail.wbcCount} |{" "}
                              <strong>RBC:</strong> {detail.rbcCount}
                              <br />
                              <strong>Notes:</strong> {detail.notes}
                            </div>
                          </td>
                        </tr>
                      ))}
                  </React.Fragment>
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