import api from "./api.js";

async function fetchUserData(userId) {
  try {
    const result = await api.get(`/user/${userId}`);
    const userData = result.data;
    console.log("User data:", userData);
    return userData;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
}

async function signupUser(userData) {
  try {
    const response = await api.post("/api/signup", userData);
    const newUser = response.data.user;
    console.log("New user created:", newUser);
    return newUser;
  } catch (error) {
    console.error("Error signing up user:", error);
    throw error;
  }
}

export { fetchUserData, signupUser };
