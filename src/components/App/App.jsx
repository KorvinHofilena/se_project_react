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
  const [activeModal, setActiveModal] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prevUnit) => (prevUnit === "F" ? "C" : "F"));
  };

  const closeActiveModal = () => {
    setActiveModal(null);
    setSelectedCard(null);
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  const handleCardClick = (card) => {
    if (!card?.id && !card?._id) {
      console.error("Invalid card data:", card);
      return;
    }
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => setActiveModal("add-item");

  const openDeleteModal = (card) => {
    setSelectedCard(card);
    setActiveModal("delete-item");
  };

  const handleDeleteConfirm = () => {
    const deleteId = selectedCard?.id || selectedCard?._id;
    deleteServerItem(deleteId)
      .then(() => {
        setItems((prevItems) =>
          prevItems.filter((item) => item.id !== deleteId)
        );
        closeActiveModal();
      })
      .catch((err) => console.error("Error deleting item:", err));
  };

  const generateUniqueId = () =>
    `${Date.now()}${Math.floor(Math.random() * 1000)}`;

  const handleAddItem = (newItem) => {
    const itemWithId = {
      ...newItem,
      _id: generateUniqueId(),
      likes: [],
    };
    addServerItem(itemWithId)
      .then((addedItem) => {
        setItems((prevItems) => [addedItem, ...prevItems]);
        closeActiveModal();
      })
      .catch((err) => console.error("Error adding new item:", err));
  };

  const handleCardLike = ({ id, isLiked }) => {
    toggleLike(id, isLiked, currentUser?.id)
      .then((updatedItem) => {
        setItems((prevItems) =>
          prevItems.map((item) =>
            item._id === updatedItem._id ? updatedItem : item
          )
        );
      })
      .catch((err) => console.error("Error toggling like:", err));
  };

  const handleRegister = (data) => {
    setIsLoading(true);
    signUserUp(data)
      .then(() => handleLogin({ email: data.email, password: data.password }))
      .catch((err) => console.error("Registration error:", err))
      .finally(() => setIsLoading(false));
  };

  const handleLogin = (data) => {
    setIsLoading(true);
    signUserIn(data)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setIsLoggedIn(true);
          setActiveModal(null);
        }
      })
      .catch((err) => console.error("Login error:", err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    Promise.all([
      getWeather(coordinates, APIkey).then(filterWeatherData),
      getServerItems(),
    ])
      .then(([weather, items]) => {
        setWeatherData(weather);
        setItems(items);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      fetchUserData(token)
        .then((userData) => {
          setCurrentUser(userData);
          setIsLoggedIn(true);
        })
        .catch(console.error);
    }
  }, []);

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
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  items={items}
                />
              }
            />
            <Route
              path="/profile"
              element={
                isLoggedIn ? (
                  <Profile
                    onCardClick={handleCardClick}
                    onDeleteClick={openDeleteModal}
                    items={items}
                    handleAddClick={handleAddClick}
                    handleLogout={handleSignOut}
                    onCardLike={handleCardLike}
                  />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
          </Routes>
          <Footer />
          {activeModal === "add-item" && (
            <AddItemModal
              isOpen={true}
              onAddItem={handleAddItem}
              isLoading={isLoading}
              onClose={closeActiveModal}
            />
          )}
          {activeModal === "preview" && (
            <ItemModal
              card={selectedCard}
              onClose={closeActiveModal}
              handleDeleteClick={() => openDeleteModal(selectedCard)}
            />
          )}
          {activeModal === "delete-item" && (
            <DeleteConfirmModal
              onDelete={handleDeleteConfirm}
              onClose={closeActiveModal}
            />
          )}
          {activeModal === "login" && (
            <LoginModal
              handleLogin={handleLogin}
              isLoading={isLoading}
              setActiveModal={setActiveModal}
              onClose={closeActiveModal}
            />
          )}
          {activeModal === "register" && (
            <RegisterModal
              handleRegistration={handleRegister}
              isLoading={isLoading}
              setActiveModal={setActiveModal}
              onClose={closeActiveModal}
            />
          )}
        </div>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitProvider>
  );
}

export default App;
