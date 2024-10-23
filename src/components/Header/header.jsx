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
      <div className="header__logo-and-date">
        <Link to="/">
          <img className="header__logo" src={logo} alt="Logo" />
        </Link>
        <p className="header__date-and-location">
          {currentDate}, {info?.location || "Unknown location"}
        </p>
      </div>
      <div className="header__temp-and-user">
        <ToggleSwitch />
        {isLoggedIn ? (
          <>
            <button className="header__add-btn" type="button" onClick={handler}>
              + Add clothes
            </button>
            <div className="header__user-container">
              <Link to="/profile" className="header__link">
                <p className="header__user-name">
                  {currentUser?.name || "Guest"}
                </p>
              </Link>
              {currentUser?.avatar ? (
                <img
                  className="header__user-avatar"
                  src={currentUser.avatar}
                  alt="Avatar"
                />
              ) : (
                <div className="header__user-avatar-placeholder">
                  {currentUser?.name?.charAt(0) || "?"}
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="header__auth-container">
            <button className="header__register" onClick={handleRegisterClick}>
              Sign Up
            </button>
            <button className="header__login" onClick={handleLoginClick}>
              Log In
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
