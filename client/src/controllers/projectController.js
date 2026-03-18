import {
  getProjects,
  createProject,
  deleteProject,
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