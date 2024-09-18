import React from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";

function Main({ weather, items }) {
  const filteredItems = items.filter(
    (item) => item.weather === weather?.temperatureType
  );

  return (
    <main className="main">
      <WeatherCard weather={weather} />
      <ul className="main__items">
        {filteredItems.map((item) => (
          <ItemCard key={item._id} item={item} />
        ))}
      </ul>
    </main>
  );
}

export default Main;
