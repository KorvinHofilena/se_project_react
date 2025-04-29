// src/components/App/App.jsx
import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import DeleteConfirm from "../DeleteConfirmModal/DeleteConfirmModal";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import ProtectedRoute from "./ProtectedRoute";

import { coordinates, APIkey } from "../../utils/constants";
import { getWeather, filterWeatherData } from "../../utils/WeatherApi";
import {
  getServerItems,
  addServerItem,
  deleteServerItem,
} from "../../utils/api";
import {
  registerUser,
  logIn,
  getUserProfile,
  editUserProfile,
  addCardLike,
  removeCardLike,
} from "../../utils/auth";

import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext.jsx";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

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

  const openModal = (modalName) => setActiveModal(modalName);
  const closeActiveModal = () => {
    setActiveModal("");
    setSelectedCard({});
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    openModal("preview");
  };

  const handleCardLike = ({ id, isLiked }) => {
    const action = isLiked ? removeCardLike : addCardLike;
    const token = localStorage.getItem("jwt");
    action(id, token)
      .then((updatedCard) => {
        setClothingItems((prevCards) =>
          prevCards.map((item) => (item._id === id ? updatedCard : item))
        );
      })
      .catch(console.error);
  };

  const handleEditProfile = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");
    editUserProfile({ name, avatar }, token)
      .then((updatedUser) => {
        setCurrentUser((prevUser) => ({ ...prevUser, ...updatedUser }));
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleAddItemSubmit = (newItem, resetForm) => {
    const token = localStorage.getItem("jwt");
    addServerItem(newItem, token)
      .then((addedItem) => {
        setClothingItems((prevItems) => [...prevItems, addedItem]);
        resetForm();
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleDeleteCardClick = (card) => {
    setSelectedCard(card);
    openModal("delete-confirmation");
  };

  const handleDeleteCard = () => {
    const token = localStorage.getItem("jwt");
    if (!selectedCard._id) {
      console.error("Selected card ID is missing");
      return;
    }
    deleteServerItem(selectedCard._id, token)
      .then(() => {
        setClothingItems((prevCards) =>
          prevCards.filter((c) => c._id !== selectedCard._id)
        );
        closeActiveModal();
      })
      .catch(console.error);
  };

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

  const handleRegister = (userData) => {
    registerUser(userData)
      .then(() =>
        handleLogin({ email: userData.email, password: userData.password })
      )
      .catch((err) => {
        console.error("Registration error:", err);
        alert(err);
      });
  };

  const handleSignout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate("/");
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prevUnit) => (prevUnit === "C" ? "F" : "C"));
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => setWeatherData(filterWeatherData(data)))
      .catch(console.error);

    getServerItems().then(setClothingItems).catch(console.error);
  }, []);

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
          setIsLoggedIn(false);
          setCurrentUser(null);
        });
    }
  }, []);

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <Header
              handleAddClick={() => openModal("add-garment")}
              weatherData={weatherData}
              handleLoginModal={() => openModal("login")}
              handleRegisterModal={() => openModal("signup")}
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
                      handleAddClick={() => openModal("add-garment")}
                      items={clothingItems}
                      handleEditModal={() => openModal("editprofile")}
                      handleSignout={handleSignout}
                      handleCardLike={handleCardLike}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>

            <Footer />

            {/* Modals */}
            <ItemModal
              activeModal={activeModal}
              onClose={closeActiveModal}
              card={selectedCard}
              onDeleteClick={handleDeleteCardClick}
            />

            <AddItemModal
              isOpen={activeModal === "add-garment"}
              closeActiveModal={closeActiveModal}
              handleAddItemSubmit={handleAddItemSubmit}
            />

            <DeleteConfirm
              activeModal={activeModal}
              onClose={closeActiveModal}
              onConfirmDelete={handleDeleteCard}
              handleDeleteCard={handleDeleteCard}
            />

            <LoginModal
              isOpen={activeModal === "login"}
              onClose={closeActiveModal}
              handleLogin={handleLogin}
              setActiveModal={setActiveModal}
            />

            <RegisterModal
              isOpen={activeModal === "signup"}
              onClose={closeActiveModal}
              handleRegistration={handleRegister}
              setActiveModal={setActiveModal}
            />

            <EditProfileModal
              isOpen={activeModal === "editprofile"}
              onClose={closeActiveModal}
              onSubmit={handleEditProfile}
            />
          </div>
        </CurrentTemperatureUnitContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
