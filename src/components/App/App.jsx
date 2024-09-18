import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "../Header/header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import { getWeatherData } from "../../utils/weatherApi";
import { defaultClothingItems } from "../../utils/constants";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);

  useEffect(() => {
    getWeatherData().then((data) => {
      setWeatherData(data);
    });
  }, []);

  return (
    <div className="app">
      <Header weather={weatherData} />
      <Main weather={weatherData} items={clothingItems} />
      <Footer />
    </div>
  );
}

export default App;
