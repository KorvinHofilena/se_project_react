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
    </div>
  );
}

export default SideBar;
