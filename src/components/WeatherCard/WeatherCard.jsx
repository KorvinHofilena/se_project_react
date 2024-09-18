import React from "react";

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
