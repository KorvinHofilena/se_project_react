const BASE_URL =
  "mongodb+srv://hofilenakorvin:HnGbkzYSjs5kBoJh@cluster0.lo8fk.mongodb.net/myDatabaseName?retryWrites=true&w=majority";

const registerUser = ({ name, email, password }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  }).then((res) => {
    if (!res.ok) return Promise.reject("Failed to register user");
    return res.json();
  });
};

const logIn = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    if (!res.ok) return Promise.reject("Failed to login");
    return res.json();
  });
};

const getUserProfile = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    if (!res.ok) return Promise.reject("Failed to get user profile");
    return res.json();
  });
};

const editUserProfile = ({ name, avatar }, token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar }),
  }).then((res) => {
    if (!res.ok) return Promise.reject("Failed to edit user profile");
    return res.json();
  });
};

const addCardLike = (cardId, token) => {
  return fetch(`${BASE_URL}/cards/${cardId}/likes`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    if (!res.ok) return Promise.reject("Failed to like card");
    return res.json();
  });
};

const removeCardLike = (cardId, token) => {
  return fetch(`${BASE_URL}/cards/${cardId}/likes`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    if (!res.ok) return Promise.reject("Failed to remove like from card");
    return res.json();
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
