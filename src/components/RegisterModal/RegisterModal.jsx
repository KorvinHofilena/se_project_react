// src/components/RegisterModal/RegisterModal.jsx
import "./RegisterModal.css";
import { useFormAndValidation } from "../../utils/UseFormAndValidation";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegisterModal({
  handleRegistration,
  isOpen,
  onClose,
  setActiveModal,
}) {
  const { values, handleChange, isValid, resetForm } = useFormAndValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration(values);
    resetForm({ email: "", password: "", name: "", avatar: "" });
  };

  const handleAltButtonClick = () => {
    setActiveModal("login");
  };

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Register"
      altButtonText="or Log in"
      altButtonClick={handleAltButtonClick}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      formValid={isValid}
      onClose={onClose}
    >
      <label className="modal__label" htmlFor="email-register">
        Email *
      </label>
      <input
        className="modal__input"
        id="email-register"
        name="email"
        type="email"
        value={values.email || ""}
        onChange={handleChange}
        required
      />

      <label className="modal__label" htmlFor="password-register">
        Password *
      </label>
      <input
        className="modal__input"
        id="password-register"
        name="password"
        type="password"
        value={values.password || ""}
        onChange={handleChange}
        required
      />

      <label className="modal__label" htmlFor="name-register">
        Name *
      </label>
      <input
        className="modal__input"
        id="name-register"
        name="name"
        type="text"
        value={values.name || ""}
        onChange={handleChange}
        required
      />

      <label className="modal__label" htmlFor="avatar-register">
        Avatar URL
      </label>
      <input
        className="modal__input"
        id="avatar-register"
        name="avatar"
        type="url"
        value={values.avatar || ""}
        onChange={handleChange}
      />
    </ModalWithForm>
  );
}

export default RegisterModal;
