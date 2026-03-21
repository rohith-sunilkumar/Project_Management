import {
  getProjects,
  createProject,
  deleteProject,
  updateProject,
} from "../api/projectApi";

export const fetchProjects = async (setProjects) => {
  try {
    const res = await getProjects();
    setProjects(res.data.projects);
  } catch (error) {
    console.log(error);
  }
};

export const handleCreateProject = async (
  form,
  setProjects,
  setForm
) => {
  try {
    const res = await createProject(form);
    setProjects((prev) => [res.data.project, ...prev]);
    setForm({ title: "", description: "" });
  } catch (error) {
    console.log(error);
  }
};

export const handleDeleteProject = async (id, setProjects) => {
  try {
    await deleteProject(id);
    setProjects((prev) => prev.filter((p) => p._id !== id));
  } catch (error) {
    console.log(error);
  }
};

export const handleUpdateProject = async (id, data, setProjects, setEditProjectId) => {
  try {
    const res = await updateProject(id, data);
    setProjects((prev) => prev.map((p) => (p._id === id ? res.data.project : p)));
    setEditProjectId(null);
  } catch (error) {
    console.log(error);
  }
};