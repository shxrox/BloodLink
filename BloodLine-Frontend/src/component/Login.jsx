import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../style/login.css"; 


const LoginForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    }),

    onSubmit: async (values) => {
      setError("");

      try {
        const response = await axios.post("http://localhost:8080/auth/login", values);
        const message = response.data;

        alert(message); 

        if (message.includes("Nurse")) {
          navigate("/dashboard/nurse");
        } else if (message.includes("Doctor")) {
          navigate("/dashboard/doctor");
        } else if (message.includes("Lab Technician")) {
          navigate("/dashboard/lab");
        } else {
    
          navigate("/");
        }
      } catch (err) {
        if (err.response && err.response.status === 401) {
          setError(err.response.data);
        } else {
          setError("Something went wrong. Please try again.");
        }
      }
    },
  });

  return (
    <div className="login-page">
      <div className="login-container">
        <h1 className="login-title">Login to BloodLink</h1>
        <form onSubmit={formik.handleSubmit} className="login-form">
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className={`form-input ${formik.touched.email && formik.errors.email ? 'input-error' : ''}`}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="error-message">{formik.errors.email}</p>
            )}
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className={`form-input ${formik.touched.password && formik.errors.password ? 'input-error' : ''}`}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="error-message">{formik.errors.password}</p>
            )}
          </div>

          {error && <p className="api-error-message">{error}</p>}

          <button type="submit" className="login-btn">Login</button>
        </form>

        <p className="register-prompt">
          Don't have an account?{" "}
          <span className="register-link" onClick={() => navigate("/registration")}>
            Register here
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;