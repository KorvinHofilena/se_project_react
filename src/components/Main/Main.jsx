import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext.js";

import "./Main.css";

import WeatherCard from "../WeatherCard/WeatherCard.jsx";
import ItemCard from "../ItemCard/ItemCard.jsx";

function Main({ info, handler, settingArray }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  return (
    <main className="main-app">
      {/* WeatherCard component showing current weather */}
      <WeatherCard info={info} />

      {/* Display current temperature with the unit */}
      <p className="main-app__phrase">
        Today is {info.temp?.[currentTemperatureUnit] || "N/A"}{" "}
        {currentTemperatureUnit} / You may want to wear:
      </p>

      {/* Display the list of filtered clothing items */}
      <ul className="main-app__list">
        {settingArray
          .filter((item) => item.weather === info.type) // Filter items based on weather
          .map((item) => (
            <ItemCard key={item._id} item={item} onCardClick={handler} />
          ))}
      </ul>
    </main>
  );
}

export default Main;
