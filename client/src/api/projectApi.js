import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/api/projects`;

export const getProjects = () =>
  axios.get(API, { withCredentials: true });

export const createProject = (data) =>
  axios.post(API, data, { withCredentials: true });

export const deleteProject = (id) =>
  axios.delete(`${API}/${id}`, { withCredentials: true });