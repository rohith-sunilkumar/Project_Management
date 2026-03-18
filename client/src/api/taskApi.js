import axios from "axios";

const API = "http://localhost:3000/api/tasks";

export const getTasks = (projectId) =>
  axios.get(`${API}/project/${projectId}`, {
    withCredentials: true,
  });

export const createTask = (data) =>
  axios.post(API, data, { withCredentials: true });

export const updateTask = (id, data) =>
  axios.put(`${API}/${id}`, data, { withCredentials: true });

export const deleteTask = (id) =>
  axios.delete(`${API}/${id}`, { withCredentials: true });
