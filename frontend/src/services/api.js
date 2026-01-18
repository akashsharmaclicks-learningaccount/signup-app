import axios from "axios";
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});
export const signupUser = (userData) => {
  return API.post("/signup", userData);
};

export const loginUser = (userData) => {
  return API.post("/login", userData);
};
