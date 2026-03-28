import { Routes, Route } from 'react-router-dom';
import RegistrationForm from './component/registrationform';
import LoginForm from './component/login';
import Doctor from './component/dashboard/doctor/doctor';
import Lab from './component/dashboard/lab/lab';
import PatientRegister from "./component/dashboard/nurse/patientregister";
import PatientDetails from "./component/dashboard/doctor/patientdetails";
import PatientQueue from "./component/dashboard/nurse/patientqueue";
import Home from './component/home';
import PatientChecking from "./component/dashboard/doctor/labdetailed";
import AddLabReport from "./component/dashboard/nurse/addlabreport";
import LabInfo from './component/dashboard/lab/labsubmitinfo';
import LabDetails from './component/dashboard/lab/labdetails';
import NurseLabDetails from './component/dashboard/nurse/labdetailed';
import PatientDescription from './component/dashboard/doctor/doctordescription';
import MedicineManagement from './component/dashboard/doctor/medicinemanagement';
import ManagementDoc from './component/dashboard/doctor/accountmanagement';
import ManagementLab from './component/dashboard/lab/accountmanagement';
import ManagementNurse from './component/dashboard/nurse/accountmanagement';
import AboutDoctor from './component/dashboard/doctor/about';
import AboutLab from './component/dashboard/lab/about';
import AboutNurse from './component/dashboard/nurse/about';
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