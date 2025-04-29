// src/components/ModalWithForm/ModalWithForm.jsx
import { useEffect } from "react";
import "./ModalWithForm.css";
import closeButtonImage from "../../assets/CloseButton.png";

function ModalWithForm({
  children,
  buttonText,
  altButtonText,
  altButtonClick,
  title,
  isOpen,
  onClose,
  onSubmit,
  formValid,
}) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(e);
    }
  };

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <button
          type="button"
          className="modal__close"
          aria-label="Close"
          onClick={onClose}
        >
          <img
            src={closeButtonImage}
            alt="Close"
            className="modal__close-image"
          />
        </button>
        <h2 className="modal__title">{title}</h2>
        <form onSubmit={handleSubmit} className="modal__form">
          {children}
          <div className="modal__buttons-container">
            <button
              className={`modal__submit modal__el_hovered ${
                !formValid ? "modal__submit_disabled" : ""
              }`}
              type="submit"
              disabled={!formValid}
            >
              {buttonText}
            </button>
            {altButtonText && altButtonClick && (
              <button
                type="button"
                className="modal__text-button modal__el_hovered"
                onClick={altButtonClick}
              >
                {altButtonText}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
