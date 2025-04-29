// src/components/EditProfileModal/EditProfileModal.jsx
import { useState, useEffect, useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./EditProfileModal.css";

function EditProfileModal({ isOpen, onClose, onSubmit }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "");
      setAvatar(currentUser.avatar || "");
    }
  }, [currentUser]);

  useEffect(() => {
    const isValid = name.trim().length >= 2 && avatar.trim() !== "";
    setFormValid(isValid);
  }, [name, avatar]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, avatar }); // 🔥 correctly call onSubmit now
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Edit Profile"
      buttonText="Save Changes"
      formValid={formValid}
    >
      <label className="modal__label">
        Name
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
          className="modal__input"
          minLength="2"
        />
      </label>
      <label className="modal__label">
        Avatar URL
        <input
          type="url"
          name="avatar"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          placeholder="Avatar URL"
          required
          className="modal__input"
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
