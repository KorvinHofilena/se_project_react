import { useState, useEffect, useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./EditProfileModal.css"; // Ensure this line is there

function EditProfileModal({ isOpen, onClose, onSubmit }) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "");
      setAvatar(currentUser.avatar || "");
    }
  }, [currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, avatar });
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Edit Profile"
    >
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <input
        type="url"
        value={avatar}
        onChange={(e) => setAvatar(e.target.value)}
        placeholder="Avatar URL"
      />
      <button type="submit">Save Changes</button>
    </ModalWithForm>
  );
}

export default EditProfileModal;
