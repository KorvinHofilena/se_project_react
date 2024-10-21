import "../Header/header.css";
import logo from "../../assets/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function Header({
  handleAddClick,
  weatherData,
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
          <img src={logo} alt="wtwr logo" className="header__logo" />
        </Link>

        <p className="header__date-and-location">
          {currentDate}, {weatherData.city}
        </p>
      </div>
      <div className="header__temp-and-user">
        <ToggleSwitch />
        {isLoggedIn ? (
          <>
            <button
              onClick={handleAddClick}
              type="button"
              className="header__add-btn"
            >
              + Add clothes
            </button>
            <Link to="/profile" className="header__link">
              <div className="header__user-container">
                <p className="header__user-name">{currentUser?.name}</p>
                {currentUser?.avatar ? (
                  <img
                    src={currentUser?.avatar}
                    alt={currentUser?.name}
                    className="header__user-avatar"
                  />
                ) : (
                  <div className="header__avatar-placeholder">
                    {currentUser?.name?.name.charAt(0).toUpperCase() || ""}
                  </div>
                )}
              </div>
            </Link>
          </>
        ) : (
          <div className="header__auth">
            <button className="header__register" onClick={handleRegisterClick}>
              Sign Up
            </button>
            <button className="header__login" onClick={handleLoginClick}>
              Login
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
