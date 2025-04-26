import { useState, useEffect, useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext"; // Named import
import "./EditProfileModal.css";

const EditProfileModal = ({ closeActiveModal, isOpen, handleEditProfile }) => {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [errors, setErrors] = useState({ name: "", avatar: "" });

  // Validate form inputs
  const validateForm = () => {
    let isValid = true;
    let errors = { name: "", avatar: "" };

    if (!name.trim()) {
      errors.name = "Name is required.";
      isValid = false;
    }

    if (!avatar.trim()) {
      errors.avatar = "Image URL is required.";
      isValid = false;
    } else if (!/^https?:\/\/.+/.test(avatar)) {
      errors.avatar = "Invalid URL format.";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleEditProfile({ name, avatar });
      closeActiveModal(); // Close the modal after successful submission
    }
  };

  // Handle input changes
  const handleNameChange = (e) => setName(e.target.value);
  const handleAvatarChange = (e) => setAvatar(e.target.value);

  // Handle button activation based on form validation
  useEffect(() => {
    if (name.trim() && avatar.trim() && !errors.name && !errors.avatar) {
      setIsButtonActive(true);
    } else {
      setIsButtonActive(false);
    }
  }, [name, avatar, errors]);

  // Reset the form when the modal is opened
  useEffect(() => {
    if (isOpen && currentUser) {
      setName(currentUser.name || "");
      setAvatar(currentUser.avatar || "");
      setErrors({ name: "", avatar: "" });
    }
  }, [isOpen, currentUser]);

  return (
    <ModalWithForm
      title="Change Profile Data"
      buttonText="Save Changes"
      buttonClass={`modal__submit ${
        isButtonActive ? "modal__submit_active" : ""
      }`}
      isOpen={isOpen}
      onClose={closeActiveModal}
      onSubmit={handleSubmit}
      name={"editprofile"}
    >
      <button
        className="modal__close"
        type="button"
        onClick={closeActiveModal}
      />
      <label className="modal__label">
        Name *
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
          required
        />
        {errors.name && <span className="modal__error">{errors.name}</span>}
      </label>
      <label className="modal__label">
        Avatar *
        <input
          type="url"
          className="modal__input"
          id="avatar"
          placeholder="Image URL"
          value={avatar}
          onChange={handleAvatarChange}
          required
        />
        {errors.avatar && <span className="modal__error">{errors.avatar}</span>}
      </label>
    </ModalWithForm>
  );
};

export default EditProfileModal;
