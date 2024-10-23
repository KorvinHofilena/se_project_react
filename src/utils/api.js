import { processServerResponse } from "../utils/utils";
import { getToken } from "../utils/token";

const baseUrl = "http://localhost:3001"; // Mock server running on port 3001

// Fetch all items from the server (garments)
export const getServerItems = () => {
  return fetch(`${baseUrl}/items`)
    .then(processServerResponse)
    .catch((err) => console.error("Error fetching items:", err));
};

// Add a new item to the server (garments)
export const addServerItem = ({ name, weather, imageUrl }, token) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, weather, imageUrl }),
  }).then(processServerResponse);
};

// Delete an item from the server
export const deleteServerItem = (id, token) => {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(processServerResponse);
};

// Add a like to an item
export const addCardLike = (id) => {
  const token = getToken();
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(processServerResponse);
};

// Remove a like from an item
export const removeCardLike = (id) => {
  const token = getToken();
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(processServerResponse);
};

// Update user data on the server
export const updateUserData = (data) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    body: JSON.stringify(data),
  }).then(processServerResponse);
};
