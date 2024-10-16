import { useContext } from "react";
import "./WeatherCard.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { weatherOptions } from "../../utils/constants";

function WeatherCard({ info }) {
  const actualCondition = weatherOptions.filter((item) => {
    return item.day === info.isDay && item.condition === info.condition;
  });

  const currentTempUnit = useContext(
    CurrentTemperatureUnitContext
  ).currentTemperatureUnit;

  return (
    <section className="weather-card">
      <p className="weather-card__temp">{info.temp[currentTempUnit]}</p>
      <img
        className="weather-card__image"
        src={actualCondition[0].url}
        alt="Weather card"
      />
    </section>
  );
}

export default WeatherCard;
