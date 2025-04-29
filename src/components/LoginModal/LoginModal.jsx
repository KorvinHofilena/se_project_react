// src/components/LoginModal/LoginModal.jsx
import "./LoginModal.css";
import { useFormAndValidation } from "../../utils/UseFormAndValidation";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({ handleLogin, isOpen, onClose, setActiveModal }) {
  const { values, handleChange, isValid, resetForm } = useFormAndValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(values);
    resetForm({ email: "", password: "" });
  };

  const handleAltButtonClick = () => {
    setActiveModal("signup");
  };

  return (
    <ModalWithForm
      title="Login"
      buttonText="Login"
      altButtonText="or Sign up"
      altButtonClick={handleAltButtonClick}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      formValid={isValid}
      onClose={onClose}
    >
      <label className="modal__label" htmlFor="email-login">
        Email
      </label>
      <input
        className="modal__input"
        id="email-login"
        name="email"
        type="email"
        minLength="4"
        maxLength="64"
        placeholder="Email"
        value={values.email || ""}
        onChange={handleChange}
        required
      />

      <label className="modal__label" htmlFor="password-login">
        Password
      </label>
      <input
        className="modal__input"
        id="password-login"
        name="password"
        type="password"
        placeholder="Password"
        value={values.password || ""}
        onChange={handleChange}
        required
      />
    </ModalWithForm>
  );
}

export default LoginModal;
