import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./AddItemModal.css";

function AddItemModal({ isOpen, closeActiveModal, handleAddItemSubmit }) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    const isValid =
      name.trim().length >= 2 &&
      imageUrl.trim() !== "" &&
      weather.trim() !== "";
    setFormValid(isValid);
  }, [name, imageUrl, weather]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedImageUrl = imageUrl.trim();

    const newItem = {
      name: name.trim(),
      imageUrl: trimmedImageUrl,
      link: trimmedImageUrl,
      weather: weather.trim().toLowerCase(),
    };

    handleAddItemSubmit(newItem, resetForm);
  };

  const resetForm = () => {
    setName("");
    setImageUrl("");
    setWeather("");
    setFormValid(false);
  };

  return (
    <ModalWithForm
      title="New Garment"
      buttonText="Add garment"
      altButtonText="Cancel"
      altButtonClick={closeActiveModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      formValid={formValid}
      onClose={closeActiveModal}
    >
      <label className="modal__label">
        Name
        <input
          type="text"
          name="name"
          className="modal__input"
          placeholder="Enter garment name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          minLength="2"
        />
      </label>

      <label className="modal__label">
        Image URL
        <input
          type="url"
          name="imageUrl"
          className="modal__input"
          placeholder="Enter image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />
      </label>

      <label className="modal__label">Select the weather type:</label>
      <div className="modal__radio-group">
        <label className="modal__radio">
          <input
            type="radio"
            name="weather"
            value="hot"
            checked={weather === "hot"}
            onChange={(e) => setWeather(e.target.value)}
            required
          />
          <span>Hot</span>
        </label>
        <label className="modal__radio">
          <input
            type="radio"
            name="weather"
            value="warm"
            checked={weather === "warm"}
            onChange={(e) => setWeather(e.target.value)}
          />
          <span>Warm</span>
        </label>
        <label className="modal__radio">
          <input
            type="radio"
            name="weather"
            value="cold"
            checked={weather === "cold"}
            onChange={(e) => setWeather(e.target.value)}
          />
          <span>Cold</span>
        </label>
      </div>
    </ModalWithForm>
  );
}

export default AddItemModal;
