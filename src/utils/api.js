// api.js

const baseUrl = "http://localhost:3001";

// Function to check if the response is OK
export const checkResponse = (res) => {
  if (!res.ok) {
    return Promise.reject(`Error: ${res.status}`);
  }
  return res.json();
};

const getAuthHeaders = () => {
  const token = localStorage.getItem("jwt");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const getServerItems = () => {
  return fetch(`${baseUrl}/items`, {
    headers: getAuthHeaders(),
  }).then(checkResponse);
};

export const addServerItem = (item) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(item),
  }).then(checkResponse);
};

export const deleteServerItem = (id) => {
  if (!id) {
    return Promise.reject("Item ID is required for deletion");
  }
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  }).then(checkResponse);
};

export const toggleLike = (id, isLiked) => {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: isLiked ? "DELETE" : "POST",
    headers: getAuthHeaders(),
  }).then(checkResponse);
};

export const fetchUserData = () => {
  return fetch(`${baseUrl}/users/me`, {
    headers: getAuthHeaders(),
  }).then(checkResponse);
};
