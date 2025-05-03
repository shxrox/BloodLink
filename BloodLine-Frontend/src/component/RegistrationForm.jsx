import { useState } from "react";
import { addRegistration } from "../services/registrationAPI";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile_num, setMobileNum] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("NURSE");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addRegistration({
      name,
      email,
      mobile_num,
      password,
      role,
    });

    navigate("/");
  };

  return (
    <>
      <h1>BloodLink Registration</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Mobile Number"
          value={mobile_num}
          onChange={(e) => setMobileNum(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="NURSE">Nurse</option>
          <option value="DOCTOR">Doctor</option>
          <option value="LABTECH">Lab Technician</option>
        </select>
        <button type="submit">Register</button>
        <button type="button" onClick={() => navigate("/")}>Cancel</button>
      </form>
    </>
  );
};

export default RegistrationForm;
