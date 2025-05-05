import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/patients'; 

// Add new patient
export const addPatient = async (patientData) => {
    try {
        const response = await axios.post(BASE_URL, patientData);
        return response.data;
    } catch (error) {
        console.error('Error adding patient:', error);
        throw error;
    }
};

// Get all patients
export const getPatients = async () => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching patients:', error);
        throw error;
    }
};

// Get patient by ID
export const getPatientById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching patient by ID:', error);
        throw error;
    }
};

// Update patient by ID
export const updatePatient = async (id, updatedData) => {
    try {
        const response = await axios.put(`${BASE_URL}/${id}`, updatedData);
        return response.data;
    } catch (error) {
        console.error('Error updating patient:', error);
        throw error;
    }
};

// Delete patient by ID
export const deletePatient = async (id) => {
    try {
        await axios.delete(`${BASE_URL}/${id}`);
    } catch (error) {
        console.error('Error deleting patient:', error);
        throw error;
    }
};
