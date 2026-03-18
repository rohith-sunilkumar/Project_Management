import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/api/users`;

export const registerUser = (data) =>
  axios.post(`${API}/register`, data, { withCredentials: true });

export const loginUser = (data) =>
  axios.post(`${API}/login`, data, { withCredentials: true });

export const logoutUser = () =>
  axios.get(`${API}/logout`, { withCredentials: true });