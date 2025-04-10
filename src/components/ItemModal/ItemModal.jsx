import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./ItemModal.css";

function ItemModal({ isOpen, closeActiveModal, handleAddItemSubmit }) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");
  const [formValid, setFormValid] = useState(false);

  const resetForm = () => {
    setName("");
    setImageUrl("");
    setWeather("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddItemSubmit({ name, imageUrl, weather }, resetForm);
  };

  useEffect(() => {
    const isValid =
      name.trim().length > 1 && imageUrl.trim() !== "" && weather !== "";
    setFormValid(isValid);
  }, [name, imageUrl, weather]);

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
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter garment name"
          required
        />
      </label>
      <label className="modal__label">
        Image URL
        <input
          type="url"
          name="imageUrl"
          className="modal__input"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
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
              onChange={(e) => setWeather(e.target.value)}
            />
            Hot
          </label>
          <label className="modal__radio">
            <input
              type="radio"
              name="weather"
              value="warm"
              checked={weather === "warm"}
              onChange={(e) => setWeather(e.target.value)}
            />
            Warm
          </label>
          <label className="modal__radio">
            <input
              type="radio"
              name="weather"
              value="cold"
              checked={weather === "cold"}
              onChange={(e) => setWeather(e.target.value)}
            />
            Cold
          </label>
        </div>
      </label>
    </ModalWithForm>
  );
}

export default ItemModal;
