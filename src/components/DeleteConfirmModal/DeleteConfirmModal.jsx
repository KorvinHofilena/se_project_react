import "./DeleteConfirmModal.css";

function DeleteConfirmModal({ activeModal, onClose, onDelete }) {
  return (
    <div className={`modal ${activeModal === "delete-item" && "modal_opened"}`}>
      <div className="delete-modal__content">
        <button
          className="modal__close"
          type="button"
          onClick={onClose}
        ></button>
        <p className="delete-modal__heading">
          Are you sure you want to delete this item? This action is
          irreversible.
        </p>
        <button
          type="submit"
          className="delete-modal__confirm"
          onClick={onDelete}
        >
          Yes, delete item
        </button>
        <button
          className="delete-modal__cancel"
          onClick={onClose}
          type="submit"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteConfirmModal;
