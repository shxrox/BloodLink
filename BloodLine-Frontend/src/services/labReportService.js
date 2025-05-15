import axios from "axios";

const BASE_URL = "http://localhost:8080/api/detailedreports";

export const getAllLabReports = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/all`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch lab reports");
  }
};



export const getDetailedReportByReportId = async (reportId) => {
  try {
    const response = await axios.get(`${BASE_URL}/${reportId}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch detailed report");
  }
};

export const updateDetailedReport = async (detailedReportId, updatedData) => {
  try {
    const response = await axios.put(`${BASE_URL}/update/${detailedReportId}`, updatedData);
    return response.data;
  } catch (error) {
    throw new Error("Failed to update detailed report");
  }
};


export const deleteDetailedReport = async (detailedReportId) => {
  try {
    await axios.delete(`${BASE_URL}/delete/${detailedReportId}`);
    return "Detailed report deleted successfully";
  } catch (error) {
    throw new Error("Failed to delete detailed report");
  }
};export const addDetailedReport = async (reportId, detailedReportData) => {
    try {
      const response = await axios.post(`${BASE_URL}/add/${reportId}`, detailedReportData);
      return response.data;
    } catch (error) {
      throw new Error("Failed to add detailed report");
    }
  };
