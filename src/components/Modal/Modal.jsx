import { useEffect } from "react";

export const Modal = ({ name, onClose, children, isOpen }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`modal modal_type_${name} ${isOpen ? "modal_opened" : ""}`}
      onClick={handleOverlayClick}
    >
      <div className="modal__container">
        <button
          className="modal__close"
          type="button"
          aria-label="Close modal"
          onClick={onClose}
        />
        {children}
      </div>
    </div>
  );
};
