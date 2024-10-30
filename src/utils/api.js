// Api.js
const baseUrl = "http://localhost:3001";

export const getServerItems = () => {
  return fetch(`${baseUrl}/items`).then((res) => res.json());
};

export const addServerItem = (item) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  }).then((res) => res.json());
};

export const deleteServerItem = (id) => {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  }).then((res) => res.json());
};
