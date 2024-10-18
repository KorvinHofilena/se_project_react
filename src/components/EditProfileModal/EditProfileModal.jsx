import "../ModalWithForm/ModalWithForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../utils/UseFormAndValidation";
import { useContext, useEffect } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function EditProfileModal({
  handleEditProfile,
  isOpen,
  isLoading,
  onClose,
  setActiveModal,
}) {
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation();

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setValues({ name: currentUser?.name, avatar: currentUser?.avatar });
  }, [isOpen, setValues, currentUser]);

  const handleSubmit = () => {
    handleEditProfile(values, resetCurrentForm);
  };

  const resetCurrentForm = () => {
    resetForm({ username: "", avatarUrl: "" });
  };

  return (
    <ModalWithForm
      title="change profile data"
      buttonText={isLoading ? "Updating" : "Save changes"}
      altButtonText={""}
      altButtonClick={() => setActiveModal("register")}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      formValid={isValid}
      onClose={onClose}
    >
      <label className="modal__label" htmlFor="name-edit-profile">
        Name *
      </label>
      <input
        className="modal__input"
        id="name-edit-profile"
        minLength="4"
        maxLength="33"
        name="name"
        type="text"
        value={values.name || ""}
        onChange={handleChange}
        required
      />
      <span
        className={`modal__input-error ${
          errors.name ? "modal__input-error_visible" : ""
        }`}
        id="name-error"
      >
        {errors.name}
      </span>
      <label className="modal__label" htmlFor="avatar-edit-profile">
        Avatar *
      </label>
      <input
        className="modal__input"
        id="avatar-edit-profile"
        name="avatar"
        type="url"
        value={values.avatar || ""}
        onChange={handleChange}
        required
      />
      <span
        className={`modal__input-error ${
          errors.avatar ? "modal__input-error_visible" : ""
        }`}
        id="avatarUrl-error"
      >
        {errors.avatar}
      </span>
    </ModalWithForm>
  );
}

export default EditProfileModal;
