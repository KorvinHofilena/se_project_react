import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./AddItemModal.css";

function AddItemModal({ isOpen, closeActiveModal, handleAddItemSubmit }) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");
  const [formValid, setFormValid] = useState(false);

  // Updated checkInputValidity function
  const checkInputValidity = () => {
    // Check if all fields are valid
    const isValid = name.length >= 2 && imageUrl && weather;
    setFormValid(isValid);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    checkInputValidity(); // Check validity after each input change
  };

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
    checkInputValidity(); // Check validity after each input change
  };

  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
    checkInputValidity(); // Check validity after each input change
  };

  const resetForm = () => {
    setName("");
    setImageUrl("");
    setWeather("");
    setFormValid(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddItemSubmit({ name, imageUrl, weather }, resetForm);
  };

  return (
    <ModalWithForm
      title="New Garment"
      isOpen={isOpen}
      onClose={closeActiveModal}
      onSubmit={handleSubmit}
      buttonText="Add garment"
      altButtonText="Cancel"
      altButtonClick={closeActiveModal}
      formValid={formValid}
    >
      <label className="modal__label">
        Name
        <input
          type="text"
          name="name"
          id="add-item-name" // Changed from item-name
          className="modal__input"
          value={name}
          onChange={handleNameChange}
          placeholder="Enter garment name"
          required
          minLength="2"
        />
      </label>
      <label className="modal__label">
        Image URL
        <input
          type="url"
          name="imageUrl"
          id="add-item-imageUrl" // Changed from imageURL
          className="modal__input"
          value={imageUrl}
          onChange={handleImageUrlChange}
          placeholder="Enter image URL"
          required
        />
      </label>
      <label className="modal__label">
        Select Weather Type
        <div className="modal__radio-group">
          <label className="modal__radio">
            <input
              type="radio"
              name="weather"
              id="add-item-hot" // Changed from hot
              value="hot"
              checked={weather === "hot"}
              onChange={handleWeatherChange}
            />
            Hot
          </label>
          <label className="modal__radio">
            <input
              type="radio"
              name="weather"
              id="add-item-warm" // Changed from warm
              value="warm"
              checked={weather === "warm"}
              onChange={handleWeatherChange}
            />
            Warm
          </label>
          <label className="modal__radio">
            <input
              type="radio"
              name="weather"
              id="add-item-cold" // Changed from cold
              value="cold"
              checked={weather === "cold"}
              onChange={handleWeatherChange}
            />
            Cold
          </label>
        </div>
      </label>
    </ModalWithForm>
  );
}

export default AddItemModal;
