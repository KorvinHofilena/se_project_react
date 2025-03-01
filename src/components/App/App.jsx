import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Header from "../Header/header";
import { coordinates, APIkey } from "../../utils/constants";

import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/WeatherApi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext.jsx";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import {
  getServerItems,
  addServerItem,
  deleteServerItem,
} from "../../utils/api";

import DeleteConfirm from "../DeleteConfirmModal/DeleteConfirmModal";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import EditProfileModal from "../EditModal/EditModal";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../App/ProtectedRoute";

import {
  registerUser,
  logIn,
  getUserProfile,
  editUserProfile,
  addCardLike,
  removeCardLike,
} from "../../utils/auth";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Open & close functions
  const handleAddClick = () => setActiveModal("add-garment");
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };
  const closeActiveModal = () => {
    setActiveModal("");
    setSelectedCard({});
  };
  const handleLoginModal = () => setActiveModal("login");
  const handleRegisterModal = () => setActiveModal("signup");
  const handleEditModal = () => setActiveModal("editprofile");

  // Like function
  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    const cardAction = isLiked ? removeCardLike : addCardLike;

    cardAction(id, token)
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((item) => (item.id === id ? updatedCard : item))
        );
      })
      .catch(console.error);
  };

  // Edit function
  const handleEditProfile = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");
    editUserProfile({ name, avatar }, token)
      .then((updatedUser) => {
        setCurrentUser((user) => ({ ...user, ...updatedUser }));
        closeActiveModal();
      })
      .catch(console.error);
  };

  // Add item function
  const handleAddItemSubmit = (newItem, resetForm) => {
    const token = localStorage.getItem("jwt");
    addServerItem(newItem, token)
      .then((addedItem) => {
        setClothingItems([...clothingItems, addedItem]);
        resetForm();
        closeActiveModal();
      })
      .catch(console.error);
  };

  // Delete functions
  const handleDeleteCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("delete-confirmation");
  };
  const handleDeleteCard = (card) => {
    const token = localStorage.getItem("jwt");
    deleteServerItem(card.id, token)
      .then(() => {
        setClothingItems((cards) => cards.filter((c) => c.id !== card.id));
        closeActiveModal();
      })
      .catch(console.error);
  };

  // Login function
  const handleLogin = ({ email, password }) => {
    logIn({ email, password })
      .then((res) => {
        if (!res.token) throw new Error("Token not received");
        localStorage.setItem("jwt", res.token);
        return getUserProfile(res.token);
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        navigate("/profile");
        closeActiveModal();
      })
      .catch(console.error);
  };

  // Register new users
  const handleRegister = (user) => {
    registerUser(user)
      .then(() => handleLogin({ email: user.email, password: user.password }))
      .catch(console.error);
  };

  // Handle signout
  const handleSignout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate("/");
  };

  // Toggle function for temperature
  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prevUnit) => (prevUnit === "C" ? "F" : "C"));
  };

  // Fetch weather and items
  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => setWeatherData(filterWeatherData(data)))
      .catch(console.error);
    getServerItems().then(setClothingItems).catch(console.error);
  }, []);

  // Fetch user session
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      getUserProfile(token)
        .then((user) => {
          setCurrentUser(user);
          setIsLoggedIn(true);
        })
        .catch(() => {
          localStorage.removeItem("jwt");
          setCurrentUser(null);
          setIsLoggedIn(false);
        });
    }
  }, []);

  // Close modal on escape key press
  useEffect(() => {
    if (!activeModal) return;
    const handleEscClose = (e) => e.key === "Escape" && closeActiveModal();
    document.addEventListener("keydown", handleEscClose);
    return () => document.removeEventListener("keydown", handleEscClose);
  }, [activeModal]);

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              handleLoginModal={handleLoginModal}
              handleRegisterModal={handleRegisterModal}
              isLoggedIn={isLoggedIn}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    items={clothingItems}
                    isLoggedIn={isLoggedIn}
                    handleCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      onCardClick={handleCardClick}
                      handleAddClick={handleAddClick}
                      items={clothingItems}
                      handleEditModal={handleEditModal}
                      handleSignout={handleSignout}
                      handleCardLike={handleCardLike}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
          <Footer />
          <AddItemModal
            isOpen={activeModal === "add-garment"}
            handleAddItemSubmit={handleAddItemSubmit}
            closeActiveModal={closeActiveModal}
          />
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeActiveModal}
            handleDelete={() => handleDeleteCardClick(selectedCard)}
          />
          <DeleteConfirm
            activeModal={activeModal}
            closeActiveModal={closeActiveModal}
            handleDeleteCard={handleDeleteCard}
            selectedCard={selectedCard}
          />
          <LoginModal
            activeModal={activeModal}
            closeActiveModal={closeActiveModal}
            isOpen={activeModal === "login"}
            onLogin={handleLogin}
          />
          <RegisterModal
            activeModal={activeModal}
            closeActiveModal={closeActiveModal}
            isOpen={activeModal === "signup"}
            onRegister={handleRegister}
          />
          <EditProfileModal
            activeModal={activeModal}
            closeActiveModal={closeActiveModal}
            isOpen={activeModal === "editprofile"}
            onSubmit={handleEditProfile}
          />
        </CurrentTemperatureUnitContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
