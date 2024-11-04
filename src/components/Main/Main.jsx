// Main.jsx

import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { useContext } from "react";

function Main({ weatherData, handleCardClick, items, onCardLike }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const temp = weatherData?.temp?.[currentTemperatureUnit] || 999;

  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {temp} {currentTemperatureUnit} / You may want to wear:
        </p>
        <ul className="cards__list">
          {items
            .filter((item) => item.weather === weatherData.type)
            .map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                onCardClick={handleCardClick}
                onCardLike={onCardLike} // Pass onCardLike here
              />
            ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
