// api.js

const baseUrl = "http://localhost:3001";

export const getServerItems = () => {
  return fetch(`${baseUrl}/items`).then((res) => {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  });
};

export const addServerItem = (item) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
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
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...item, likes: updatedLikes }),
    }).then((res) => {
      if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
      }
      return res.json();
    });
  });
};
