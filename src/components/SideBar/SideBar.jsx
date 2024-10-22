import "./SideBar.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function Sidebar({ handleEditProfileClick, onLogout }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <div className="sidebar__avatar-container">
        <img
          src={currentUser?.avatar}
          alt={currentUser?.name}
          className="sidebar__avatar"
        />

        <p className="sidebar__username">{currentUser?.name}</p>
      </div>

      <div className="sidebar__buttons-container">
        <button
          onClick={handleEditProfileClick}
          className="sidebar__edit-profile-btn"
        >
          Change profile data
        </button>
        <button onClick={onLogout} className="sidebar__logout-btn">
          Log out
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
