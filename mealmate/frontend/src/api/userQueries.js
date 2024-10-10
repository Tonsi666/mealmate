import api from "./api.js";

async function fetchUserData(token) {
  try {
    const response = await api.get("/api/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const userData = response.data;
    console.log("User data:", userData);
    return userData;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
}

async function signupUser(userData) {
  try {
    const response = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Signup failed");
    }

    const newUser = await response.json();
    console.log("New user created:", newUser);
    return newUser;
  } catch (error) {
    console.error("Error signing up user:", error);
    throw error;
  }
}

async function loginUser(userData) {
  try {
    const response = await api.post("/api/login", userData);
    const token = response.data.token;
    console.log("User logged in, token received:", token);
    localStorage.setItem("token", token);
    return token;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
}

export { fetchUserData, signupUser, loginUser };
