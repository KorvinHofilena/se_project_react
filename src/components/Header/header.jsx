import { Link } from "react-router-dom";

import "./Header.css";

import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

import logo from "../../assets/logo.png";
import avatar from "../../assets/avatar.png";

function Header({ info, handler }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

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
        <button className="header__add-button" type="button" onClick={handler}>
          + Add clothes
        </button>
        <div className="header__user-info">
          <Link to="/profile" className="header__link">
            <p className="header__username">Terrence Tegegne</p>
          </Link>
          <img className="header__avatar" src={avatar} alt="Avatar" />
        </div>
      </div>
    </header>
  );
}

export default Header;
