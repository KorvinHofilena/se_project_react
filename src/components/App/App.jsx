import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";

import Header from "../Header/Header.jsx";
import getInfo from "../../utils/weatherApi.js";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import Profile from "../Profile/Profile.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";

import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext.js";

import { position, APIkey } from "../../utils/constants.js";
import LoadingImage from "../../assets/Loading-image.png";
import {
  getServerItems,
  addServerItem,
  deleteServerItem,
} from "../../utils/api.js";

function App() {
  const [info, setInfo] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [selectedPopup, setSelectedPopup] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothesList, setClothesList] = useState([]);
  const [lastId, setLastId] = useState("");

  const handleAddClick = () => {
    setSelectedPopup("popup-add");
  };
  const handleCardClick = (card) => {
    setSelectedPopup("popup-card");
    setSelectedCard(card);
  };
  const closePopup = () => {
    setSelectedPopup("");
  };
  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  const handleAddItemSubmit = (newName, newUrl, newType, resetInputs) => {
    const newCard = {
      _id: lastId + 1,
      name: newName,
      weather: newType,
      imageUrl: newUrl,
    };
    addServerItem(newCard)
      .then(() => {
        setClothesList([newCard, ...clothesList]);
        setLastId(newCard._id);
        closePopup();
        resetInputs();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleCardDelete = () => {
    deleteServerItem(selectedCard._id)
      .then(() => {
        setClothesList(
          clothesList.filter((item) => {
            return item._id !== selectedCard._id;
          })
        );
        closePopup();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    setLoading(true);
    getInfo(position, APIkey)
      .then((obj) => {
        setInfo(obj);
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    getServerItems()
      .then((data) => {
        setClothesList(data);
        setLastId(data[data.length - 1]._id);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    if (!selectedPopup) return;
    const handleEscClose = (evt) => {
      if (evt.key === "Escape") {
        closePopup();
      }
    };
    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [selectedPopup]);

  return isLoading ? (
    <img className="app__loading" src={LoadingImage} alt="Loading image" />
  ) : (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="app__container">
        <div className="app__content">
          <Header info={info} handler={handleAddClick} />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  info={info}
                  handler={handleCardClick}
                  settingArray={clothesList}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  settingArray={clothesList}
                  handler={handleCardClick}
                  onClick={handleAddClick}
                />
              }
            />
          </Routes>
          <Footer />
        </div>
        <AddItemModal
          selectedPopup={selectedPopup}
          onClose={closePopup}
          onAddItem={handleAddItemSubmit}
        />
        <ItemModal
          isOpen={selectedPopup === "popup-card"}
          selectedCard={selectedCard}
          closePopup={closePopup}
          deleteCard={handleCardDelete}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
