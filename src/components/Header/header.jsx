import { Link } from "react-router-dom";
import { useContext } from "react";

import "./Header.css";

import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import logo from "../../assets/logo.png";

function Header({
  info,
  handler,
  isLoggedIn,
  handleRegisterClick,
  handleLoginClick,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const currentUser = useContext(CurrentUserContext);

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="Logo" />
      </Link>
      <p className="header__date-location">
        {currentDate}, {info.location}
      </p>
      <div className="header__user-space">
        <ToggleSwitch />
        {isLoggedIn ? (
          <>
            <button
              className="header__button"
              type="button"
              id="header-add-button"
              onClick={handler}
            >
              + Add clothes
            </button>
            <div className="header__user-info">
              <Link to="/profile" className="header__link">
                <p className="header__username">{currentUser.name}</p>
              </Link>
              {currentUser.avatar ? (
                <img
                  className="header__avatar"
                  src={currentUser.avatar}
                  alt="Avatar"
                />
              ) : (
                <div className="header__avatar-placeholder">
                  {currentUser.name.split("")[0]}
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="header__auth-container">
            <button
              className="header__button"
              id="header-register-button"
              onClick={handleRegisterClick}
            >
              Sign Up
            </button>
            <button
              className="header__button"
              onClick={handleLoginClick}
              id="header-login-button"
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
