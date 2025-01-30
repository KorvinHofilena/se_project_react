import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";
function Profile({
  onCardClick,
  handleAddClick,
  items,
  handleEditModal,
  handleSignout,
  handleCardLike,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar
          handleEditModal={handleEditModal}
          handleSignout={handleSignout}
        />
      </section>
      <section className="profile__clothig-items">
        <ClothesSection
          onCardClick={onCardClick}
          handleAddClick={handleAddClick}
          items={items}
          handleCardLike={handleCardLike}
        />
      </section>
    </div>
  );
}
export default Profile;
