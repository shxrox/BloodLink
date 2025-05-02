import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './component/Register'; // Assuming the Register component is in src/component/

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} /> {/* Route for /register */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
