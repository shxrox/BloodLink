import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./LabNavbar";

const LabSubmitInfo = () => {
  const [labReports, setLabReports] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/labreports/all")
      .then((res) => setLabReports(res.data))
      .catch((err) => console.error("Failed to fetch lab reports:", err));
  }, []);

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
              </tr>
            </thead>
            <tbody>
              {labReports.map((report) => (
                <tr key={report.reportId}>
                  <td className="border px-4 py-2">{report.patient?.fullName || "N/A"}</td>
                  <td className="border px-4 py-2">{report.testType}</td>
                  <td className="border px-4 py-2">{report.resultSummary}</td>
                  <td className="border px-4 py-2">{report.sentToLab ? "Yes" : "No"}</td>
                  <td className="border px-4 py-2">{report.labTechnician}</td>
                  <td className="border px-4 py-2">{report.reportDate}</td>
                </tr>
              ))}
              {labReports.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    No lab reports available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LabSubmitInfo;
