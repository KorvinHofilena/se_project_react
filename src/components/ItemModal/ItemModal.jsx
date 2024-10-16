import "./ItemModal.css";

function ItemModal({ isOpen, selectedCard, closePopup, deleteCard }) {
  return (
    <div className={`modal  ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal-item__content">
        <button
          className="modal-item__button_type_close"
          type="button"
          onClick={closePopup}
        />
        <img
          className="modal-item__image"
          src={selectedCard.imageUrl}
          alt={selectedCard.name}
        />
        <div className="modal-item__info">
          <p className="modal-item__name">{selectedCard.name}</p>
          <p className="modal-item__weather-type">
            Weather: {selectedCard.weather}
          </p>
          <button
            className="modal-item__delete"
            type="button"
            onClick={deleteCard}
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
