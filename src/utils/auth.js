import { checkResponse } from "./api"; // Correct the import path if necessary

const BASE_URL = "http://localhost:3001";

// Function to register a user
const registerUser = ({ name, email, password, avatar = "" }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password, avatar }),
  })
    .then(checkResponse) // Use checkResponse to handle the response
    .catch((error) => {
      console.error("Registration Error:", error);
      throw error;
    });
};

// Function to log in a user
const logIn = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then(checkResponse) // Use checkResponse to handle the response
    .catch((error) => {
      console.error("Login Error:", error);
      throw error;
    });
};

// Function to get user profile
const getUserProfile = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(checkResponse) // Use checkResponse to handle the response
    .catch((error) => {
      console.error("Get Profile Error:", error);
      throw error;
    });
};

// Function to edit user profile
const editUserProfile = ({ name, avatar }, token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar }),
  })
    .then(checkResponse) // Use checkResponse to handle the response
    .catch((error) => {
      console.error("Edit Profile Error:", error);
      throw error;
    });
};

// Function to add a like to a card
const addCardLike = (itemId, token) => {
  return fetch(`${BASE_URL}/items/${itemId}/likes`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(checkResponse)
    .catch((error) => {
      console.error("Add Like Error:", error);
      throw error;
    });
};

const removeCardLike = (itemId, token) => {
  return fetch(`${BASE_URL}/items/${itemId}/likes`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(checkResponse)
    .catch((error) => {
      console.error("Remove Like Error:", error);
      throw error;
    });
};

export {
  registerUser,
  logIn,
  getUserProfile,
  editUserProfile,
  addCardLike,
  removeCardLike,
};
