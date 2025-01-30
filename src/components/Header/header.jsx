import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import RegisterModal from "../RegisterModal/RegisterModal";
import CurrentUserContext from "../../context/CurrentUserContext";
import { useContext } from "react";

function Header({
  handleAddClick,
  weatherData,
  activeModal,
  isLoggedIn,
  handleRegisterModal,
  handleLoginModal,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const CurrentUser = useContext(CurrentUserContext);
  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="header logo" />
      </Link>
      <p className="header__date_time">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />
      {isLoggedIn ? (
        <>
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add_clothes"
          >
            + Add Clothes
          </button>
          <Link to="/profile" className="Profile__header-link">
            <div className="header__user_info">
              <p className="header__username">{CurrentUser.name}</p>{" "}
              <img
                src={CurrentUser.avatar}
                alt="Terrence Tegegne"
                className="header__user_avatar"
              />
            </div>
          </Link>
        </>
      ) : (
        <div className={` ${activeModal === "login" && "modal_opened"}`}>
          <button
            onClick={handleRegisterModal}
            className="header__signup"
            type="button"
          >
            Sign Up
          </button>
          <button
            onClick={handleLoginModal}
            className="header__login"
            type="button"
          >
            Log In
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
