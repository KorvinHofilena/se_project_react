import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import DeleteConfirmModal from "../DeleteConfirmModal/DeleteConfirmModal";
import Footer from "../Footer/Footer";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import {
  getServerItems,
  deleteServerItem,
  addServerItem,
  toggleLike,
} from "../../utils/api";
import { signUserUp, signUserIn, fetchUserData } from "../../utils/auth";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { CurrentTemperatureUnitProvider } from "../../contexts/CurrentTemperatureUnitContext";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
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

  const closeActiveModal = () => {
    setActiveModal("");
    setSelectedCard(null);
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  const handleLogin = (data) => {
    setIsLoading(true);
    signUserIn(data)
      .then(({ token }) => {
        if (token) {
          localStorage.setItem("jwt", token); // Ensure consistent token storage
          return fetchUserData(token); // Fetch user data after login
        }
      })
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
        setActiveModal("");
      })
      .catch((err) => console.error("Login error:", err))
      .finally(() => setIsLoading(false));
  };

  const handleRegister = (data) => {
    setIsLoading(true);
    signUserUp(data)
      .then(() => {
        handleLogin({ email: data.email, password: data.password });
      })
      .catch((err) => console.error("Registration error:", err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      fetchUserData(token)
        .then((userData) => {
          setCurrentUser(userData);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.error("Error fetching user data:", err);
          handleSignOut();
        });
    }
  }, []);

  // Other useEffect calls for weather and items remain unchanged

  return (
    <CurrentTemperatureUnitProvider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <CurrentUserContext.Provider value={currentUser}>
        <div className="app">
          <Header
            weatherData={weatherData}
            isLoggedIn={isLoggedIn}
            handleRegisterClick={() => setActiveModal("register")}
            handleLoginClick={() => setActiveModal("login")}
            handleSignOut={handleSignOut}
            handleAddClick={() => setActiveModal("add-item")}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={(card) => {
                    setActiveModal("preview");
                    setSelectedCard(card);
                  }}
                  onCardLike={toggleLike}
                  items={items}
                />
              }
            />
            <Route
              path="/profile"
              element={
                isLoggedIn ? (
                  <Profile
                    onCardLike={toggleLike}
                    handleAddClick={() => setActiveModal("add-item")}
                    handleLogout={handleSignOut}
                    items={items}
                  />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
          </Routes>
          <Footer />
          {/* Modals remain unchanged */}
        </div>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitProvider>
  );
}

export default App;
