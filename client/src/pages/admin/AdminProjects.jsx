import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/admin/projects`, {
        withCredentials: true,
      })
      .then((res) => setProjects(res.data.projects));
  }, []);

  return (
    <>
      <h1 className="text-2xl mb-6">All Projects</h1>

      <div className="grid md:grid-cols-3 gap-4">
        {projects.map((project) => (
          <div key={project._id} className="bg-white p-4 rounded shadow">
            <h2 className="font-bold">{project.title}</h2>

            <p>{project.description}</p>

            <p className="text-blue-500">
              By: {project.user?.name}
            </p>

            <button
              onClick={() =>
                navigate(`/admin/project/${project._id}`)
              }
              className="text-blue-500 mt-2"
            >
              View Tasks
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default AdminProjects;