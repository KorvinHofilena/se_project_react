const baseUrl = "http://localhost:3001";

export const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

const getCardData = () => {
  return fetch(`${baseUrl}/items`).then(checkResponse);
};

const addItem = (data) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: data.name,
      imageUrl: data.imageUrl,
      weather: data.weather,
    }),
  }).then(checkResponse);
};

const deleteItem = (id) => {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  }).then(checkResponse);
};

const likeItem = (id) => {
  return fetch(`${baseUrl}/items/${id}/like`, {
    method: "PUT",
  }).then(checkResponse);
};

const unlikeItem = (id) => {
  return fetch(`${baseUrl}/items/${id}/like`, {
    method: "DELETE",
  }).then(checkResponse);
};

export { getCardData, addItem, deleteItem, likeItem, unlikeItem };
