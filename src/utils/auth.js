const BASE_URL = "http://localhost:3001";

const registerUser = ({ name, email, password, avatar = "" }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password, avatar }),
  })
    .then((response) => {
      if (!response.ok) {
        return Promise.reject("Failed to register user");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Registration Error:", error);
      throw error;
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
