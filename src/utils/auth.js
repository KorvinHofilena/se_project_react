const baseUrl =
  (typeof process !== "undefined" &&
    process.env &&
    process.env.REACT_APP_BASE_URL) ||
  "http://localhost:3001";

import { processServerResponse } from "./utils";

console.log("Base URL in auth.js:", baseUrl);

const getHeaders = (token = null) => ({
  Accept: "application/json",
  "Content-Type": "application/json",
  ...(token && { authorization: `Bearer ${token}` }),
});

export async function signUserUp({ name, avatar, email, password }) {
  try {
    const response = await fetch(`${baseUrl}/signup`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ name, avatar, email, password }),
    });
    return processServerResponse(response);
  } catch (error) {
    console.error("Error signing up:", error.message);
    throw error;
  }
}

export async function signUserIn({ email, password }) {
  try {
    const response = await fetch(`${baseUrl}/signin`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ email, password }),
    });
    return processServerResponse(response);
  } catch (error) {
    console.error("Error signing in:", error.message);
    throw error;
  }
}

export async function updateUser(newData, token) {
  try {
    const response = await fetch(`${baseUrl}/users/me`, {
      method: "PATCH",
      headers: getHeaders(token),
      body: JSON.stringify(newData),
    });
    return processServerResponse(response);
  } catch (error) {
    console.error("Error updating user:", error.message);
    throw error;
  }
}

export async function getUserByToken(token) {
  try {
    const response = await fetch(`${baseUrl}/users/me`, {
      method: "GET",
      headers: getHeaders(token),
    });
    return processServerResponse(response);
  } catch (error) {
    console.error("Error fetching user by token:", error.message);
    throw error;
  }
}
