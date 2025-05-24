import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addRegistration } from "../services/RegistrationAPI";
import '../style/registrationForm.css'; 

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  mobile_num: Yup.string()
    .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
    .required("Mobile number is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], "Passwords must match")
    .required("Confirm password is required"),
  role: Yup.string().required("Role is required")
});

const RegistrationForm = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile_num: "",
      password: "",
      confirmPassword: "",
      role: "NURSE", 
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await addRegistration(values);
        alert("Registration successful! You can now log in.");
        navigate("/login"); 
      } catch (error) {
        console.error("Registration failed:", error);
        alert("Registration failed. Please try again. (Email might already be registered)");
      }
    },
  });

  return (
    <div className="registration-page">
      <div className="registration-container">
        <h1 className="registration-title">BloodLink Registration</h1>
        <form onSubmit={formik.handleSubmit} className="registration-form">
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`form-input ${formik.touched.name && formik.errors.name ? 'input-error' : ''}`}
            />
            {formik.touched.name && formik.errors.name && (
              <div className="error-message">{formik.errors.name}</div>
            )}
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`form-input ${formik.touched.email && formik.errors.email ? 'input-error' : ''}`}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="error-message">{formik.errors.email}</div>
            )}
          </div>

          <div className="form-group">
            <input
              type="text"
              name="mobile_num"
              placeholder="Mobile Number (e.g., 0712345678)"
              value={formik.values.mobile_num}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`form-input ${formik.touched.mobile_num && formik.errors.mobile_num ? 'input-error' : ''}`}
            />
            {formik.touched.mobile_num && formik.errors.mobile_num && (
              <div className="error-message">{formik.errors.mobile_num}</div>
            )}
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`form-input ${formik.touched.password && formik.errors.password ? 'input-error' : ''}`}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="error-message">{formik.errors.password}</div>
            )}
          </div>

          <div className="form-group">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`form-input ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'input-error' : ''}`}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <div className="error-message">{formik.errors.confirmPassword}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="role" className="form-label">Registering as:</label>
            <select
              id="role"
              name="role"
              value={formik.values.role}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`form-select ${formik.touched.role && formik.errors.role ? 'input-error' : ''}`}
            >
              <option value="NURSE">Nurse</option>
              <option value="DOCTOR">Doctor</option>
              <option value="LABTECH">Lab Technician</option>
            </select>
            {formik.touched.role && formik.errors.role && (
              <div className="error-message">{formik.errors.role}</div>
            )}
          </div>

          <div className="form-actions">
            <button type="submit" className="register-btn">Register</button>
            <button type="button" onClick={formik.resetForm} className="clear-btn">Clear</button>
          </div>
        </form>

        <p className="login-prompt">
          Already have an account? <span className="login-link" onClick={() => navigate("/login")}>Login here</span>
        </p>
      </div>
    </div>
  );
};

export default RegistrationForm;