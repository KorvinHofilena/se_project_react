import { useContext } from "react";

import "./ToggleSwitch.css";

import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function ToggleSwitch() {
  const tempContext = useContext(CurrentTemperatureUnitContext);
  const isActive = tempContext.currentTemperatureUnit === "F";
  return (
    <>
      <input
        className="toggle-switch__checkbox"
        id={`toggle-switch-id`}
        type="checkbox"
        onChange={tempContext.handleToggleSwitchChange}
      />
      <label className="toggle-switch__label" htmlFor={`toggle-switch-id`}>
        <span className={`toggle-switch__button`} />
        <p
          className={`toggle-switch__unit ${
            isActive ? "toggle-switch__unit_active" : ""
          }`}
        >
          &deg;F
        </p>
        <p
          className={`toggle-switch__unit ${
            isActive ? "" : "toggle-switch__unit_active"
          }`}
        >
          &deg;C
        </p>
      </label>
    </>
  );
}

export default ToggleSwitch;
