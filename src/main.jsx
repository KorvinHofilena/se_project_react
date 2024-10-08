import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App/App";
import "./index.css";
import { CurrentTemperatureUnitProvider } from "./contexts/CurrentTemperatureUnitContext";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CurrentTemperatureUnitProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CurrentTemperatureUnitProvider>
  </React.StrictMode>
);
