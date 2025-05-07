import React, { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import Navbar from "./NurseNavbar"; 

function AddLabReport() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    // Fetch patient list from backend
    axios.get("http://localhost:8080/api/patients")
      .then(res => setPatients(res.data))
      .catch(err => {
        console.error("Failed to fetch patients", err);
        alert("Could not load patient list.");
      });
  }, []);

  const formik = useFormik({
    initialValues: {
      selectedPatientId: "",
      testType: "",
      resultSummary: "",
      sentToLab: false,
      labTechnician: "",
      reportDate: ""
    },
    validationSchema: Yup.object({
      selectedPatientId: Yup.string().required("Please select a patient"),
      testType: Yup.string().required("Test type is required"),
      resultSummary: Yup.string().required("Result summary is required"),
      labTechnician: Yup.string().required("Lab technician is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        await axios.post(`http://localhost:8080/api/labreports/add/${values.selectedPatientId}`, {
          testType: values.testType,
          resultSummary: values.resultSummary,
          sentToLab: values.sentToLab,
          labTechnician: values.labTechnician,
          reportDate: values.reportDate || null
        });

        alert("Lab report submitted successfully");
        resetForm();
      } catch (error) {
        console.error("Error submitting lab report", error);
        alert("Failed to submit lab report");
      }
    },
  });

  return (
    <div className="max-w-lg mx-auto mt-10 p-4 shadow-lg bg-white rounded-lg">
        <Navbar />
      <h2 className="text-2xl font-bold mb-4">Add Lab Report</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">

        {/* Patient Dropdown */}
        <div>
          <label className="block font-medium">Select Patient</label>
          <select
            name="selectedPatientId"
            onChange={formik.handleChange}
            value={formik.values.selectedPatientId}
            className="w-full p-2 border rounded"
          >
            <option value="">-- Select a patient --</option>
            {patients.map((patient) => (
              <option key={patient.patientId} value={patient.patientId}>
                {patient.fullName}
              </option>
            ))}
          </select>
          {formik.errors.selectedPatientId && (
            <p className="text-red-500">{formik.errors.selectedPatientId}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Test Type</label>
          <input
            type="text"
            name="testType"
            onChange={formik.handleChange}
            value={formik.values.testType}
            className="w-full p-2 border rounded"
          />
          {formik.errors.testType && <p className="text-red-500">{formik.errors.testType}</p>}
        </div>

        <div>
          <label className="block font-medium">Result Summary</label>
          <textarea
            name="resultSummary"
            onChange={formik.handleChange}
            value={formik.values.resultSummary}
            className="w-full p-2 border rounded"
          />
          {formik.errors.resultSummary && <p className="text-red-500">{formik.errors.resultSummary}</p>}
        </div>

        <div>
          <label className="block font-medium">Lab Technician</label>
          <input
            type="text"
            name="labTechnician"
            onChange={formik.handleChange}
            value={formik.values.labTechnician}
            className="w-full p-2 border rounded"
          />
          {formik.errors.labTechnician && <p className="text-red-500">{formik.errors.labTechnician}</p>}
        </div>

        <div>
          <label className="block font-medium">Report Date (optional)</label>
          <input
            type="date"
            name="reportDate"
            onChange={formik.handleChange}
            value={formik.values.reportDate}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="sentToLab"
            onChange={formik.handleChange}
            checked={formik.values.sentToLab}
          />
          <label>Sent to Lab</label>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Report
        </button>
      </form>
    </div>
  );
}

export default AddLabReport;
