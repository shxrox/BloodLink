
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/doctor-descriptions';

const DoctorDescriptionService = {
  addDescription: (patientId, description) => {
    return axios.post(`${BASE_URL}/${patientId}`, description);
  },

  getByPatient: (patientId) => {
    return axios.get(`${BASE_URL}/patient/${patientId}`);
  },

  getAll: () => {
    return axios.get(BASE_URL);
  },

  updateDescription: (id, updatedDescription) => {
    return axios.put(`${BASE_URL}/${id}`, updatedDescription);
  },

  deleteDescription: (id) => {
    return axios.delete(`${BASE_URL}/${id}`);
  }
};

export default DoctorDescriptionService;
