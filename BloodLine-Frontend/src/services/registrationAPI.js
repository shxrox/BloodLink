import axios from 'axios';

const url = "http://localhost:8080/registration";

export const getRegistrations = async () => {
    const response = await axios.get(url);
    return response.data;
};

export const getRegistrationById = async (id) => {
    const response = await axios.get(`${url}/${id}`);
    return response.data;
};

export const addRegistration = async (registrationData) => {
    const response = await axios.post(url, registrationData); // fixed here
    return response.data;
};

export const updateRegistration = async (id, registration) => {
    const response = await axios.put(`${url}/${id}`, registration);
    return response.data;
};

export const deleteRegistration = async (id) => {
    const response = await axios.delete(`${url}/${id}`);
    return response.data;
};

