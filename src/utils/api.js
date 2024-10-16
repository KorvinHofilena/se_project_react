const baseURL = "http://localhost:3001";

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error: ${res.status}`);
  }
};

const request = (url, options) => {
  return fetch(`${baseURL}/${url}`, options).then(checkResponse);
};

const getServerItems = () => {
  return request(`items`);
};

const addServerItem = (newCard) => {
  return request(`items`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      _id: newCard._id,
      name: newCard.name,
      imageUrl: newCard.imageUrl,
      weather: newCard.weather,
    }),
  });
};

const deleteServerItem = (id) => {
  return request(`items/${id}`, {
    method: "DELETE",
  });
};

export { getServerItems, addServerItem, deleteServerItem, checkResponse };
