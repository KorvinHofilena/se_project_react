import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
function AddItemModal({ closeActiveModal, isOpen, handleAddItemSubmit }) {
  const [name, setName] = useState("");
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const [imageUrl, setUrl] = useState("");
  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const [weather, setWeather] = useState("");
  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
  };
  const resetForm = () => {
    setName("");
    setUrl("");
    setWeather("");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, imageUrl, weather });
    handleAddItemSubmit({ name, imageUrl, weather }, resetForm);
  };
  const handleClose = (e) => {
    resetForm();
    closeActiveModal();
  };

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      onClose={closeActiveModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      handleClose={handleClose}
    >
      <label className="modal__label">
        Name{""}
        <input
          type="text"
          className="modal__input"
          id="item-name"
          placeholder="Name"
          minLength="1"
          maxLength="30"
          value={name}
          onChange={handleNameChange}
        />
      </label>
      <label className="modal__label">
        Image{""}
        <input
          type="Url"
          className="modal__input"
          id="imageURL"
          placeholder="Image URL"
          onChange={handleUrlChange}
          value={imageUrl}
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label className=" modal__label_type_radio">
          <input
            type="radio"
            className="modal__radio-input"
            id="hot"
            value="hot"
            name="weatherType"
            checked={weather === "hot"}
            onChange={handleWeatherChange}
            required
          />
          Hot
        </label>
        <label className=" modal__label_type_radio">
          <input
            type="radio"
            className="modal__radio-input"
            id="warm"
            value="warm"
            name="weatherType"
            checked={weather === "warm"}
            onChange={handleWeatherChange}
            required
          />
          Warm
        </label>
        <label className="modal__label_type_radio">
          <input
            type="radio"
            className="modal__radio-input"
            id="cold"
            name="weatherType"
            checked={weather === "cold"}
            onChange={handleWeatherChange}
            value="cold"
            required
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}
export default AddItemModal;
