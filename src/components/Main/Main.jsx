import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext.js";
import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard.jsx";
import ItemCard from "../ItemCard/ItemCard.jsx";

function Main({ info, handler, settingArray = [] }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  return (
    <main className="main-app">
      <WeatherCard info={info} />
      <p className="main-app__phrase">
        Today is {info?.temp?.[currentTemperatureUnit] || "N/A"}{" "}
        {currentTemperatureUnit} / You may want to wear:
      </p>
      <ul className="main-app__list">
        {settingArray
          .filter((item) => item.weather === info?.type)
          .map((item) => (
            <ItemCard key={item._id} item={item} onCardClick={handler} />
          ))}
      </ul>
    </main>
  );
}

export default Main;
