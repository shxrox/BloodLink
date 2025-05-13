import React, { useEffect, useState } from "react";
import Navbar from "../doctor/DoctorNavbar";
import { getAllLabReports } from "../../../services/labReportService";

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
              </tr>
            </thead>
            <tbody>
              {detailedReports.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
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
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Labdetails;
