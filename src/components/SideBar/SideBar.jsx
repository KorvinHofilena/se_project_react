import "./SideBar.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import avatarPlaceholder from "../../assets/avatar.png";

function SideBar({ handleEditProfileClick, onLogout }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="side-bar">
      <div className="side-bar__avatar-container">
        <img
          src={currentUser?.avatar || avatarPlaceholder}
          alt={currentUser?.name || "User Avatar"}
          className="side-bar__avatar"
        />
        <p className="side-bar__username">
          {currentUser?.name || "Guest User"}
        </p>
      </div>
      <div className="side-bar__buttons-container">
        <button
          onClick={handleEditProfileClick}
          className="side-bar__edit-profile-btn"
        >
          Edit Profile
        </button>
        <button onClick={onLogout} className="side-bar__logout-btn">
          Log out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
