// Profile.jsx
import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({
  handleEditProfileClick,
  onCardClick,
  clothingItems,
  handleAddClick,
  handleLogout,
  onCardLike,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar
          handleEditProfileClick={handleEditProfileClick}
          onLogout={handleLogout}
        />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          settingArray={clothingItems}
          handler={onCardClick}
          onClick={handleAddClick}
          onCardLike={onCardLike}
        />
      </section>
    </div>
  );
}

export default Profile;
