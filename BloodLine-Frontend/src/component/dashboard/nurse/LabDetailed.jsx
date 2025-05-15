import React, { useEffect, useState } from "react";
import Navbar from "./NurseNavbar";
import { getAllLabReports } from "../../../services/labReportService";
import Footer from '../../Footer';

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
            h2 { text-align: center; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            td, th { border: 1px solid #ccc; padding: 8px; text-align: left; }
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
    <div>
      <Navbar />
      <div className="p-6">
        {/* Submitted Lab Reports Table */}
        <h1 className="text-2xl font-semibold mb-4">Submitted Lab Reports</h1>
        <div className="overflow-x-auto mb-10">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">Patient</th>
                <th className="border px-4 py-2">Test Type</th>
                <th className="border px-4 py-2">Result Summary</th>
                <th className="border px-4 py-2">Sent to Lab</th>
                <th className="border px-4 py-2">Technician</th>
                <th className="border px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {labReports.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No lab reports available.
                  </td>
                </tr>
              ) : (
                labReports.map((report) => (
                  <tr key={report.reportId}>
                    <td className="border px-4 py-2">{report.patient?.fullName || "N/A"}</td>
                    <td className="border px-4 py-2">{report.testType}</td>
                    <td className="border px-4 py-2">{report.resultSummary}</td>
                    <td className="border px-4 py-2">{report.sentToLab ? "Yes" : "No"}</td>
                    <td className="border px-4 py-2">{report.labTechnician}</td>
                    <td className="border px-4 py-2">{report.reportDate}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Detailed Lab Reports Table */}
        <h2 className="text-2xl font-semibold mb-4">Detailed Lab Reports</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">Patient</th>
                <th className="border px-4 py-2">Platelet</th>
                <th className="border px-4 py-2">Hemoglobin</th>
                <th className="border px-4 py-2">WBC</th>
                <th className="border px-4 py-2">RBC</th>
                <th className="border px-4 py-2">Notes</th>
                <th className="border px-4 py-2">Print</th>
              </tr>
            </thead>
            <tbody>
              {detailedReports.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-gray-500">
                    No detailed reports available.
                  </td>
                </tr>
              ) : (
                detailedReports.map((detail, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{detail.labReport?.patient?.fullName || "N/A"}</td>
                    <td className="border px-4 py-2">{detail.plateletCount}</td>
                    <td className="border px-4 py-2">{detail.hemoglobinLevel}</td>
                    <td className="border px-4 py-2">{detail.wbcCount}</td>
                    <td className="border px-4 py-2">{detail.rbcCount}</td>
                    <td className="border px-4 py-2">{detail.notes}</td>
                    <td className="border px-4 py-2 text-center">
                      <button
                        onClick={() => handlePrint(detail)}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
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
