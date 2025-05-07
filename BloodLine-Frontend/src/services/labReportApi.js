import axios from 'axios';

const LAB_REPORT_BASE_URL = "http://localhost:8080/api/labreports";

// Get all lab reports
export const getAllLabReports = async () => {
  const response = await axios.get(`${LAB_REPORT_BASE_URL}/all`);
  return response.data;
};

// Get lab report by ID
export const getLabReportById = async (id) => {
  const response = await axios.get(`${LAB_REPORT_BASE_URL}/${id}`);
  return response.data;
};

// Add a new lab report for a patient
export const addLabReport = async (patientId, reportData) => {
  const response = await axios.post(`${LAB_REPORT_BASE_URL}/add/${patientId}`, reportData);
  return response.data;
};

// Update a lab report
export const updateLabReport = async (id, updatedReport) => {
  const response = await axios.put(`${LAB_REPORT_BASE_URL}/update/${id}`, updatedReport);
  return response.data;
};

// Delete a lab report
export const deleteLabReport = async (id) => {
  const response = await axios.delete(`${LAB_REPORT_BASE_URL}/delete/${id}`);
  return response.data;
};
