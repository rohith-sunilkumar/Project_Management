import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  const [editProjectId, setEditProjectId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  const loadProjects = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/admin/projects`, {
        withCredentials: true,
      })
      .then((res) => setProjects(res.data.projects));
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleEdit = async (id) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/projects/${id}`,
        editForm,
        { withCredentials: true }
      );
      setEditProjectId(null);
      loadProjects();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/projects/${id}`, {
        withCredentials: true,
      });
      loadProjects();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1 className="text-2xl mb-6">All Projects</h1>

      <div className="grid md:grid-cols-3 gap-4">
        {projects.map((project) => (
          <div key={project._id} className="bg-white p-4 rounded shadow">
            {editProjectId === project._id ? (
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  className="border p-2 rounded w-full"
                />
                <input
                  type="text"
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  className="border p-2 rounded w-full"
                />
                <input
                  type="date"
                  value={editForm.dueDate ? editForm.dueDate.substring(0, 10) : ""}
                  onChange={(e) => setEditForm({ ...editForm, dueDate: e.target.value })}
                  className="border p-2 rounded w-full"
                />
                <div className="flex justify-end gap-2 mt-2">
                  <button
                    onClick={() => setEditProjectId(null)}
                    className="text-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleEdit(project._id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h2 className="font-bold">{project.title}</h2>
                <p>{project.description}</p>
                <p className="text-blue-500">By: {project.user?.name}</p>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => navigate(`/admin/project/${project._id}`)}
                    className="text-blue-500"
                  >
                    View Tasks
                  </button>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditProjectId(project._id);
                        setEditForm({
                          title: project.title,
                          description: project.description,
                          dueDate: project.dueDate || "",
                        });
                      }}
                      className="text-yellow-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(project._id)}
                      className="text-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default AdminProjects;