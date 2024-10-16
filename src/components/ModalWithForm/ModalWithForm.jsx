import "./ModalWithForm.css";

function ModalWithForm({
  children,
  title,
  closePopup,
  isOpen,
  onSubmit,
  buttonText,
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <p className="modal__title">{title}</p>
        <button
          className="modal__button_type_close"
          type="button"
          onClick={closePopup}
        />
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
          <button type="submit" className="modal__button_type_submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
