import "./DeleteConfirm.css";
function DeleteConfirm({
  activeModal,
  closeActiveModal,
  selectedCard,
  handleDeleteCard,
}) {
  const onCardDelete = () => {
    handleDeleteCard(selectedCard);
  };
  return (
    <div
      className={`modal ${
        activeModal === "delete-confirmation" && "modal_opened"
      }`}
    >
      <div className="modal__form modal__content modal__content_delete">
        <button onClick={closeActiveModal} className="modal__close"></button>
        <p className="modal__delete_text">
          Are you sure you want to delete this item? This action is
          irreversible.
        </p>
        <div>
          <button className="confirm__delete_btn" onClick={onCardDelete}>
            Yes,Delete
          </button>
          <button onClick={closeActiveModal} className="cancel__delete_btn">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
export default DeleteConfirm;
