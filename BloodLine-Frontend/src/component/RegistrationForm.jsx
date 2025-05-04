import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addRegistration } from "../services/registrationAPI";
import '../style/RegistrationForm.css';



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
        // Await the registration API call
        await addRegistration(values);

        // Show success message
        alert("Registration successful!");

        // Redirect to the homepage or another page after success
        navigate("/");
      } catch (error) {
        // Handle error (optional)
        alert("Registration failed. Please try again.");
      }
    },
  });

  return (
    <>
      <h1>BloodLink Registration</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="error">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name && (
            <div>{formik.errors.name}</div>
          )}
        </div>

        <div className="error">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <div>{formik.errors.email}</div>
          )}
        </div>

        <div className="error">
          <input
            type="text"
            name="mobile_num"
            placeholder="Mobile Number"
            value={formik.values.mobile_num}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.mobile_num && formik.errors.mobile_num && (
            <div>{formik.errors.mobile_num}</div>
          )}
        </div>

        <div className="error">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && (
            <div>{formik.errors.password}</div>
          )}
        </div>

        <div className="error">
          <input

            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <div>{formik.errors.confirmPassword}</div>
          )}
        </div>

        <div>
          <select
            name="role"
            value={formik.values.role}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="NURSE">Nurse</option>
            <option value="DOCTOR">Doctor</option>
            <option value="LABTECH">Lab Technician</option>
          </select>
          {formik.touched.role && formik.errors.role && (
            <div>{formik.errors.role}</div>
          )}
        </div>

        {/* <div>
          <button type="submit">Register</button>
          <button type="button" onClick={() => formik.resetForm()}>Clear</button>
        </div> */}
<div>
  <button
    type="button"
    onClick={async () => {
      const isValid = await formik.validateForm();
      formik.setTouched({
        name: true,
        email: true,
        mobile_num: true,
        password: true,
        confirmPassword: true,
        role: true,
      });

      if (Object.keys(isValid).length === 0) {
        try {
          await addRegistration(formik.values);
          alert("Registration successful!");
          navigate("/login");
        } catch (error) {
          alert("Registration failed. Please try again.");
        }
      }
    }}
  >
    Register
  </button>

  <button type="button" onClick={() => formik.resetForm()}>Clear</button>
</div>

      </form>
    </>
  );
};

export default RegistrationForm;
