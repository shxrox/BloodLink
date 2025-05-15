import React, { useEffect, useState } from "react";
import Navbar from "./LabNavbar";
import Footer from '../../Footer';

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
      const data = await getAllLabReports(); // Calls /api/detailedreports/all
      console.log("Fetched detailed reports:", data);
      setDetailedReports(data);
    } catch (error) {
      console.error("Error fetching detailed reports", error);
    }
  };

  const handleActionClick = (reportId) => {
    setIsAdding(reportId);
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

      // Reset form
      setIsAdding(null);
      setNewReportData({
        plateletCount: "",
        hemoglobinLevel: "",
        wbcCount: "",
        rbcCount: "",
        notes: "",
      });

      fetchDetailedReports(); // Refresh the table
    } catch (error) {
      console.error("Error adding detailed report", error);
      alert("Failed to add detailed report");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Submitted Lab Reports</h1>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">Patient</th>
                <th className="border px-4 py-2">Test Type</th>
                <th className="border px-4 py-2">Result Summary</th>
                <th className="border px-4 py-2">Sent to Lab</th>
                <th className="border px-4 py-2">Technician</th>
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {labReports.map((report) => (
                <React.Fragment key={report.reportId}>
                  <tr>
                    <td className="border px-4 py-2">{report.patient?.fullName || "N/A"}</td>
                    <td className="border px-4 py-2">{report.testType}</td>
                    <td className="border px-4 py-2">{report.resultSummary}</td>
                    <td className="border px-4 py-2">{report.sentToLab ? "Yes" : "No"}</td>
                    <td className="border px-4 py-2">{report.labTechnician}</td>
                    <td className="border px-4 py-2">{report.reportDate}</td>
                    <td className="border px-4 py-2 text-center">
                      <button
                        onClick={() => handleActionClick(report.reportId)}
                        className="text-green-600 text-xl hover:text-green-800"
                        title="Add/View Action"
                      >
                        +
                      </button>
                    </td>
                  </tr>

                  {/* Input Form */}
                  {isAdding === report.reportId && (
                    <tr>
                      <td colSpan="7" className="p-4 bg-gray-50">
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit(report.reportId);
                          }}
                        >
                          <div className="grid grid-cols-2 gap-4">
                            <input
                              type="text"
                              name="plateletCount"
                              placeholder="Platelet Count"
                              value={newReportData.plateletCount}
                              onChange={handleInputChange}
                              className="border p-2"
                              required
                            />
                            <input
                              type="text"
                              name="hemoglobinLevel"
                              placeholder="Hemoglobin Level"
                              value={newReportData.hemoglobinLevel}
                              onChange={handleInputChange}
                              className="border p-2"
                              required
                            />
                            <input
                              type="text"
                              name="wbcCount"
                              placeholder="WBC Count"
                              value={newReportData.wbcCount}
                              onChange={handleInputChange}
                              className="border p-2"
                              required
                            />
                            <input
                              type="text"
                              name="rbcCount"
                              placeholder="RBC Count"
                              value={newReportData.rbcCount}
                              onChange={handleInputChange}
                              className="border p-2"
                              required
                            />
                            <textarea
                              name="notes"
                              placeholder="Notes"
                              value={newReportData.notes}
                              onChange={handleInputChange}
                              className="border p-2 col-span-2"
                              rows="3"
                            ></textarea>
                          </div>
                          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                            Add Report
                          </button>
                        </form>
                      </td>
                    </tr>
                  )}

                  {/* Show associated detailed report(s) */}
                  {detailedReports
                    .filter((d) => d?.labReport?.reportId === report.reportId)
                    .map((detail, index) => (
                      <tr key={`detail-${index}`}>
                        <td colSpan="7" className="p-2 bg-gray-100">
                          <div className="text-sm">
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
              ))}
              {labReports.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-gray-500">
                    No lab reports available.
                  </td>
                </tr>
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
