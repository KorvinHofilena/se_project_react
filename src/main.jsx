import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App/App";
import "./index.css";
import { CurrentTemperatureUnitProvider } from "./contexts/CurrentTemperatureUnitContext"; // Import the provider

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CurrentTemperatureUnitProvider>
      <App />
    </CurrentTemperatureUnitProvider>
  </React.StrictMode>
);
