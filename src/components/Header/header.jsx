import React from "react";
import "./Header.css";

function Header({ weather }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__logo">WTWR</div>
      <div className="header__date">{currentDate}</div>
      <div className="header__location">
        {weather ? weather.city : "Loading..."}
      </div>
      <button className="header__add-button">Add Clothes</button>
      <div className="header__user">
        <img className="header__avatar" src="avatar.png" alt="User Avatar" />
        <span className="header__name">Redux</span>
      </div>
    </header>
  );
}

export default Header;
