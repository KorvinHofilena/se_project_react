import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import {
  getServerItems,
  deleteServerItem,
  addServerItem,
} from "../../utils/api";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { CurrentTemperatureUnitProvider } from "../../contexts/CurrentTemperatureUnitContext";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [currentUser, setCurrentUser] = useState({
    name: "John Doe",
    id: "user123",
  });
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 37 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prevUnit) => (prevUnit === "F" ? "C" : "F"));
  };

  const handleCardClick = (card) => {
    if (!card || !card.id) {
      console.error("Invalid card data:", card);
      return;
    }

    setActiveModal("preview");
    setSelectedCard(card);
    console.log("Selected card set for preview:", card);
  };

  const handleAddClick = () => {
    setActiveModal("add-item");
  };

  const handleDeleteClick = () => {
    if (!selectedCard || !selectedCard.id) {
      console.error("No valid ID for the selected item.");
      return;
    }

    console.log("Attempting to delete item with id:", selectedCard.id);

    deleteServerItem(selectedCard.id)
      .then(() => {
        setItems(items.filter((item) => item.id !== selectedCard.id));
        setActiveModal("");
        setSelectedCard(null);
      })
      .catch((err) => console.error("Error deleting item:", err));
  };

  const handleAddItem = (newItem) => {
    const itemWithId = {
      ...newItem,
      id: Date.now().toString(),
    };

    addServerItem(itemWithId)
      .then((addedItem) => {
        setItems([addedItem, ...items]);
        setActiveModal("");
      })
      .catch((err) => console.error("Error adding new item:", err));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser({});
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, [isLoggedIn]);

  useEffect(() => {
    getServerItems()
      .then((data) => {
        setItems(data);
      })
      .catch((err) => console.error("Error fetching items:", err));
  }, []);

  return (
    <CurrentTemperatureUnitProvider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <CurrentUserContext.Provider value={currentUser}>
        <div className="app">
          <Header
            handleAddClick={handleAddClick}
            weatherData={weatherData}
            isLoggedIn={isLoggedIn}
            handler={handleAddClick}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  items={items}
                />
              }
            />
            <Route
              path="/profile"
              element={
                isLoggedIn ? (
                  <Profile
                    handleEditProfileClick={() =>
                      setActiveModal("edit-profile")
                    }
                    onCardClick={handleCardClick}
                    items={items}
                    handleAddClick={handleAddClick}
                    handleLogout={handleLogout}
                  />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
          </Routes>
          <Footer />
          <AddItemModal
            isOpen={activeModal === "add-item"}
            onAddItem={handleAddItem}
            isLoading={isLoading}
            onClose={() => setActiveModal("")}
          />
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={() => {
              setActiveModal("");
              setSelectedCard(null);
            }}
            handleDeleteClick={handleDeleteClick}
          />
        </div>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitProvider>
  );
}

export default App;
