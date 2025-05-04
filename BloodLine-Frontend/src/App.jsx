import { Routes, Route } from 'react-router-dom';
import RegistrationForm from './component/RegistrationForm';

function App() {
  return (
    <Routes>
      <Route path="/registration" element={<RegistrationForm />} />
    </Routes>
  );
}

export default App;
