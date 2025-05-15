import { Routes, Route } from 'react-router-dom';
import RegistrationForm from './component/RegistrationForm';
import LoginForm from './component/Login';
import Nurse from './component/dashboard/Nurse/nurse';
import Doctor from './component/dashboard/doctor/doctor';
import Lab from './component/dashboard/lab/lab';
import Patientregister from "./component/dashboard/nurse/Patientregister";
import Patientdetails from "./component/dashboard/doctor/Patientdetails";
import Patientqueue from "./component/dashboard/nurse/PatientQueue";
import Home from './component/Home';
import Patientcheking from "./component/dashboard/doctor/LabDetailed";
import AbbLab from "./component/dashboard/nurse/AddLabReport";
import LabInfo from './component/dashboard/lab/LabSubmitInfo';
import Labdetails from './component/dashboard/lab/Labdetails';
import NurseLabDatils from './component/dashboard/nurse/LabDetailed';
import PetientDescription from './component/dashboard/doctor/DoctorDescription';
import Medicine from './component/dashboard/doctor/MedicineManagement';
import ManagementDoc from './component/dashboard/doctor/AccountManagement';
import ManagementLab from './component/dashboard/lab/AccountManagement';
import ManagementNurse from './component/dashboard/nurse/AccountManagement';
import AboutD from './component/dashboard/doctor/About';
import AboutL from './component/dashboard/lab/About';
import AboutN from './component/dashboard/nurse/About';


function App() {
  return (
    <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/registration" element={<RegistrationForm />} />


      <Route path="/dashboard/nurse" element={<Nurse />} />
      <Route path="/dashboard/nurse/patient-register" element={<Patientregister />} />
      <Route path="/dashboard/nurse/patient-labreport" element={<AbbLab />} />
      <Route path="/dashboard/nurse/patient-queue" element={<Patientqueue />} />
      <Route path="/dashboard/nurse/lab-cheking" element={<NurseLabDatils />} />
      <Route path="/dashboard/nurse/staff" element={<ManagementNurse />} />
      <Route path="/dashboard/nurse/about" element={<AboutN />} />


      <Route path="/dashboard/doctor" element={<Doctor />} />
      <Route path="/dashboard/doctor/patient-details" element={<Patientdetails />} />
      <Route path="/dashboard/doctor/petient-cheking" element={<Patientcheking />} />
      <Route path="/dashboard/doctor/petient-description" element={<PetientDescription />} />
      <Route path="/dashboard/doctor/petient-medicine" element={<Medicine />} />
      <Route path="/dashboard/doctor/staff" element={<ManagementDoc />} />
      <Route path="/dashboard/doctor/about" element={<AboutD />} />


      <Route path="/dashboard/lab" element={<Lab />} />
      <Route path="/dashboard/lab/lab-details" element={<LabInfo />} />
      <Route path="/dashboard/lab/lab-cheking" element={<Labdetails />} />
      <Route path="/dashboard/lab/staff" element={<ManagementLab />} />
      <Route path="/dashboard/lab/about" element={<AboutL />} />

    </Routes>
  );
}

export default App;



