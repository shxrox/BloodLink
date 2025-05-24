import React, { useState, useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import Navbar from "./NurseNavbar";
import Footer from '../../Footer';
import "../../../style/AddLabReport.css";


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
    <div className="add-lab-report-page">
      <Navbar />
      <div className="add-lab-report-container">
        <h2 className="form-title">
          {editingReportId ? "Edit Lab Report" : "Add Lab Report"}
        </h2>
        <form onSubmit={formik.handleSubmit} className="lab-report-form">
          <div className="form-group">
            <label htmlFor="patientId" className="form-label">Patient:</label>
            <select
              id="patientId"
              name="patientId"
              value={formik.values.patientId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="form-input"
            >
              <option value="">-- Select Patient --</option>
              {patients.map((p) => (
                <option key={p.patientId} value={p.patientId}>
                  {p.fullName}
                </option>
              ))}
            </select>
            {formik.touched.patientId && formik.errors.patientId && (
              <div className="error-message">{formik.errors.patientId}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="testType" className="form-label">Test Type:</label>
            <input
              type="text"
              id="testType"
              name="testType"
              value={formik.values.testType}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="form-input"
            />
            {formik.touched.testType && formik.errors.testType && (
              <div className="error-message">{formik.errors.testType}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="resultSummary" className="form-label">Result Summary:</label>
            <textarea
              id="resultSummary"
              name="resultSummary"
              value={formik.values.resultSummary}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="form-input textarea-input"
            />
            {formik.touched.resultSummary && formik.errors.resultSummary && (
              <div className="error-message">{formik.errors.resultSummary}</div>
            )}
          </div>

          <div className="form-group checkbox-group">
            <input
              type="checkbox"
              id="sentToLab"
              name="sentToLab"
              checked={formik.values.sentToLab}
              onChange={formik.handleChange}
              className="form-checkbox"
            />
            <label htmlFor="sentToLab" className="form-label-inline">Sent to Lab</label>
          </div>

          <div className="form-group">
            <label htmlFor="reportDate" className="form-label">Report Date:</label>
            <input
              type="date"
              id="reportDate"
              name="reportDate"
              value={formik.values.reportDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="form-input"
            />
            {formik.touched.reportDate && formik.errors.reportDate && (
              <div className="error-message">{formik.errors.reportDate}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="labTechnician" className="form-label">Lab Technician:</label>
            <input
              type="text"
              id="labTechnician"
              name="labTechnician"
              value={formik.values.labTechnician}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="form-input"
            />
            {formik.touched.labTechnician && formik.errors.labTechnician && (
              <div className="error-message">{formik.errors.labTechnician}</div>
            )}
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn">
              {editingReportId ? "Update" : "Add"} Lab Report
            </button>

            {editingReportId && (
              <button
                type="button"
                onClick={() => {
                  formik.resetForm();
                  setEditingReportId(null);
                }}
                className="cancel-btn"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <hr className="divider" />

        <div className="lab-reports-list-section">
          <h3 className="list-title">Existing Lab Reports</h3>
          <div className="table-scroll-wrapper">
            <table className="lab-reports-table"></table>
            <table className="lab-reports-table">
              <thead className="table-header">
                <tr>
                  <th>Patient</th>
                  <th>Test Type</th>
                  <th>Result Summary</th>
                  <th>Sent to Lab</th>
                  <th>Technician</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {labReports.map((report) => (
                  <tr key={report.reportId}>
                    <td data-label="Patient">{report.patient?.fullName || "N/A"}</td>
                    <td data-label="Test Type">{report.testType}</td>
                    <td data-label="Result Summary">{report.resultSummary}</td>
                    <td data-label="Sent to Lab">{report.sentToLab ? "Yes" : "No"}</td>
                    <td data-label="Technician">{report.labTechnician}</td>
                    <td data-label="Date">{report.reportDate}</td>
                    <td data-label="Actions" className="action-buttons-cell">
                      <button
                        onClick={() => handleEdit(report)}
                        className="edit-btn"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(report.reportId)}
                        className="delete-btn"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {labReports.length === 0 && (
                  <tr>
                    <td colSpan="7" className="no-reports-message">
                      No lab reports found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddLabReport;