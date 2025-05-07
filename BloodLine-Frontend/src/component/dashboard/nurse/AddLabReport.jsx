import React, { useState, useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import Navbar from "./NurseNavbar"; 


const AddLabReport = () => {
  const [patients, setPatients] = useState([]);
  const [labReports, setLabReports] = useState([]);
  const [editingReportId, setEditingReportId] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8080/api/patients")
      .then((res) => setPatients(res.data))
      .catch((err) => console.error("Failed to fetch patients:", err));
  }, []);

  const loadLabReports = () => {
    axios.get("http://localhost:8080/api/labreports/all")
      .then((res) => setLabReports(res.data))
      .catch((err) => console.error("Failed to fetch lab reports:", err));
  };

  useEffect(() => {
    loadLabReports();
  }, []);

  const formik = useFormik({
    initialValues: {
      patientId: "",
      testType: "",
      resultSummary: "",
      sentToLab: false,
      reportDate: "",
      labTechnician: "",
    },
    validationSchema: Yup.object({
      patientId: Yup.string().required("Patient is required."),
      testType: Yup.string().required("Test type is required."),
      resultSummary: Yup.string().required("Result summary is required."),
      reportDate: Yup.date().required("Report date is required."),
      labTechnician: Yup.string().required("Lab technician is required."),
    }),
    onSubmit: async (values) => {
      try {
        if (editingReportId) {
          await axios.put(`http://localhost:8080/api/labreports/update/${editingReportId}`, values);
          alert("Lab report updated successfully!");
        } else {
          await axios.post(`http://localhost:8080/api/labreports/add/${values.patientId}`, values);
          alert("Lab report added successfully!");
        }
        formik.resetForm();
        setEditingReportId(null);
        loadLabReports();
      } catch (error) {
        console.error("Error saving lab report:", error);
        alert("Failed to save lab report.");
      }
    },
  });

  const handleEdit = (report) => {
    setEditingReportId(report.reportId);
    formik.setValues({
      patientId: report.patient?.patientId || "",
      testType: report.testType,
      resultSummary: report.resultSummary,
      sentToLab: report.sentToLab,
      reportDate: report.reportDate,
      labTechnician: report.labTechnician,
    });
  };

  const handleDelete = async (reportId) => {
    if (window.confirm("Are you sure you want to delete this report?")) {
      try {
        await axios.delete(`http://localhost:8080/api/labreports/delete/${reportId}`);
        alert("Lab report deleted.");
        loadLabReports();
      } catch (error) {
        console.error("Delete failed:", error);
        alert("Failed to delete lab report.");
      }
    }
  };

  return (
    <div className="p-4">
        <Navbar />
      <h2 className="text-xl font-semibold mb-4">
        {editingReportId ? "Edit Lab Report" : "Add Lab Report"}
      </h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4 bg-white p-4 shadow rounded">
        <div>
          <label>Patient:</label>
          <select
            name="patientId"
            value={formik.values.patientId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block w-full p-2 border border-gray-300 rounded"
          >
            <option value="">-- Select Patient --</option>
            {patients.map((p) => (
              <option key={p.patientId} value={p.patientId}>
                {p.fullName}
              </option>
            ))}
          </select>
          {formik.touched.patientId && formik.errors.patientId && (
            <div className="text-red-500 text-sm">{formik.errors.patientId}</div>
          )}
        </div>

        <div>
          <label>Test Type:</label>
          <input
            type="text"
            name="testType"
            value={formik.values.testType}
            onChange={formik.handleChange}
            className="block w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label>Result Summary:</label>
          <textarea
            name="resultSummary"
            value={formik.values.resultSummary}
            onChange={formik.handleChange}
            className="block w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              name="sentToLab"
              checked={formik.values.sentToLab}
              onChange={formik.handleChange}
              className="mr-2"
            />
            Sent to Lab
          </label>
        </div>

        <div>
          <label>Report Date:</label>
          <input
            type="date"
            name="reportDate"
            value={formik.values.reportDate}
            onChange={formik.handleChange}
            className="block w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label>Lab Technician:</label>
          <input
            type="text"
            name="labTechnician"
            value={formik.values.labTechnician}
            onChange={formik.handleChange}
            className="block w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {editingReportId ? "Update" : "Add"} Lab Report
        </button>

        {editingReportId && (
          <button
            type="button"
            onClick={() => {
              formik.resetForm();
              setEditingReportId(null);
            }}
            className="ml-2 bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        )}
      </form>

      {/* Table */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Lab Reports</h3>
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
                <th className="border px-4 py-2">Actions</th>
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
                  <td className="border px-4 py-2 space-x-2">
                    <button
                      onClick={() => handleEdit(report)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(report.reportId)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {labReports.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    No lab reports found.
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

export default AddLabReport;
