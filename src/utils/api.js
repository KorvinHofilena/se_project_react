const baseUrl = "http://localhost:3001";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const getServerItems = () => {
  return fetch(`${baseUrl}/items`, {
    headers: getAuthHeaders(),
  }).then((res) => {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  });
};

export const addServerItem = (item) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(item),
  }).then((res) => {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  });
};

export const deleteServerItem = (id) => {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  }).then((res) => {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return { message: "Item deleted", id };
  });
};

export const toggleLike = (id, isLiked, userId) => {
  return getServerItems().then((items) => {
    const item = items.find((item) => item.id === id || item._id === id);
    if (!item) {
      return Promise.reject("Item not found");
    }

    const updatedLikes = isLiked
      ? (item.likes || []).filter((likeId) => likeId !== userId)
      : [...(item.likes || []), userId];

    return fetch(`${baseUrl}/items/${item._id || item.id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify({ ...item, likes: updatedLikes }),
    }).then((res) => {
      if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
      }
      return res.json();
    });
  });
};

export const fetchUserData = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  });
};
