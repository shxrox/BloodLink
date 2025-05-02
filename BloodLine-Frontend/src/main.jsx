// src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";  // Router
import App from "./App.jsx";
import "./index.css";  // Importing the CSS file

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <BrowserRouter>  {/* Wrapping the App with Router */}
      <App />
    </BrowserRouter>
  </StrictMode>
);
