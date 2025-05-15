import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/medicines';

const MedicineService = {
  addMedicine: (patientId, medicine) => {
    return axios.post(`${BASE_URL}/${patientId}`, medicine);
  },

  getByPatient: (patientId) => {
    return axios.get(`${BASE_URL}/patient/${patientId}`);
  },

  getAll: () => {
    return axios.get(BASE_URL);
  },

  updateMedicine: (id, updatedMedicine) => {
    return axios.put(`${BASE_URL}/${id}`, updatedMedicine);
  },

  deleteMedicine: (id) => {
    return axios.delete(`${BASE_URL}/${id}`);
  }
};

export default MedicineService;
