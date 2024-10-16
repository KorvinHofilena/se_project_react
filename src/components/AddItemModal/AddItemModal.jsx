import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";

function AddItemModal({ selectedPopup, onClose, onAddItem }) {
  const [name, setName] = useState("");
  const handleNameChange = (evt) => {
    setName(evt.target.value);
  };
  const [url, setUrl] = useState("");
  const handleUrlChange = (evt) => {
    setUrl(evt.target.value);
  };

  const [type, setType] = useState("");
  const handleTypeChange = (evt) => {
    setType(evt.target.id);
  };

  const resetInputs = () => {
    setName("");
    setUrl("");
  };

  const _handleSubmit = (evt) => {
    evt.preventDefault();
    onAddItem(name, url, type, resetInputs);
  };

  return (
    <ModalWithForm
      title="New garnment"
      closePopup={onClose}
      isOpen={selectedPopup === "popup-add"}
      onSubmit={_handleSubmit}
      buttonText="Add garnment"
    >
      <label className="modal__label">
        Name
        <input
          className="modal__input"
          id="name"
          placeholder="Name"
          type="text"
          required
          value={name}
          onChange={handleNameChange}
        />
      </label>
      <label className="modal__label">
        Image
        <input
          className="modal__input"
          id="imageUrl"
          placeholder="Image Url"
          type="url"
          required
          value={url}
          onChange={handleUrlChange}
        />
      </label>
      <fieldset className="modal__fieldset" onChange={handleTypeChange}>
        <legend className="modal__legend">Select the weather type:</legend>
        <label className="modal__label_type_radio">
          <input
            className="modal__input_type_radio"
            id="hot"
            name="radio-button"
            type="radio"
            required
          />
          Hot
        </label>
        <label className="modal__label_type_radio">
          <input
            className="modal__input_type_radio"
            id="warm"
            name="radio-button"
            type="radio"
            required
          />
          Warm
        </label>
        <label className="modal__label_type_radio">
          <input
            className="modal__input_type_radio"
            id="cold"
            name="radio-button"
            type="radio"
            required
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
