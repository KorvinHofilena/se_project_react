import React, { useState } from "react";
import EditProfileModal from "./EditProfileModal"; // Adjust the import according to your project structure

const ParentComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: "John Doe",
    avatar: "https://example.com/avatar.jpg",
  });

  // Close the modal
  const closeActiveModal = () => {
    setIsModalOpen(false);
  };

  // This is the handleEditProfile function that will be passed to EditProfileModal
  const handleEditProfile = (updatedProfile) => {
    // Update the user profile state
    setCurrentUser(updatedProfile);

    // Optionally log the updated profile
    console.log("Updated Profile:", updatedProfile);

    // Close the modal after the update
    setIsModalOpen(false);
  };

  return (
    <div>
      {/* Button to open the modal */}
      <button onClick={() => setIsModalOpen(true)}>Edit Profile</button>

      {/* Pass the handleEditProfile function to EditProfileModal */}
      <EditProfileModal
        closeActiveModal={closeActiveModal}
        isOpen={isModalOpen}
        handleEditProfile={handleEditProfile} // Passing the function as a prop
      />
    </div>
  );
};

export default ParentComponent;
