import axios from 'axios';

const LAB_REPORT_BASE_URL = "http://localhost:8080/api/labreports";


export const getAllLabReports = async () => {
  const response = await axios.get(`${LAB_REPORT_BASE_URL}/all`);
  return response.data;
};


export const getLabReportById = async (id) => {
  const response = await axios.get(`${LAB_REPORT_BASE_URL}/${id}`);
  return response.data;
};

export const addLabReport = async (patientId, reportData) => {
  const response = await axios.post(`${LAB_REPORT_BASE_URL}/add/${patientId}`, reportData);
  return response.data;
};

export const updateLabReport = async (id, updatedReport) => {
  const response = await axios.put(`${LAB_REPORT_BASE_URL}/update/${id}`, updatedReport);
  return response.data;
};

export const deleteLabReport = async (id) => {
  const response = await axios.delete(`${LAB_REPORT_BASE_URL}/delete/${id}`);
  return response.data;
};
