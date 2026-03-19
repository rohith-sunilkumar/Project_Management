import { useEffect, useState } from "react";
import {
  fetchProjects,
  handleCreateProject,
  handleDeleteProject,
} from "../controllers/projectController";
import { useNavigate } from "react-router-dom";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects(setProjects);
  }, []);

  return (
    <div>
      {/* Heading */}
      <h1 className="text-3xl font-bold mb-6">Projects</h1>

      {/* Create Project */}
      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <h2 className="font-semibold mb-3">Create Project</h2>

        <div className="flex gap-2 flex-wrap">
          <input
            type="text"
            placeholder="Enter project title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="border p-2 rounded w-full"
          />

          <input
            type="text"
            placeholder="Enter description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="border p-2 rounded w-full"
          />

          <input
            type="date"
            value={form.dueDate || ""}
            onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
            className="border p-2 rounded w-full"
          />

          <button
            onClick={() => handleCreateProject(form, setProjects, setForm)}
            className="bg-blue-500 text-white px-4 py-2 rounded w-full md:w-auto"
          >
            Add
          </button>
        </div>
      </div>

      {/* Project List */}
      <div className="grid md:grid-cols-3 gap-4">
        {projects.length === 0 ? (
          <p className="text-gray-500">No projects yet</p>
        ) : (
          projects.map((project) => (
            <div key={project._id} className="bg-white p-4 rounded-xl shadow">
              <h2 className="text-lg font-bold">{project.title}</h2>

              <p className="text-gray-500">{project.description}</p>

              {/* Created Date & Time */}
              <p className="text-sm text-gray-500 mt-2">
                Created: {new Date(project.createdAt).toLocaleString()}
              </p>

              {/* Deadline */}
              <p className="text-sm text-red-500">
                Deadline:{" "}
                {project.dueDate
                  ? new Date(project.dueDate).toLocaleDateString()
                  : "No deadline"}
              </p>

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => navigate(`/project/${project._id}`)}
                  className="text-blue-500"
                >
                  View
                </button>

                <button
                  onClick={() => handleDeleteProject(project._id, setProjects)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Projects;
