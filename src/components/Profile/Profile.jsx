import "./Profile.css";

import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";

function Profile({ settingArray, handler, onClick }) {
  return (
    <div className="profile">
      <SideBar />
      <ClothesSection
        settingArray={settingArray}
        handler={handler}
        onClick={onClick}
      />
    </div>
  );
}

export default Profile;
