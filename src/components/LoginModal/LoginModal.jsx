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
      altButtonText="or Sign Up"
      altButtonClick={handleAltButtonClick}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      formValid={isValid}
      onClose={onClose}
    >
      <label className="modal__label">
        Email
        <input
          className="modal__input"
          name="email"
          type="email"
          placeholder="Email"
          value={values.email || ""}
          onChange={handleChange}
          required
        />
      </label>

      <label className="modal__label">
        Password
        <input
          className="modal__input"
          name="password"
          type="password"
          placeholder="Password"
          value={values.password || ""}
          onChange={handleChange}
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;
