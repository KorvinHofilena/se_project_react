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
        if (response.status === 409) {
          return Promise.reject("Email already exists.");
        }
        return Promise.reject("Failed to register user.");
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

// ✅ Updated endpoints to /items/:id/likes
const addCardLike = (itemId, token) => {
  return fetch(`${BASE_URL}/items/${itemId}/likes`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    if (!res.ok) return Promise.reject("Failed to like item");
    return res.json();
  });
};

const removeCardLike = (itemId, token) => {
  return fetch(`${BASE_URL}/items/${itemId}/likes`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    if (!res.ok) return Promise.reject("Failed to remove like from item");
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
