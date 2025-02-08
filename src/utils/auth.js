const baseUrl =
  (typeof process !== "undefined" &&
    process.env &&
    process.env.REACT_APP_BASE_URL) ||
  "http://localhost:3001";

export async function signUserIn(data) {
  try {
    const res = await fetch(`${baseUrl}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || "Error during sign in");
    }

    return result;
  } catch (error) {
    console.error("Sign-in error:", error);
    throw error;
  }
}

export async function signUserUp(data) {
  try {
    const res = await fetch(`${baseUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || "Error during sign up");
    }

    return result;
  } catch (error) {
    console.error("Sign-up error:", error);
    throw error;
  }
}

export async function fetchUserData(token) {
  if (!token) {
    throw new Error("Token is missing");
  }

  try {
    const response = await fetch(`${baseUrl}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Error fetching user data");
    }
    return data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
}

export async function signUserOut() {
  try {
    const res = await fetch(`${baseUrl}/signout`, {
      method: "POST",
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Error during sign out");
    }

    return { message: "Successfully signed out" };
  } catch (error) {
    console.error("Sign-out error:", error);
    throw error;
  }
}

export async function refreshToken() {
  try {
    const res = await fetch(`${baseUrl}/refresh-token`, {
      method: "POST",
      credentials: "include",
    });

    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || "Error refreshing token");
    }

    return result;
  } catch (error) {
    console.error("Token refresh error:", error);
    throw error;
  }
}

export async function updateUserDetails(token, userData) {
  if (!token) {
    throw new Error("Token is missing");
  }

  try {
    const res = await fetch(`${baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || "Error updating user details");
    }

    return result;
  } catch (error) {
    console.error("Error updating user details:", error);
    throw error;
  }
}

export async function addCardLike(token, cardId) {
  if (!token) {
    throw new Error("Token is missing");
  }

  try {
    const res = await fetch(`${baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || "Error adding like to card");
    }

    return result;
  } catch (error) {
    console.error("Error adding like to card:", error);
    throw error;
  }
}

export async function removeCardLike(token, cardId) {
  if (!token) {
    throw new Error("Token is missing");
  }

  try {
    const res = await fetch(`${baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || "Error removing like from card");
    }

    return result;
  } catch (error) {
    console.error("Error removing like from card:", error);
    throw error;
  }
}
