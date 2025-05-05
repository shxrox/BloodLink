import { Routes, Route } from 'react-router-dom';
import RegistrationForm from './component/RegistrationForm';
import LoginForm from './component/Login';
import Nurse from './component/dashboard/Nurse/nurse';
import Doctor from './component/dashboard/doctor/doctor';
import Lab from './component/dashboard/lab/lab';
import Patientregister from "./component/dashboard/nurse/Patientregister";
import Patientdetails from "./component/dashboard/doctor/Patientdetails";
function App() {
  return (
    <Routes>
      <Route path="/registration" element={<RegistrationForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/dashboard/nurse" element={<Nurse />} />
      <Route path="/dashboard/doctor" element={<Doctor />} />
      <Route path="/dashboard/lab" element={<Lab />} />
      <Route path="/dashboard/nurse/patient-register" element={<Patientregister />} />
      <Route path="/dashboard/doctor/patient-details" element={<Patientdetails />} />
    </Routes>
  );
}

export default App;
