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




function App() {
  return (
    <Routes>
      <Route path="/registration" element={<RegistrationForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/dashboard/nurse" element={<Nurse />} />
      <Route path="/dashboard/doctor" element={<Doctor />} />
      <Route path="/dashboard/lab" element={<Lab />} />
      <Route path="/dashboard/nurse/patient-register" element={<Patientregister />} />
      <Route path="/dashboard/nurse/patient-labreport" element={<AbbLab />} />
      <Route path="/dashboard/doctor/patient-details" element={<Patientdetails />} />
      <Route path="/dashboard/doctor/petient-cheking" element={<Patientcheking />} />
      <Route path="/dashboard/nurse/patient-queue" element={<Patientqueue />} />
      <Route path="/dashboard/lab/lab-details" element={<LabInfo />} />
      <Route path="/dashboard/lab/lab-cheking" element={<Labdetails />} />
      <Route path="/dashboard/nurse/lab-cheking" element={<NurseLabDatils />} />
      <Route path="/dashboard/doctor/petient-description" element={<PetientDescription />}/>


      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
