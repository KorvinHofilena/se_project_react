import { Link } from "react-router-dom";
import { useContext } from "react";
import "./Header.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import logo from "../../assets/logo.png";
import avatarPlaceholder from "../../assets/avatar.png";

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
  console.log("Header currentUser:", currentUser);

  return (
    <header className="header">
      <div className="header__logo-and-date">
        <Link to="/">
          <img className="header__logo" src={logo} alt="Logo" />
        </Link>
        <p className="header__date-and-location">
          {currentDate}, {info?.location || "Tokyo, Japan"}
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
              <img
                className="header__user-avatar"
                src={currentUser?.avatar || avatarPlaceholder}
                alt="User Avatar"
              />
            </div>
          </>
        ) : null}
      </div>
    </header>
  );
}

export default Header;
