import { useContext } from "react";
import "./WeatherCard.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { weatherOptions } from "../../utils/constants";

function WeatherCard({ info }) {
  const actualCondition = info
    ? weatherOptions.filter(
        (item) => item.day === info.isDay && item.condition === info.condition
      )
    : [];

  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  return (
    <section className="weather-card">
      {info && info.temp && (
        <p className="weather-card__temp">
          {info.temp[currentTemperatureUnit] || "N/A"}
        </p>
      )}

      {actualCondition.length > 0 ? (
        <img
          className="weather-card__image"
          src={actualCondition[0].url}
          alt="Weather condition"
        />
      ) : (
        <p>No weather data available</p>
      )}
    </section>
  );
}

export default WeatherCard;
