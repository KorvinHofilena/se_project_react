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
      name.trim().length >= 2 && imageUrl.trim() !== "" && weather !== "";
    setFormValid(isValid);
  }, [name, imageUrl, weather]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
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
          id="add-item-name"
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
          id="add-item-imageUrl"
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
              id="add-item-hot"
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
              id="add-item-warm"
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
              id="add-item-cold"
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
