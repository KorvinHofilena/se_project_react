import { useContext, useState, useEffect } from "react";

import ModalWithForm from "../ModalWithForm/ModalWithForm";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function EditProfileModal({ selectedPopup, onClose, handleProfileUpdate }) {
  const currentUser = useContext(CurrentUserContext);
  const [data, setData] = useState({
    name: currentUser.name,
    avatar: currentUser.avatar,
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const _handleSubmit = (evt) => {
    evt.preventDefault();
    handleProfileUpdate(data);
    onClose();
  };

  const isOpen = selectedPopup === "popup-update";

  useEffect(() => {
    setData({ name: currentUser.name, avatar: currentUser.avatar });
  }, [isOpen]);

  return (
    <ModalWithForm
      title="Change profile data"
      closePopup={onClose}
      isOpen={isOpen}
      onSubmit={_handleSubmit}
      buttonText="Save changes"
    >
      <label className="modal__label">
        Name*
        <input
          className="modal__input"
          id="name-update-id"
          type="text"
          placeholder="Name"
          required
          minLength="2"
          maxLength="30"
          name="name"
          value={data.name}
          onChange={handleChange}
        />
      </label>
      <label className="modal__label">
        Avatar
        <input
          className="modal__input"
          id="avatar-update-id"
          placeholder="Avatar"
          type="url"
          required
          name="avatar"
          value={data.avatar}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
