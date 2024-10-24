import { useEffect, useState } from "react";
import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import Footer from "../Footer/Footer";
import { getServerItems } from "../../utils/api";
import { signUserIn, signUserUp, getUserByToken } from "../../utils/auth";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState(""); // Manage which modal is active
  const [selectedCard, setSelectedCard] = useState({});
  const [items, setItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  // Handle card click to open item modal
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  // Open the add item modal
  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  // Open the login modal
  const handleLoginClick = () => {
    setActiveModal("login");
  };

  // Open the register modal
  const handleRegisterClick = () => {
    setActiveModal("register");
  };

  // Close any active modal
  const closeActiveModal = () => {
    setActiveModal("");
  };

  // Handle user login
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
        closeActiveModal(); // Close login modal
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  // Handle user registration
  const handleRegister = (data) => {
    setIsLoading(true);
    signUserUp(data)
      .then(() => handleLogin({ email: data.email, password: data.password })) // Auto-login after registration
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  // Fetch weather data
  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  // Fetch items (garments) from the server when the app loads
  useEffect(() => {
    getServerItems()
      .then((data) => {
        setItems(data);
      })
      .catch((err) => console.error("Error fetching items:", err));
  }, []);

  return (
    <div className="app">
      <div className="app__content">
        <Header
          handleAddClick={handleAddClick}
          weatherData={weatherData}
          isLoggedIn={isLoggedIn}
          currentUser={currentUser}
          handleLoginClick={handleLoginClick} // Pass the login handler
          handleRegisterClick={handleRegisterClick} // Pass the register handler
        />
        <Main
          weatherData={weatherData}
          handleCardClick={handleCardClick}
          items={items}
        />
      </div>

      {/* Login Modal */}
      <LoginModal
        isOpen={activeModal === "login"}
        handleLogin={handleLogin}
        isLoading={isLoading}
        setActiveModal={setActiveModal}
        onClose={closeActiveModal}
      />

      {/* Register Modal */}
      <RegisterModal
        isOpen={activeModal === "register"}
        handleRegistration={handleRegister}
        isLoading={isLoading}
        setActiveModal={setActiveModal}
        onClose={closeActiveModal}
      />

      {/* Add Garment Modal */}
      <ModalWithForm
        isOpen={activeModal === "add-garment"}
        title="New garment"
        buttonText="Add garment"
        activeModal={activeModal}
        onClose={closeActiveModal}
      >
        <label htmlFor="name" className="modal__label">
          Name
          <input
            type="text"
            className="modal__input"
            id="name"
            placeholder="Name"
          />
        </label>
        <label htmlFor="imageUrl" className="modal__label">
          Image
          <input
            type="text"
            className="modal__input"
            id="imageUrl"
            placeholder="Image URL"
          />
        </label>
        <fieldset className="modal__radio-buttons">
          <legend className="modal__legend">Select the weather type:</legend>
          <label htmlFor="hot" className="modal__label modal__label_type_radio">
            <input
              id="hot"
              type="radio"
              className="modal__radio-input"
              name="weather"
            />
            <span>Hot</span>
          </label>
          <label
            htmlFor="warm"
            className="modal__label modal__label_type_radio"
          >
            <input
              id="warm"
              type="radio"
              className="modal__radio-input"
              name="weather"
            />
            <span>Warm</span>
          </label>
          <label
            htmlFor="cold"
            className="modal__label modal__label_type_radio"
          >
            <input
              id="cold"
              type="radio"
              className="modal__radio-input"
              name="weather"
            />
            <span>Cold</span>
          </label>
        </fieldset>
      </ModalWithForm>

      {/* Item Preview Modal */}
      <ItemModal
        activeModal={activeModal}
        card={selectedCard}
        onClose={closeActiveModal}
      />

      <Footer />
    </div>
  );
}

export default App;
