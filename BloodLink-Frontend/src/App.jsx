import { Routes, Route } from 'react-router-dom';
import RegistrationForm from './component/RegistrationForm';
import LoginForm from './component/Login';
import Doctor from './component/dashboard/doctor/doctor';
import Lab from './component/dashboard/lab/lab';
import PatientRegister from "./component/dashboard/nurse/Patientregister";
import PatientDetails from "./component/dashboard/doctor/Patientdetails";
import PatientQueue from "./component/dashboard/nurse/PatientQueue";
import Home from './component/Home';
import PatientChecking from "./component/dashboard/doctor/LabDetailed";
import AddLabReport from "./component/dashboard/nurse/AddLabReport";
import LabInfo from './component/dashboard/lab/LabSubmitInfo';
import LabDetails from './component/dashboard/lab/Labdetails';
import NurseLabDetails from './component/dashboard/nurse/LabDetailed';
import PatientDescription from './component/dashboard/doctor/DoctorDescription';
import MedicineManagement from './component/dashboard/doctor/MedicineManagement';
import ManagementDoc from './component/dashboard/doctor/AccountManagement';
import ManagementLab from './component/dashboard/lab/AccountManagement';
import ManagementNurse from './component/dashboard/nurse/AccountManagement';
import AboutDoctor from './component/dashboard/doctor/About';
import AboutLab from './component/dashboard/lab/About';
import AboutNurse from './component/dashboard/nurse/About';
import Nurse from './component/dashboard/nurse/nurse';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/registration" element={<RegistrationForm />} />

      {/* Nurse Routes */}
      <Route path="/dashboard/nurse" element={<Nurse />} />
      <Route path="/dashboard/nurse/patient-register" element={<PatientRegister />} />
      <Route path="/dashboard/nurse/patient-labreport" element={<AddLabReport />} />
      <Route path="/dashboard/nurse/patient-queue" element={<PatientQueue />} />
      <Route path="/dashboard/nurse/lab-cheking" element={<NurseLabDetails />} />
      <Route path="/dashboard/nurse/staff" element={<ManagementNurse />} />
      <Route path="/dashboard/nurse/about" element={<AboutNurse />} />

      {/* Doctor Routes */}
      <Route path="/dashboard/doctor" element={<Doctor />} />
      <Route path="/dashboard/doctor/patient-details" element={<PatientDetails />} />
      <Route path="/dashboard/doctor/petient-cheking" element={<PatientChecking />} />
      <Route path="/dashboard/doctor/petient-description" element={<PatientDescription />} />
      <Route path="/dashboard/doctor/petient-medicine" element={<MedicineManagement />} />
      <Route path="/dashboard/doctor/staff" element={<ManagementDoc />} />
      <Route path="/dashboard/doctor/about" element={<AboutDoctor />} />

      {/* Lab Routes */}
      <Route path="/dashboard/lab" element={<Lab />} />
      <Route path="/dashboard/lab/lab-details" element={<LabInfo />} />
      <Route path="/dashboard/lab/lab-cheking" element={<LabDetails />} />
      <Route path="/dashboard/lab/staff" element={<ManagementLab />} />
      <Route path="/dashboard/lab/about" element={<AboutLab />} />
    </Routes>
  );
}

export default App;