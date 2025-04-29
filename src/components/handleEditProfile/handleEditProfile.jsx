import React, { useState } from "react";
import EditProfileModal from "./EditProfileModal";

const ParentComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: "John Doe",
    avatar: "https://example.com/avatar.jpg",
  });

  const closeActiveModal = () => {
    setIsModalOpen(false);
  };

  const handleEditProfile = (updatedProfile) => {
    setCurrentUser(updatedProfile);

    console.log("Updated Profile:", updatedProfile);

    setIsModalOpen(false);
  };

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>Edit Profile</button>

      <EditProfileModal
        closeActiveModal={closeActiveModal}
        isOpen={isModalOpen}
        handleEditProfile={handleEditProfile}
      />
    </div>
  );
};

export default ParentComponent;
