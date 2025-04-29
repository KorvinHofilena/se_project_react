import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { useContext } from "react";

function Main({ weatherData, handleCardClick, items, handleCardLike }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const temp = weatherData?.temp?.[currentTemperatureUnit] || 999;
  const weatherType = weatherData?.type || "";

  console.log("weatherData.type:", weatherType);
  console.log(
    "Available item weathers:",
    items.map((i) => i.weather)
  );

  const filteredItems =
    weatherType === ""
      ? items
      : items.filter(
          (item) => item.weather?.toLowerCase() === weatherType.toLowerCase()
        );

  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {temp}°{currentTemperatureUnit}. You may want to wear:
        </p>
        <ul className="cards__list">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={handleCardClick}
                handleCardLike={handleCardLike}
              />
            ))
          ) : (
            <p className="cards__text">
              No clothing items for current weather.
            </p>
          )}
        </ul>
      </section>
    </main>
  );
}

export default Main;
