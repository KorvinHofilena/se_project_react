import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { getServerItems } from "../../utils/api";
import { signUserIn, signUserUp, getUserByToken } from "../../utils/auth";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { CurrentTemperatureUnitProvider } from "../../contexts/CurrentTemperatureUnitContext";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 37 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [items, setItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: "John Doe",
    avatar: "https://via.placeholder.com/40",
  });
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prevUnit) => (prevUnit === "F" ? "C" : "F"));
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-item");
  };

  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const handleRegisterClick = () => {
    setActiveModal("register");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleLogin = (credentials) => {
    setIsLoading(true);
    signUserIn(credentials)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        return getUserByToken(data.token);
      })
      .then((user) => {
        console.log("Logged in user data:", user); // Confirming user data
        setCurrentUser(user);
        setIsLoggedIn(true);
        closeActiveModal();
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  const handleRegister = (data) => {
    setIsLoading(true);
    signUserUp(data)
      .then(() => handleLogin({ email: data.email, password: data.password }))
      .catch(console.error)
      .finally(() => setIsLoading(false));
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
            handleLoginClick={handleLoginClick}
            handleRegisterClick={handleRegisterClick}
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
                    clothingItems={clothingItems}
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
            onAddItem={(newItem) => {
              setItems([newItem, ...items]);
              closeActiveModal();
            }}
            isLoading={isLoading}
            onClose={closeActiveModal}
          />

          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeActiveModal}
          />
        </div>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitProvider>
  );
}

export default App;
