import { processServerResponse } from "../utils/utils";
import { getToken } from "../utils/token";

const baseUrl = "http://localhost:3001";

const getServerItems = () => {
  return fetch(`${baseUrl}/items`)
    .then(processServerResponse)
    .catch((err) => console.error("Error fetching items:", err));
};

function addServerItem({ name, weather, imageUrl }, token) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, weather, imageUrl }),
  }).then(processServerResponse);
}

function deleteServerItem(id, token) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(processServerResponse);
}

function addCardLike(id) {
  const token = getToken();
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(processServerResponse);
}

function removeCardLike(id) {
  const token = getToken();
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(processServerResponse);
}

const updateUserData = (data) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    body: JSON.stringify(data),
  }).then(processServerResponse);
};

export {
  updateUserData,
  getServerItems,
  deleteServerItem,
  addServerItem,
  addCardLike,
  removeCardLike,
};
