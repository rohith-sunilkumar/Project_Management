import axios from "axios";

const API = "http://localhost:3000/api/projects";

export const getProjects = () =>
  axios.get(API, { withCredentials: true });

export const createProject = (data) =>
  axios.post(API, data, { withCredentials: true });

export const deleteProject = (id) =>
  axios.delete(`${API}/${id}`, { withCredentials: true });