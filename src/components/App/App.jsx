import { useEffect, useState } from "react";
import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { getServerItems } from "../../utils/api";
import { signUserIn, signUserUp, getUserByToken } from "../../utils/auth";
import { CurrentTemperatureUnitProvider } from "../../contexts/CurrentTemperatureUnitContext";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [items, setItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [clothingItems, setClothingItems] = useState([]);

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

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getServerItems()
      .then((data) => {
        setItems(data);
      })
      .catch((err) => console.error("Error fetching items:", err));
  }, []);

  return (
    <CurrentTemperatureUnitProvider>
      <div className="app">
        <div className="app__content">
          <Header
            handleAddClick={handleAddClick}
            weatherData={weatherData}
            isLoggedIn={isLoggedIn}
            currentUser={currentUser}
            handleLoginClick={handleLoginClick}
            handleRegisterClick={handleRegisterClick}
          />

          {isLoggedIn ? (
            <Profile
              handleEditProfileClick={() => setActiveModal("edit-profile")}
              onCardClick={handleCardClick}
              clothingItems={clothingItems}
              handleAddClick={handleAddClick}
              handleLogout={() => setIsLoggedIn(false)}
              onCardLike={() => {}}
            />
          ) : (
            <Main
              weatherData={weatherData}
              handleCardClick={handleCardClick}
              items={items}
            />
          )}
        </div>

        <LoginModal
          isOpen={activeModal === "login"}
          handleLogin={handleLogin}
          isLoading={isLoading}
          setActiveModal={setActiveModal}
          onClose={closeActiveModal}
        />

        <RegisterModal
          isOpen={activeModal === "register"}
          handleRegistration={handleRegister}
          isLoading={isLoading}
          setActiveModal={setActiveModal}
          onClose={closeActiveModal}
        />

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

        <Footer />
      </div>
    </CurrentTemperatureUnitProvider>
  );
}

export default App;
