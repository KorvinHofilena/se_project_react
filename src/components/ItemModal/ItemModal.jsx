import React from "react";
import "./ItemModal.css";

function ItemModal({ item, onClose }) {
  React.useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [onClose]);

  return (
    <div className="modal modal_type_item" onClick={onClose}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="modal__close-button"
          onClick={onClose}
        ></button>
        <img src={item.link} alt={item.name} className="modal__image" />
        <h2 className="modal__title">{item.name}</h2>
      </div>
    </div>
  );
}

export default ItemModal;
