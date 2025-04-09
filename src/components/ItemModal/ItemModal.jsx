import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./ItemModal.css";
import { useState } from "react";

function AddItemModal({ isOpen, closeActiveModal, handleAddItemSubmit }) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddItemSubmit({ name, imageUrl, weather }, () => {
      setName("");
      setImageUrl("");
      setWeather("");
    });
  };

  return (
    <ModalWithForm
      title="New Garment"
      name="add-garment"
      buttonText="Add Garment"
      isOpen={isOpen}
      onClose={closeActiveModal}
      onSubmit={handleSubmit}
      formValid={true} // <-- TEMP FIX until validation is implemented
    >
      <label className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
      </label>

      <label className="modal__label">
        Image
        <input
          type="url"
          className="modal__input"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Image URL"
          required
        />
      </label>

      <label className="modal__label">
        Select the weather type:
        <div className="modal__radio-group">
          <label className="modal__radio-label">
            <input
              type="radio"
              value="hot"
              checked={weather === "hot"}
              onChange={(e) => setWeather(e.target.value)}
              className="modal__radio"
            />
            Hot
          </label>
          <label className="modal__radio-label">
            <input
              type="radio"
              value="warm"
              checked={weather === "warm"}
              onChange={(e) => setWeather(e.target.value)}
              className="modal__radio"
            />
            Warm
          </label>
          <label className="modal__radio-label">
            <input
              type="radio"
              value="cold"
              checked={weather === "cold"}
              onChange={(e) => setWeather(e.target.value)}
              className="modal__radio"
            />
            Cold
          </label>
        </div>
      </label>
    </ModalWithForm>
  );
}

export default AddItemModal;
