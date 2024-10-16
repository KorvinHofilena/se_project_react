import "./main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { useContext } from "react";

function Main({ weatherData, onCardClick, clothingItems, onCardLike }) {
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
          {clothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <li key={item._id}>
                  <Link to={`/items/${item._id}`}>
                    <ItemCard
                      item={item}
                      onCardClick={onCardClick}
                      onCardLike={onCardLike}
                    />
                  </Link>
                </li>
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
