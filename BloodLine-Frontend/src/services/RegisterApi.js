import axios from "axios";

const API_URL = "http://localhost:8080/api/register";  // Ensure this is correct!

export const registerUser = async (formData) => {
  try {
    const response = await axios.post(API_URL, formData);  // POST request!
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;  // Handle backend errors properly
    } else {
      throw { general: "Something went wrong" };
    }
  }
};
