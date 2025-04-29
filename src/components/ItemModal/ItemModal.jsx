// src/components/ItemModal/ItemModal.jsx
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { Modal } from "../Modal/Modal"; // ✅ Correct import of Modal.js
import "./ItemModal.css";
import closeButtonImage from "../../assets/CloseButton.png"; // ✅

function ItemModal({ activeModal, onClose, card, onDeleteClick }) {
  const currentUser = useContext(CurrentUserContext);

  if (!card) return null;

  const isOwn = currentUser?._id === card?.owner;

  const handleDeleteClick = () => {
    if (typeof onDeleteClick === "function") {
      onDeleteClick(card);
    }
  };

  return (
    <Modal name="preview" isOpen={activeModal === "preview"} onClose={onClose}>
      <div className="modal__content_type_image">
        <button onClick={onClose} type="button" className="modal__close">
          <img
            src={closeButtonImage}
            alt="Close"
            className="modal__close-image"
          />
        </button>

        <img src={card.imageUrl} alt={card.name} className="modal__image" />

        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          {isOwn && (
            <button className="modal__delete-card" onClick={handleDeleteClick}>
              Delete item
            </button>
          )}
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </Modal>
  );
}

export default ItemModal;
