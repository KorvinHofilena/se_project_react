import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./AddItemModal.css";

function AddItemModal({ isOpen, closeActiveModal, handleAddItemSubmit }) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");
  const [formValid, setFormValid] = useState(false);

  const checkInputValidity = (input) => {
    if (!input.validity.valid) {
      setFormValid(false);
    } else {
      // Check if all fields are valid
      const nameInput = document.querySelector('input[name="name"]');
      const imageUrlInput = document.querySelector('input[name="imageUrl"]');
      const isValid =
        nameInput.validity.valid &&
        imageUrlInput.validity.valid &&
        weather !== "";
      setFormValid(isValid);
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    checkInputValidity(e.target);
  };

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
    checkInputValidity(e.target);
  };

  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
    // Create a dummy input element for weather validation
    const weatherInput = document.createElement("input");
    weatherInput.value = e.target.value;
    weatherInput.required = true;
    checkInputValidity(weatherInput);
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
