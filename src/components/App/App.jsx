import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "../App/App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/header.jsx";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import Footer from "../Footer/Footer";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import DeleteConfirmModal from "../DeleteConfirmModal/DeleteConfirmModal";
import {
  getCardData,
  deleteItem,
  addItem,
  likeItem,
  unlikeItem,
} from "../../utils/api.js";
import {
  registerUser,
  signinUser,
  getUserByToken,
  updateUser,
} from "../../utils/Auth";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });

  const [currentUser, setCurrentUser] = useState(null);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [protectedDestination, setProtectedDestination] = useState("/profile");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (request) => {
    setIsLoading(true);
    request()
      .then(closeActiveModal)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  const onAddItem = (newItem, resetCurrentForm) => {
    setIsLoading(true);
    const token = getToken();
    const makeRequest = () => {
      return addItem(newItem, token).then((res) => {
        setClothingItems([res.data, ...clothingItems]);
        resetCurrentForm();
      });
    };
    handleSubmit(makeRequest);
  };

  const handleDeleteItem = () => {
    const token = getToken();
    const makeRequest = () => {
      return deleteItem(selectedCard._id, token).then(() =>
        setClothingItems((prevItem) =>
          prevItem.filter((item) => item._id !== selectedCard._id)
        )
      );
    };
    handleSubmit(makeRequest);
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleRegisterClick = () => {
    setActiveModal("register");
  };

  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const handleDeleteClick = () => {
    setActiveModal("delete-item");
  };

  const handleCardLike = ({ _id, isLiked }) => {
    const id = _id;
    const token = getToken();

    const updateClothingItems = (newCard) => (cards) => {
      return cards.map((item) => (item._id === id ? newCard : item));
    };

    if (!isLiked) {
      likeItem(id, token)
        .then((newCard) => {
          setClothingItems(updateClothingItems(newCard.item));
        })
        .catch(console.error);
    } else {
      unlikeItem(id, token)
        .then((newCard) => {
          setClothingItems(updateClothingItems(newCard.item));
        })
        .catch(console.error);
    }
  };

  const handleRegistration = (values, resetRegistrationForm) => {
    registerUser(values)
      .then((res) => {
        setIsLoggedIn(true);
        navigate(protectedDestination || "/");
        setCurrentUser(res.data);
        resetRegistrationForm();
        closeActiveModal();
      })
      .catch((res) => {
        console.error(`Error in registration: ${res}`);
      });
  };

  const handleEditProfile = (values, resetCurrentForm) => {
    const token = getToken();
    const makeRequest = () => {
      return updateUser(values, token).then((userData) => {
        setCurrentUser(userData);
        resetCurrentForm();
      });
    };
    handleSubmit(makeRequest);
  };

  const handleLogin = (values, resetLoginForm) => {
    signinUser(values)
      .then((res) => {
        setToken(res.token);
        return getUserByToken(res.token);
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        closeActiveModal();
        navigate(protectedDestination || "/");
        resetLoginForm();
      })
      .catch((err) => {
        console.error("Login failed", err);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate("/");
  };

  useEffect(() => {
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    if (activeModal) {
      document.addEventListener("keydown", handleEscClose);
    }

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getCardData() // Changed from getItems to getCardData
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const token = getToken();
    if (!token || token === "undefined") {
      return;
    }

    getUserByToken(token)
      .then((res) => {
        setCurrentUser(res);
        setIsLoggedIn(true);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="app">
      <CurrentUserContext.Provider value={currentUser}>
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="app__content">
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
                    onCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <Profile
                    handleEditProfileClick={handleEditProfileClick}
                    clothingItems={clothingItems}
                    onCardClick={handleCardClick}
                    handleAddClick={handleAddClick}
                    handleLogout={handleLogout}
                    onCardLike={handleCardLike}
                  />
                }
              />
            </Routes>

            <Footer />
            <AddItemModal
              isOpen={activeModal === "add-garment"}
              onAddItem={onAddItem}
              onClose={closeActiveModal}
              isLoading={isLoading}
            />

            <ItemModal
              activeModal={activeModal}
              card={selectedCard}
              onClose={closeActiveModal}
              handleDeleteClick={handleDeleteClick}
            />

            <RegisterModal
              isOpen={activeModal === "register"}
              onClose={closeActiveModal}
              handleRegistration={handleRegistration}
              isLoading={isLoading}
              setActiveModal={setActiveModal}
            />

            <LoginModal
              isOpen={activeModal === "login"}
              onClose={closeActiveModal}
              handleLogin={handleLogin}
              isLoading={isLoading}
              setActiveModal={setActiveModal}
            />

            <EditProfileModal
              isOpen={activeModal === "edit-profile"}
              onClose={closeActiveModal}
              handleEditProfile={handleEditProfile}
              isLoading={isLoading}
              setActiveModal={setActiveModal}
            />

            <DeleteConfirmModal
              activeModal={activeModal}
              onClose={closeActiveModal}
              onDelete={handleDeleteItem}
            />
          </div>
        </CurrentTemperatureUnitContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
