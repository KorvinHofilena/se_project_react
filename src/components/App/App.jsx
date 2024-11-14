import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import DeleteConfirmModal from "../DeleteConfirmModal/DeleteConfirmModal";
import Footer from "../Footer/Footer";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import {
  getServerItems,
  deleteServerItem,
  addServerItem,
  toggleLike,
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
    if (!card || (!card.id && !card._id)) {
      console.error("Invalid card data:", card);
      return;
    }

    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-item");
  };

  const openDeleteModal = (card) => {
    setSelectedCard(card);
    setActiveModal("delete-item");
  };

  const handleDeleteConfirm = () => {
    if (!selectedCard || (!selectedCard.id && !selectedCard._id)) {
      console.error("No valid ID for the selected item.");
      return;
    }

    const deleteId = selectedCard.id || selectedCard._id;

    deleteServerItem(deleteId)
      .then(() => {
        setItems((prevItems) =>
          prevItems.filter(
            (item) => item.id !== deleteId && item._id !== deleteId
          )
        );
        setActiveModal("");
        setSelectedCard(null);
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
        setActiveModal("");
      })
      .catch((err) => console.error("Error adding new item:", err));
  };

  const handleCardLike = ({ id, isLiked }) => {
    toggleLike(id, isLiked, currentUser.id)
      .then((updatedItem) => {
        setItems((prevItems) =>
          prevItems.map((item) =>
            item._id === updatedItem._id ? updatedItem : item
          )
        );
      })
      .catch((err) => console.error("Error toggling like:", err));
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
                    handleEditProfileClick={() =>
                      setActiveModal("edit-profile")
                    }
                    onCardClick={handleCardClick}
                    onDeleteClick={openDeleteModal}
                    items={items}
                    handleAddClick={handleAddClick}
                    handleLogout={handleLogout}
                    onCardLike={handleCardLike}
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
            handleDeleteClick={() => openDeleteModal(selectedCard)}
          />
          <DeleteConfirmModal
            activeModal={activeModal}
            onDelete={handleDeleteConfirm}
            onClose={() => setActiveModal("")}
          />
        </div>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitProvider>
  );
}

export default App;
