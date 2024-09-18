import React from "react";
import "./WeatherCard.css";

function WeatherCard({ weather }) {
  return (
    <div className="weather-card">
      <div className="weather-card__temp">
        {weather ? `${weather.temperature}°F` : "Loading..."}
      </div>
    </div>
  );
}

export default WeatherCard;
