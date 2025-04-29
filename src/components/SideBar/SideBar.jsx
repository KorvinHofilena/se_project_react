// src/components/SideBar/SideBar.jsx
import "./SideBar.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import avatarPlaceholder from "../../assets/avatar.png";

function SideBar({ handleEditProfileClick, onLogout }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <div className="sidebar__user-info">
        <img
          src={currentUser?.avatar || avatarPlaceholder}
          alt={currentUser?.name || "User Avatar"}
          className="sidebar__avatar"
        />
        <p className="sidebar__username">{currentUser?.name || "Guest User"}</p>
      </div>
      <div className="sidebar__buttons">
        <button
          type="button"
          className="sidebar__button"
          onClick={handleEditProfileClick}
        >
          Change profile data
        </button>
        <button type="button" className="sidebar__button" onClick={onLogout}>
          Log out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
