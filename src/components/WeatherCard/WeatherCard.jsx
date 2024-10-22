import "./weatherCard.css";
import { weatherOptions, defaultWeatherOptions } from "../../utils/constants";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { useContext } from "react";

function WeatherCard({ weatherData = {} }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const temp = weatherData?.temp?.[currentTemperatureUnit] || 999;

  // Safely destructure weatherData to avoid undefined errors
  const { isDay = true, condition = "" } = weatherData;

  // Find the appropriate weather option based on the current weather conditions
  const foundOption = weatherOptions.find((option) => {
    return option.day === isDay && option.condition === condition;
  });

  // Use default options if no specific match is found
  const weatherOption =
    foundOption || defaultWeatherOptions[isDay ? "day" : "night"];

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {temp} &deg;{currentTemperatureUnit}
      </p>
      <img
        src={weatherOption?.url}
        alt={weatherOption?.condition || "default weather"}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
