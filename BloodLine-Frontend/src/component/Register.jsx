// src/components/Register.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import { registerUser } from "../services/RegisterApi";  // Axios request

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile_num: "",
    password: "",
    confirmPassword: "",
    role: "DOCTOR",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const navigate = useNavigate();  // Initialize useNavigate

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setMessage("");

    try {
      const response = await registerUser(form);
      setMessage(response.message);

      // Redirect based on the role
      if (response.role === "DOCTOR") {
        navigate("/dashboard/doctor");
      } else if (response.role === "NURSE") {
        navigate("/dashboard/nurse");
      } else if (response.role === "LABTECH") {
        navigate("/dashboard/lab");
      }
    } catch (error) {
      setErrors(error);
    }
  };

  return (
    <div className="register-form">
      <h2>Register</h2>
      {message && <p style={{ color: "green" }}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
        />
        {errors.name && <p>{errors.name}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        {errors.email && <p>{errors.email}</p>}

        <input
          type="text"
          name="mobile_num"
          placeholder="Mobile Number"
          value={form.mobile_num}
          onChange={handleChange}
        />
        {errors.mobile_num && <p>{errors.mobile_num}</p>}

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        {errors.password && <p>{errors.password}</p>}

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}

        <select name="role" value={form.role} onChange={handleChange}>
          <option value="DOCTOR">Doctor</option>
          <option value="NURSE">Nurse</option>
          <option value="LABTECH">Lab Technician</option>
        </select>
        {errors.role && <p>{errors.role}</p>}

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
