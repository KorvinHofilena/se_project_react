import "./Header.css";
import logo from "../../assets/logo.svg";
import avatarPlaceholder from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Header({
  handleAddClick,
  weatherData,
  isLoggedIn,
  handleRegisterModal,
  handleLoginModal,
}) {
  const currentUser = useContext(CurrentUserContext);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__left">
        <Link to="/" className="header__logo-link">
          <img className="header__logo" src={logo} alt="WTWR Logo" />
        </Link>
        <p className="header__date">
          {currentDate}, {weatherData.city}
        </p>
      </div>

      <div className="header__right">
        <ToggleSwitch />
        {isLoggedIn ? (
          <>
            <button
              onClick={handleAddClick}
              className="header__add-button"
              type="button"
            >
              + Add clothes
            </button>
            <Link to="/profile" className="header__profile-link">
              <p className="header__username">{currentUser?.name || "User"}</p>
              <img
                src={currentUser?.avatar || avatarPlaceholder}
                alt={currentUser?.name || "User Avatar"}
                className="header__avatar"
              />
            </Link>
          </>
        ) : (
          <div className="header__auth-buttons">
            <button
              onClick={handleRegisterModal}
              className="header__auth-button"
              type="button"
            >
              Sign Up
            </button>
            <button
              onClick={handleLoginModal}
              className="header__auth-button"
              type="button"
            >
              Log In
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
